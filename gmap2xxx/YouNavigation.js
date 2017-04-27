"use strict";

function YourNavigation(del1step) {
    this.url="";
    this.del1step=del1step;
    this.tabwpts = [];
    this.options = [];
    this.options = {
        autoroute: true,
        peage: true
    };

    this.addUrl = function(url) {
        this.url=url;
        this.url2tab(url);
    }

    this.url2tab = function(url) {
        var last="";
        var newvalue;
        var rtevalue;
        var value;
        var tmp1=decodeURIComponent(url).split("?");
        var data=tmp1[1].split("&");
        var lastwpt;
        
        do {
                var tmp1 = [];
                var tmp2 = [];
                var tmp3 = [];
                newvalue=data.shift();
                var test1 = /^([fwt])(lat|lon)=(-?[0-9]*\.[0-9]*)$/.test(newvalue);
                var wpt;
                if (test1) {
                    tmp1 = /^([fwt])(lat|lon)=(-?[0-9]*\.[0-9]*)$/.exec(newvalue);
                    newvalue=data.shift();
                    tmp2 = /^([fwt])(lat|lon)=(-?[0-9]*\.[0-9]*)$/.exec(newvalue);
                    if (tmp1[2]=="lat") {
                        wpt = new Point("",tmp1[3],tmp2[3]);
                    } else {
                        wpt = new Point("",tmp2[3],tmp1[3]);
                    }
                    if (tmp1[1]=="f") this.tabwpts.unshift(wpt);
                    if (tmp1[1]=="w") this.tabwpts.push(wpt);
                    if (tmp1[1]=="t") lastwpt=wpt;
                }
                var test2 = /^fast=([01])$/.test(newvalue);
                if (test2) {
                    tmp3 = /^fast=([01])$/.exec(newvalue);
                    this.options.autoroute=(tmp3[1]=="1");
                    this.options.peage=(tmp3[1]=="1");
                }
            
            
        } while (value !== undefined);

        this.tabwpts.push(lastwpt);
        
        if (this.del1step) {
            this.tabwpts.shift();
        }
    }
}

