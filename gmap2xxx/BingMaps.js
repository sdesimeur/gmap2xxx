"use strict";

function BingMaps(del1step) {
    this.del1step=del1step;
    this.url = "";
    this.tabwpts = [];
    this.options = [];
    this.options = {
        autoroute: true,
        peage: true
    };
//highways contain av=4
//tolls contain av=8
//highways+tolls contain av=12

    this.addUrl = function(url) {
        this.url=url;
        this.url2tab(url);
    }

    this.url2tab = function(url) {
        $.ajax({
            method: "POST",
            url: "loadurlpage.php",
            data: { url: Base64.encode(url), key: "2", token: $('#token').val(), IP: $('#IP').val() },
            success:function (data) {
                //console.log(JSON.stringify(data));
                return this.gotPage(data);
                }.bind(this),
            error: function(msg) {
                console.log(JSON.stringify(msg));
                new Dialog("othererr").affiche("Erreur","<p>Une erreur s'est produite dans le traitement d'une URL BingMap0",false);
                return false;
                }.bind(this)
            });
    }

    this.gotPage = function (page) {
        var tmp0=page.split(/[\n\r]/).join("").split(/sharedStates\.push\s*\(\s*/);
        var tmp1=tmp0[1].split(/\s*\)\s*;\s*;/);
        var tmp2=tmp1[0].split("\\\\\\").join("");
        var tmp3=JSON.parse(tmp2);
        var tmp;
        
        /*
        tmp0=url.split("?");
        if (tmp0.length > 1) 
            tmp=tmp0[1];
        var tmp1=tmp.split("&");
        this.options.autoroute=((tmp1.indexOf('av=12')>-1) || (tmp1.indexOf('av=4')>-1));
        this.options.peage=((tmp1.indexOf('av=12')>-1) || (tmp1.indexOf('av=8')>-1));
        var val0;
        var st1=tmp1.length;
        for (var i=0;i<st1;i++) {      
            val0 = tmp1[i];
            if (/^rtp=/.test(val0)) {
                i=st1;
            }
        }
        var val1=decodeURIComponent(val0).replace(/rtp=/,"~");
        var tmp2=val1.split(/~pos\.|~v\./);
        tmp2.shift();
        var st2 = tmp2.length
        for (var i=0; i<st2; i++) {
            var val2 = tmp2[i];
            var tmp3=val2.split("_");
            var wpt=new Point (tmp3[2],tmp3[0],tmp3[1]);
            this.tabwpts.push(wpt);
        }
        */
        if (this.del1step) {
            this.tabwpts.shift();
        }
    }
}


