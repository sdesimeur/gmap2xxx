"use strict";
/*
$( "#dialog" )
    .dialog({
        title : 'Erreur de saisie',
        position: {
            of : $('#all'),
            my : 'center center',
            at : 'center center',
            collision : 'none none'
        }
    });
$( "#dialog" )
    .html('<p>Vous devez entrer une URL</p>')
    .dialog( "open" );
*/

var littleEndian=true;
var nbetapes = 2;
var debutetape = 1;
var tabret = [];
var autoroutes = false;
var peages = false;
var routenumero = 0;
var sendtype = 'gmap';
var typeext="";

function parseGPXFile(filename) {
    var reader = new FileReader();
    reader.onload = function(e) {
    // browser completed reading file - display it
        var filetxt=e.target.result;
    //var filetxt = reader.readAsDataURL(filename).result;
        var txt=filetxt.replace(/[\n\r]/g,"");
        var gpxtaballroutes=txt.split(/<rte>/i);
        gpxtaballroutes.shift();
        var st = gpxtaballroutes.length;
        for (var i=0; i<st; i++) {
            tabret[i] = parseOneRouteInGPXFile(gpxtaballroutes[i]);
        }
        majRouteSelect();
    };
    reader.readAsText(filename);
}
function parseOneRouteInGPXFile(txt) {
    var gpxtab1route=txt.split(/<rtept/i);
    var tmp=gpxtab1route.shift();
    var tmptab=/<\s*name\s*>([^<]*)<\/name\s*>/i.exec(tmp);
    var oneroute = [];
    oneroute.name=tmptab[1];
    oneroute.tab = [];
    var st = gpxtab1route.length;
    for (var key=0 ; key<st; key++) {
        var value = gpxtab1route[key];
        var tmp1 = /^.*lat="(-?[0-9.]+)" *lon="(-?[0-9.]+)".*/g.exec(value);
        oneroute.tab[key] = [ tmp1[1] , tmp1[2] ];
    }
    return oneroute;
}


function parseITNFile(filename) {
    tabret[0] = [];
    tabret[0].name='route';
    tabret[0].tab=[];
    var reader = new FileReader();
    reader.onload = function(e) {
        // browser completed reading file - display it
            var filetxt=e.target.result;

        //var filetxt = reader.readAsDataURL(filename).result;
            var tmp=filetxt.replace(/\r/g,"");
            var itntab = tmp.split("\n");
        var st = itntab.length;
        for (var key=0; key<st; key++) {
            var value = itntab[key];
            if ( /^\s*$/.test(value) ) { continue; }
            var tmp=value.split('|');
            tabret[0].tab[key] = [tmp[1]/100000 , tmp[0]/100000];
        }
        majRouteSelect();
    };
    reader.readAsText(filename);
}

function readString (dv,os,s) {
    var tmp="";
        for (var j=0;j<s;j++) {
            tmp+=String.fromCharCode(dv.getUint16(os+2*j,littleEndian));
        }
    return tmp;
}
function parseITFFile(fname) {
    tabret[0] = [];
    tabret[0].name='';
    tabret[0].tab=[];
    var reader = new FileReader();
    reader.addEventListener("load", function(e) {
        var obj = new Object();
        var buffer=e.target.result;
        var dv = new DataView(buffer);
        var tmp;
        var i=0;
        obj.vsize=dv.getUint16(i,littleEndian);
        i+=2;
        obj.vers=readString(dv,i,obj.vsize);
        i+=2*obj.vsize;
        obj.nsize=dv.getUint16(i,littleEndian);
        i+=2;
        obj.name=readString(dv,i,obj.nsize);
        i+=2*obj.nsize;
        obj.etapes = [];
        var k=0;
        var tmp;
	    do {
	        var d=0;
	        tmp = new Object();
	        tmp.tsize=dv.getUint16(i,littleEndian);
	        tmp.tname=readString(dv,i+2,tmp.tsize);
	        tmp.coordstart=new Object();
	        d=12;
	        tmp.coordstart.lon=dv.getUint32(i+d,littleEndian)/100000;
	        tmp.coordstart.lat=dv.getUint32(i+d+4,littleEndian)/100000;
	        tmp.coordend=new Object();
	        d+=16;
	        tmp.coordend.lon=dv.getUint32(i+d,littleEndian)/100000;
	        tmp.coordend.lat=dv.getUint32(i+d+4,littleEndian)/100000;
	        obj.etapes.push(tmp);
	        i+=151;
	    } while (i<dv.byteLength);
        tabret[0].name = obj.name;
        tabret[0].tab = [];
        var value = obj.etapes[0];
        tabret[0].tab[0] = [value.coordstart.lat , value.coordstart.lon];
        var st = obj.etapes.length;
        for (var key=0; key<st; key++) {
            var value = obj.etapes[key];
            tabret[0].tab[key+1] = [value.coordend.lat , value.coordend.lon];
        }
        majRouteSelect();
    });
    reader.readAsArrayBuffer(fname);

}

function parseMyFile () {
    var filename=$('#filename')[0].files[0];
    if (filename) {
        typeext=filename.name.replace(/^.*\./g,"")
                //var tmptab = [];
        var pat = /gpx/i;
        if (pat.test(typeext)) {
            parseGPXFile(filename);
        }
        pat = /itn/i;
        if (pat.test(typeext)) {
            parseITNFile(filename);
        }
        pat = /itf/i;
        if (pat.test(typeext)) {
            parseITFFile(filename);
        }
    }
}

