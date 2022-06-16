"use strict";

function TypeGPX (tabs,myCaller) {
    this.myCaller = myCaller;
    this.vars = this.myCaller.vars;
    this.tabs = tabs;
    this.nbTabReady = 0;
    //this.tabres = [];
    this.tabres={
        rte: new Array(),
        wpt: new Array(),
        trk: new Array()
    };
    this.jsonroad = [];
    
    this.incrTabReady = function () {
        this.nbTabReady++;
        if (this.nbTabReady === (2 * this.tabs.length - 1)) {
            this.myCaller.toSubmitData(this.gottxt());
        }
    }

    this.msgError = function (terr) {
        var tmp ="<p>Il est impossible d'extraire les trks et wpts suppl&eacute;mentaires pour:<ul>";
        var sterr = terr.length;
        if (sterr != 0) {
            this.myCaller.setTabErr(terr);
            for(var i=0;i<sterr;i++) {
                var num=terr[i];
                if ((num%2)==0) {
                    tmp+="<li>l'URL n°" + (1+num/2)+"</li>";
                } else {
                    tmp+="<li>l'interm&eacute;diaire entre les URLs n°" + ((1+num)/2) + " et n°" + ((3+num)/2) +"</li>";
                }
            }
            tmp += "</ul></p>";
            new Dialog("attention").affiche("Attention !!!",tmp,false);
        }
    }
    this.gottxt = function () {
        var nowpt=1;
        var sttabs=this.tabs.length;
        for (var j=0;j<sttabs;j++){
            var sttabwpts = this.tabs[j].tabwpts.length;
            for (var i=0; i<sttabwpts; i++) {
                var val = this.tabs[j].tabwpts[i];
                tmp=' lat="' + val.lat + '" lon="' + val.lng + '">';
                this.tabres.rte.push("\t\t" + '<rtept' + tmp);
                if (this.vars.routewpts) {
                    this.tabres.wpt.push("\t\t" + '<wpt' + tmp);
                }
                tmp=((val.name=="")?"N" + val.lat + ",E" + val.lng:escape(val.name));
                etapename='E'+nowpt+'_'+tmp; 
                tmp="\t\t\t<name>" + etapename + '</name>' + "\n";
                tmp+= "\t\t\t<cmt>" + etapename + '</cmt>' + "\n";
                tmp+= "\t\t\t<desc>" + etapename + '</desc>' + "\n";
                tmp+= "\t\t\t" + '<sym>Custom 0</sym>';
                this.tabres.rte.push(tmp);
                this.tabres.rte.push("\t\t" + '</rtept>');
                if (this.vars.routewpts) {
                    this.tabres.wpt.push(tmp);
                    this.tabres.wpt.push("\t\t" + '</wpt>');
                }
                nowpt++;
            }
        }
        if (this.vars.extrawpts || this.vars.extratrk) {
            var terr=[];
                //this.jsonroutes[j] = JSON.parse(this.jsontxt[j]).routes[0];
            nowpt=1;
                var stjsonroad=this.jsonroad.length;
                for (var j=0;j<stjsonroad;j++){
                    if ( (this.jsonroad[j]!=null) && (/^ok$/i.test(this.jsonroad[j].status)) ) {
                        var jsonrte = this.jsonroad[j].routes[0];
                        //var tabind =  
                        if ( this.vars.extrawpts ) {
                            var jsontabs = jsonrte.legs[0].steps;
                            var stjson1tab = jsontabs.length;
                            for (var key=0; key<stjson1tab; key++) {
                                var val = jsontabs[key];
                                var coord = val.start_location;
                                var tmp =' lat="' + coord.lat + '" lon="' + coord.lng + '">';
                                this.tabres.wpt.push("\t\t<wpt" + tmp);
                                var etapename='I'+nowpt+'_'+val.html_instructions.replace(/<\/?[^>]+(>|$)/g, "").encode();
                                tmp="\t\t\t<name>" +  etapename  +  '</name>';
                                tmp+= "<cmt>" + etapename  + '</cmt>';
                                tmp+= "<desc>" + etapename + '</desc>';
                                tmp+= '<sym>Custom 0</sym>';
                                this.tabres.wpt.push(tmp);
                                this.tabres.wpt.push("\t\t" + '</wpt>');
                                nowpt++;
                            }
                        }
                        if (this.vars.extratrk) {
            		        var val2=polyline.decode(jsonrte.overview_polyline.points);
                            var st=val2.length;
                            for (var i=0;i<st;i++) {
                                var val=val2[i];
                                this.tabres.trk.push("\t\t\t\t" + '<trkpt lat="' + val[0] + '" lon="' + val[1] + '"></trkpt>');
                            }
                        }
                    } else {
                        terr.push(j);
                    }
                }
            this.msgError(terr);
        }
        var ret = "";
        ret+='<?xml version="1.0" encoding="UTF-8" standalone="no" ?>' + "\n";
        ret+='<gpx xmlns="http://www.topografix.com/GPX/1/1" creator="gmap2xxx" version="1.1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">' + "\n";
        //var st=this.tabres.length;
        //for (var i=0;i<st;i++)
        if (this.vars.extrawpts || this.vars.routewpts )
        {
            ret+=this.tabres.wpt.join("\n");
            ret+="\n";
        }
        ret+="\t" + '<rte>' +"\n";
        ret+="\t\t" + '<name>rte' +  this.vars.fname.encode() + '</name>' + "\n";
        //for (var i=0;i<st;i++)
            ret+=this.tabres.rte.join("\n");
        ret+="\n\t" + '</rte>' + "\n";
        
        if (this.vars.extratrk) {
            ret+="\t" + '<trk>' +"\n";
            ret+="\t\t" + '<name>trk' +  this.vars.fname.encode() + '</name>' +"\n";
            ret+="\t\t" + '<number>1</number>' +"\n";
            ret+="\t\t\t" + '<trkseg>' +"\n";
            //for (var i=0;i<st;i++)
                ret+=this.tabres.trk.join("\n");
            ret+="\t\t\t" + '</trkseg>' +"\n";
            ret+="\t" + '</trk>' +"\n";
        }
        ret+='</gpx>';
        return ret;
    }

    if ( this.vars.extrawpts || this.vars.extratrk ) {
        var st=this.tabs.length;
        for (var i=0;i<st;i++) {
            new JSONHelper(this,i,2*i);
            if (i < (st-1)) new JSONHelper(this,i,2*i+1);
        }
    } else {
        this.myCaller.toSubmitData(this.gottxt());
    }

}
