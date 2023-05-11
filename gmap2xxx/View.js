"use strict";
function View () {
    this.itnMsgMoreThan2Urls = false;
    this.vars = new Vars();
    this.myCookies = new MyCookies(this.vars);
    this.mapObjects = [
        {regExp: /^(http)?s?:?\/?\/?www\.google\.[a-z]*\/maps\/dir\//i, mapObj: GoogleMaps },
        {regExp: /^(http)?s?:?\/?\/?(www\.bing\.[a-z]*\/maps|binged\.[a-z]*\/)/i, mapObj: BingMaps },
        {regExp: /^(http)?s?:?\/?\/?www\.viamichelin\.[a-z]*\/web\/Itineraires/i, mapObj: ViaMichelin },
        {regExp: /^(http)?s?:?\/?\/?www\.yournavigation\.org/i, mapObj: YourNavigation },
        {regExp: /^(http)?s?:?\/?\/?kurviger\.de/i, mapObj: Kurviger }
    ];
    var sizeurls=60;
    
    var itninfotxt='';
    itninfotxt+='Le GPS Tomtom accepte 48 points, vous pouvez combiner deux URL <?php echo $googlemapslink; ?>.<br>';
    itninfotxt+='Chaque URL <?php echo $googlemapslink; ?> peut aller jusqu' + "'" + 'à 25 points.<br>';
    itninfotxt+='Si la limite de 2x25=50 &eacute;tapes est atteinte, pensez &agrave; supprimer les premi&egrave;res &eacute;tapes.<br>';
            
    var gpxinfotxt='Vous pouvez concaténer plusieurs itinéraires pour créer un unique itinéraire sur votre GPS.';
    
    var tomtomrmqtxt='';
    tomtomrmqtxt+='<b><i>Comment utiliser le fichier créé avec votre Tomtom?</i></b><br>';
    tomtomrmqtxt+='Branchez votre GPS sur votre PC, votre PC ajoute un emplacement Tomtom (soit un disque, soit un dossier).<br>';
    tomtomrmqtxt+='Placez le fichier créé dans le dossier ITN de cet emplacement<br>';
    tomtomrmqtxt+='Il n' + "'" + 'y a plus qu' + "'" +  'à débrancher le Tomtom.<br>';
    tomtomrmqtxt+='Vous utilisez ensuite le menu "Panification d' + "'" + 'itinéraires" de votre Tomtom, puis vous y chargez l' + "'" + 'itinéraire créé.<br>';
    
    
    this.reset_name = function (id) {
        $(id).val('');
        $(id).focus();
    }
    this.reset_ename = function (id) {
        reset_name('#ename');
    }
    this.reset_fname = function (id) {
        reset_name('#fname');
    }
    this.furlstxt = function (i) {
        var urlstxt='';
        urlstxt+='<li><fieldset><label for="url' + i + '"><span id="txturl' + i + '">Entrez une URL</span> (facultatif) si vous avez cr&eacute;&eacute;e un itin&eacute;raire en plusieurs parties:</label><br>';
        urlstxt+="\n";
        urlstxt+='<input name="url[]" id="url'+i+'" type="text" class="url">&nbsp; <button id="razurl' +i+  '" value="razurl" type="button" class="razurl">Remise à zéro de l\'URL</button><br>';
        urlstxt+="\n";
        urlstxt+='<label for="del1step' + i + '">Si vous souhaitez supprimer la premi&egrave;re &eacute;tape pour cette URL, cochez la case suivante: </label><input name="del1step[]" id="del1step' + i + '" value="on" type="checkbox"></fieldset>';
        urlstxt+="\n";
        urlstxt+="</li>";
        urlstxt+="\n";
        return urlstxt;
    }
    this.msg4itnWithMoreThan2Urls = function () {
        if ( (this.vars.typeext == "typeitn") && ($('.url').length>2) && (!this.itnMsgMoreThan2Urls) ) {
            new Dialog("attention").affiche("Attention !","Avec plus de 2 URLs, il peut y avoir plus de 49 points et les Tomtoms n'acceptent que 49 points",false); 
            this.itnMsgMoreThan2Urls = true;
        }
    }
    this.add_url = function () {
        var nb = $('.url').length;
        $('#zoneurl2').append(this.furlstxt(nb));
        $('#del1step'+nb).prop('checked',$('#del1step'+(nb-1)).is(':checked'));
        $('.url').prop('size',sizeurls);
        this.msg4itnWithMoreThan2Urls ();
    }
    
    this.change_type = function () {
        this.vars.typeext=$('[name=typeext]:checked').val();
        switch (this.vars.typeext) {
        case 'typegpx' :
            $('#gpxoptions').css('visibility','visible')
                    .height('auto');
            $('#variablezone').html('')
                .css('heigth','0')
                .css('visibility','hidden');
            break;
        case 'typeitn':
            this.msg4itnWithMoreThan2Urls ();
            $('#gpxoptions').css('visibility','hidden')
                    .height('0px');
            $('#variablezone').html(this.tomtomrmqtxt)
                .css('heigth','auto')
                .css('visibility','visible');
            break;
        case 'typeitf':
            $('#gpxoptions').css('visibility','hidden')
                    .height('0px');
            $('#variablezone').html('')
                .css('heigth','0')
                .css('visibility','hidden');
            break;
        }
    }
    
    this.change_affich_efname = function () {
        this.vars.sendtype = $('[name=sendtype]:checked').val();
        $('#enamezone')
            .css('visibility',this.vars.sendtype=="email"?'visible':'hidden');
    }
    
    this.submit_form = function () {
        if (this.test_form()) { return this.exec_form(); }
        else { return false; }
    }
    this.test_form = function () {
        if ( (this.vars.sendtype == "email") &&
            ( !($('#ename').is(':valid')) || !($('#ename').val()) )) { 
                new Dialog("erreur").affiche('Erreur de saisie','<p>Vous devez entrer votre eMail</p>',false);
                $('#ename').focus();
                return false;
        } else if ( !$('#fname').val() ) {
                new Dialog("erreur").affiche('Erreur de saisie','<p>Vous devez entrer un nom pour votre route</p>',false);
                $('#fname').focus();
                return false;
        }
        this.myCookies.setAllCookies();
        return true;
    }
    
    this.exec_form = function () {
        var testGoogleShort = false;
        var error = false;
        var nourl = true;
        var idxUrl=0;
        var tabUrls = [];
        var sendHelper = new SendHelper (this);
        var twpts = new AllTabWpts (sendHelper);
        var namesHelper=new NamesHelper (twpts);
        do {
            var tempurl=$('#url'+idxUrl);
            var tempdel1step=$('#del1step'+idxUrl).is(":checked");
            var tempurlval = tempurl.val();
            testGoogleShort = /^(http)?s?:?\/?\/goo\.gl\//i.test(tempurlval);
            if (testGoogleShort) {
                break;
            }
            var testOk=false;
            for (var idxMapObjs=0; idxMapObjs<this.mapObjects.length; idxMapObjs++) {
                var testMapObj = this.mapObjects[idxMapObjs].regExp.test(tempurlval);
                if (testMapObj) {
                    var temp = new this.mapObjects[idxMapObjs].mapObj(tempdel1step,tempurlval,namesHelper);
                    twpts.addTab(temp);
                    temp.run();
                    testOk=true;
                }
            }

            if (testOk) {
                this.vars.addUrl({
                    url: tempurlval,
                    supr: tempdel1step
                });
                nourl = false;
                tabUrls[idxUrl] = {
                    url : tempurlval,
                    del1step : tempdel1step,
                    errorjson : false,
                    errorjson2 : false
                    };
            } else if ((!(/^\s*$/.test(tempurlval))) && (tempurl.length>0)) {
                error = true;
                break;
            }
            idxUrl++;
        } while (tempurl.length>0);
        if (error) {
            $('#url'+idxUrl).focus();
            new Dialog("erreur").affiche('Erreur de saisie',"<p>l'URL n°"+(idxUrl+1)+" est erron&eacute;e</p>",false);
            return false;
        } else if ( nourl ) {
            new Dialog("erreur").affiche('Erreur de saisie','<p>Vous devez entrer une URL</p>',false);
            $('#url0').focus();
            return false;
        } else if (testGoogleShort) {
            $('#url'+idxUrl).focus();
            new Dialog("erreur").affiche('Erreur de saisie','<p>Vous devez entrer une URL longue, et pas une URL r&eacute;duite</p>',false);
            return false;
        } else {
            sendHelper.setTabUrls(tabUrls);
            twpts.isFull=true;
            return true;
        }
    }
    
    
    this.increment_fname = function () {
        this.vars.fname=$('#fname').val();
        this.vars.fname=(fname == '')?'route_0':fname;
        expreg = new RegExp("^(.*[^0-9])([0-9]*)$");
        tab = expreg.exec(this.vars.fname);
        num = parseInt(tab[2]);
        $('#fname').val(tab[1]+(((isNaN(num))?0:num) + 1));
    }
    
    var alternateFading = function () {
        $('.titreeffect').fadeToggle("slow",alternateFading);
    }
    
    this.loadall = function () {
        this.myCookies.getAllCookies();
        $(document).on('change','[name=typeext]',function () {
            this.change_type();}.bind(this));
        $(document).on('click','#buttonincrement',function () {
            this.increment_fname();}.bind(this));
        $(document).on('change','[name=sendtype]',function () {
            this.change_affich_efname();}.bind(this));
        $(document).on('click','#resetfname',function () {
            this.reset_fname();}.bind(this));
        $(document).on('click','#resetename',function () {
            this.reset_ename();}.bind(this));
        $(document).on('change','#del1step0',function () {
            this.vars.del1step0=$('#del1step0').is(':checked');
        }.bind(this));
        $(document).on('change','#del1step1',function () {
            this.vars.del1step1=$('#del1step1').is(':checked');
        }.bind(this));
        $(document).on('change','#routewpts',function () {
            this.vars.routewpts=$('#routewpts').is(':checked');
        }.bind(this));
        $(document).on('change','#extrawpts',function () {
            this.vars.extrawpts=$('#extrawpts').is(':checked');
        }.bind(this));
        $(document).on('change','#extratrk',function () {
            this.vars.extratrk=$('#extratrk').is(':checked');
        }.bind(this));
        $(document).on('change','#emailok',function () {
            this.vars.emailok=$('#emailok').is(':checked');
        }.bind(this));
        $(document).on('change','#ename',function () {
            this.vars.ename=$('#ename').val();
        }.bind(this));
        $(document).on('change','#fname',function () {
            this.vars.fname=$('#fname').val();
        }.bind(this));
        $(document).on('click','.razurl',function () {
            $(this).siblings('input[name^=url]').val('').focus();
            return true;
            }); 
        $(document).on('click','#addurl',function () {
            this.add_url();}.bind(this));
        $(document).on('click','#razurlall',function () {
            $('.url').val('');
            $('#url0').focus();
            return true;
            });
        $(document).on('click','#submitbtn',function () {
            this.submit_form();}.bind(this));
        $(document).on('change','#ename,#fname,#extratrk,#routewpts,#extrawpts,#del1step0,#del1step1,#sendtype,[name=typeext],[name=sendtype]',function () {this.myCookies.setAllCookies();}.bind(this));
        
        
        $('#ename').val(this.vars.ename);
        $('#fname').val(this.vars.fname);
        $('#del1step0').prop('checked',this.vars.del1step0);
        $('[name=sendtype][value='+this.vars.sendtype+']').prop('checked',true);
        $('[name=typeext][value='+this.vars.typeext+']').prop('checked',true);
        $('#extratrk').prop('checked',this.vars.extratrk);
        $('#routewpts').prop('checked',this.vars.routewpts);
        $('#extrawpts').prop('checked',this.vars.extrawpts);
        $('#emailok').prop('checked',this.vars.emailok);
        $('.url').prop('size',sizeurls);
        alternateFading();
        this.change_affich_efname();
        this.change_type();
   }
}

$(document).ready(function () { 
    var view = new View();
    var title = $(document).prop('title');
    title = title.replace('###VERSION###',version);
    $(document).attr('title',title);
    document.body.innerHTML=document.body.innerHTML.replace(/###VERSION###/g,version);
    document.body.innerHTML=document.body.innerHTML.replace(/###GMAPLNK###/g,'<a href="https://www.google.fr/maps/dir/" target="_blank">GoogleMaps</a>');
    document.body.innerHTML=document.body.innerHTML.replace(/###YNLNK###/g,'<a href="http://www.yournavigation.org/" target="_blank">YourNavigation</a>');
    document.body.innerHTML=document.body.innerHTML.replace(/###BMAPLNK###/g,'<a href="https://www.bing.com/mapspreview" target="_blank">BingMaps</a>');
    document.body.innerHTML=document.body.innerHTML.replace(/###VIAMICHELIN###/g,'<a href="https://www.viamichelin.fr/web/Itineraires" target="_blank">ViaMichelin</a>');
    document.body.innerHTML=document.body.innerHTML.replace(/###KURVIGER###/g,'<a href="https://kurviger.de/en" target="_blank">Kurviger</a>');
    view.loadall();
    
    var tmp = view.myCookies.getCookie('URLS');
    if (tmp != null) {
        var tmp1=JSON.parse(atob(tmp));
        var st = tmp1.length;
        for (var i=0;i<st;i++) {
            $('#url'+i).val(tmp1[i].url);
            $('#del1step'+i).prop('checked',tmp1[i].supr);
            if (i<(st-1)) view.add_url();
        }
        view.myCookies.setCookie('URLS',null);
    }

    setInterval(function() {
	const ip = $("#IP").val();
	const token = $("#token").val();
        $.ajax({
            method: "POST",
            url: "../mysql/update.php",
//            contentType: "application/json; charset=utf-8",
            data: { token: token, IP: ip },      // NOTE CHANGE HERE
            success: function(msg) {
                //console.log(JSON.stringify(msg));
                }.bind(this),
            error: function(msg) {
                if (msg.status == 409) {
                    new Dialog("sessionerr",view.vars).affiche("Erreur","<p>Votre session est arrivée à expiration.<br>La page va être rechargée.<br>Vous devez à nouveau cliquer pour traiter vos urls.</p>",false);
                } 
                console.log(JSON.stringify(msg));
                }.bind(view)
        });
    //}, 60*1000);
    }, 60*60*1000);

//    $('#url0').val("https://www.google.fr/maps/dir/45.8556031,3.5486147/45.7847386,3.6739641/45.7117039,3.7200354/Col+du+B%C3%A9al/45.6145845,3.7435278/45.59345,3.8434961/45.5251633,3.9174895/45.4370746,3.8799747/45.4379854,3.6889317/45.520525,3.5973883/@45.7902201,3.655256,15z/data=!4m32!4m31!1m5!3m4!1m2!1d3.6376822!2d45.8560406!3s0x47f6bd9279e7bd9b:0x2c313dbdc0dfd957!1m0!1m0!1m5!1m1!1s0x47f683342faf2a07:0xaf26f943a73fe349!2m2!1d3.782858!2d45.685359!1m0!1m0!1m0!1m5!3m4!1m2!1d3.7148927!2d45.4580849!3s0x47f67bf0e2cfd37f:0xf0f1ab15b9cc26ff!1m5!3m4!1m2!1d3.5552519!2d45.4677837!3s0x47f666ad77e7badd:0x2cbf6a266837fc08!1m0!3e0");
//    $('#url0').val("https://www.google.fr/maps/dir/Pont+de+Bellerive/46.0240373,3.209275/46.0418525,3.1275781/46.1171324,3.0904628/46.1867941,3.1616436/46.2361388,3.1519634/46.3255473,2.9695906/46.3983106,2.855877/46.4207297,2.8263387/46.5084227,2.712122/@46.319464,2.2446558,9z/data=!4m32!4m31!1m5!1m1!1s0x47f6cda06438efd3:0x9e398099cb897145!2m2!1d3.4168537!2d46.1190578!1m0!1m5!3m4!1m2!1d3.0935764!2d46.0890626!3s0x47f72e7e57c921e1:0x4a87635dfc53520b!1m0!1m0!1m5!3m4!1m2!1d3.0455741!2d46.2814134!3s0x47f0ce4d99ad454b:0xa098ea2e062d6493!1m0!1m0!1m5!3m4!1m2!1d2.7813126!2d46.4508149!3s0x47f0bd1959f09885:0xf49389c6c90b744d!1m0!3e0");
//    view.add_url();
//    $('#url1').val("https://www.google.fr/maps/dir/49.589364,3.5707/49.6049258,3.6298407/49.630003,3.663234/49.585343,3.725971/49.5278829,3.7039985/49.539076,3.642595/@49.5809828,3.5848715,12z/data=!3m1!4b1");
//    view.add_url();
//    $('#url2').val("http://www.bing.com/mapspreview?&ty=0&rtp=pos.49.589364_3.5707_D266%2c%2002870%20Besny-et-Loizy_D266%2c%2002870%20Besny-et-Loizy__e_~v.49.6049258334071_3.62984074988886_D541___e_~pos.49.630003_3.663234_D546%2c%2002000%20Barenton-Bugny_D546%2c%2002000%20Barenton-Bugny__e_~pos.49.585343_3.725971_D977%2c%2002840%20Samoussy___e_~v.49.5278828740889_3.70399846473261_D25___e_~pos.49.539076_3.642595_D967%2c%2002000%20Laon_D967%2c%2002000%20Laon__e_&mode=d&u=1&tt=De%20D266%2c%2002870%20Besny-et-Loizy%20%c3%a0%20D967%2c%2002000%20Laon&tsts0=%2526ty%253d0%2526rtp%253dpos.49.589364_3.5707_D266%25252c%25252002870%252520Besny-et-Loizy_D266%25252c%25252002870%252520Besny-et-Loizy__e_~v.49.6049258334071_3.62984074988886_D541___e_~pos.49.630003_3.663234_D546%25252c%25252002000%252520Barenton-Bugny_D546%25252c%25252002000%252520Barenton-Bugny__e_~pos.49.585343_3.725971_D977%25252c%25252002840%252520Samoussy___e_~v.49.5278828740889_3.70399846473261_D25___e_~pos.49.539076_3.642595_D967%25252c%25252002000%252520Laon_D967%25252c%25252002000%252520Laon__e_%2526mode%253dd%2526u%253d1&tstt0=De%20D266%2c%2002870%20Besny-et-Loizy%20%c3%a0%20D967%2c%2002000%20Laon&cp=49.592687~3.564266&lvl=11&ftst=0&ftics=False&v=2&sV=1&form=S00027");
});