function majRouteSelect() {
    var tmp = 'Selectionnez la route &agrave; traiter: <select id="listroutes">';
    var st = tabret.length;
    for (var i=0; i<st ; i++ ) { tmp+= '<option value="' + i + '">' + tabret[i].name + '</option>'; }
    tmp+= '</select>';
    $('#divlistroutes').html(tmp);
    $('#listroutes option[value=0]').prop('selected',true);
    $('#listroutes').on('change',changeRouteSelected);
    changeRouteSelected();
}

function changeRouteSelected() {
    routenumero = parseInt($('#listroutes option:selected').val());
    var tmp=tabret[routenumero].tab.length;
    nbetapes=Math.min(tmp,24);
    $('#nbetapesmax').html(', cette route comporte '+tmp+' &eacute;tapes.');
    $('#nbetapes option[value='+nbetapes+']').prop('selected',true);
    $('#debutetape option[value=1]').prop('selected',true);
//  afficheRouteDialog();
}

function afficheRouteDialog () {
    var tmp = '<h2>La route s&eacute;lectionn&eacute;e: ' + tabret[routenumero].name + '</h2><br><br>' ;
    tmp += 'Elle comporte les &eacute;tapes suivantes:<br><ol>';
    var st = tabret[routenumero].tab.length;
    for (var i=0 ; i<st; i++ ) {
        tmp += ''; 
    }
    tmp += '</ol>';
}

function submitMyFile () {
    // Pour eviter les autoroutes                       /data=!3m1!4b1!4m4!4m3!2m1!1b1!3e0
    // Pour eviter les peages                           /data=!3m1!4b1!4m4!4m3!2m1!2b1!3e0
    // Pour eviter les autoroutes et les peages         /data=!3m1!4b1!4m5!4m4!2m2!1b1!2b1!3e0
    var options = '';
    var st = tabret[routenumero].tab.length;
    var tabtmp=tabret[routenumero].tab.slice(debutetape-1,Math.min(debutetape-1+nbetapes,st));
    var url = '';
    var tabtmp1 = [];
    switch ( $('[name=sendtype]:checked').val() ) {
        case 'gmap':
          for (var i=0 ; i < tabtmp.length ; i++) {
              tabtmp1[i] = tabtmp[i][0] + ',' + tabtmp[i][1];
          } 
          url = tabtmp1.join("/");
          if ( ! autoroutes ) { options='/data=!3m1!4b1!4m4!4m3!2m1!1b1!3e0'; }
          if ( ! peages ) { options='/data=!3m1!4b1!4m4!4m3!2m1!2b1!3e0'; }
          if (  ( ! peages ) && ( ! autoroutes ) ) { options='/data=!3m1!4b1!4m5!4m4!2m2!1b1!2b1!3e0'; }
          url+=options;
          url='http://www.google.com/maps/dir/'+url;
        break;
        case 'bmap':
            var st=tabtmp.length;
          for (var i=0 ; i < st ; i++) {
              tabtmp1[i] = tabtmp[i][0] + '_' + tabtmp[i][1];
          } 
          url = tabtmp1.join('____e_~pos.');
          url='http://www.bing.com/mapspreview?&ty=0&rtp=pos.'+url;
        break;
    }
    window.open(url,'_blank');
    return true;
}

function autoroutesmaj() {
    autoroutes=$('#autoroutes').is(':checked');
}

function peagesmaj() {
    peages=$('#peages').is(':checked');
}
function majsendtype () {
    sendtype = $('[name=sendtype]:checked').val();
}

function verifynbetapes() {
    nbetapes = parseInt($('#nbetapes option:selected').val());
    debutetape = parseInt($('#divdebutetape option:selected').val());
    var st=tabret[routenumero].tab.length;
    if ( (nbetapes+debutetape) > st ) {
        nbetapes = st - debutetape + 1;
        $('#nbetapes option[value='+nbetapes+']').prop('selected',true);
    }
}

function onload_doc() {
    document.body.innerHTML=document.body.innerHTML.replace(/###GMAPLNK###/g,'<a href="https://www.google.fr/maps" target="_blank">GoogleMaps</a>');
    document.body.innerHTML=document.body.innerHTML.replace(/###BMAPLNK###/g,'<a href="https://www.bing.com/maps/" target="_blank">BingMaps</a>');
    
    getAllCookies();    

    $('[name=sendtype][value='+sendtype+']').prop('checked',true);
    $('#autoroutes').prop('checked',autoroutes);
    $('#peages').prop('checked',peages);
    var tmp = '<select id="nbetapes">';
    for (var i=2; i<25 ; i++ )
        tmp+= '<option value="' + i + '">' + i + '</option>';
    tmp+= '</select>';
    $('#divnbetapes').html(tmp);
    $('#nbetapes option[value=2]').prop('selected',true);
    tmp = '<select id="debutetape">';
    for (var i=1; i<101 ; i++ )
        tmp+= '<option value="' + i + '">' + i + '</option>';
    tmp+= '</select>';
    $('#divdebutetape').html(tmp);
    $('#debutetape option[value=1]').prop('selected',true);
    $('#debutetape').on('change',verifynbetapes);
    $('#nbetapes').on('change',verifynbetapes);
    $('#autoroutes').on('change',autoroutesmaj);
    $('#peages').on('change',peagesmaj);
    $('[name=sendtype]').on('change',majsendtype);
    $('#go').on('click',submitMyFile);
    $('#filename').on('change',parseMyFile);
    $( "#dialog" ).dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    });
    $('#peages,#autoroutes,[name=sendtype]').on('change',setAllCookies);
}

$(document).ready(onload_doc);
