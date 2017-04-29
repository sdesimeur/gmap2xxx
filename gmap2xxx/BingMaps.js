"use strict";

function BingMaps(del1step,url,namesHelper) {
    this.namesHelper=namesHelper;
    this.del1step=del1step;
    this.isDone=false;
    this.url = url;
    this.tabwpts = [];
    this.options = [];
    this.options = {
        autoroute: true,
        peage: true
    };
//highways contain av=4
//tolls contain av=8
//highways+tolls contain av=12

    this.url2tab = function() {
        $.ajax({
            method: "POST",
            url: "loadurlpage.php",
            data: { url: Base64.encode(this.url), key: "2", token: $('#token').val(), IP: $('#IP').val() },
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
        var tmp2=tmp1[0].split("\\\\\\").join("").replace(/\\"/g,'"').replace(/"\{/g,"{").replace(/\}"/g,"}");
        var tmp3=JSON.parse(tmp2);
        var stacks=tmp3.data.data.stacks;
        for (var stacknb=0; stacknb<stacks.length; stacknb++) {
            var tasks = stacks[stacknb].tasks;
            for (var tasknb=0; tasknb<tasks.length; tasknb++) {
                var state = tasks[tasknb].state;
                this.options.autoroute=!(state.options.avoidHighways);
                this.options.peage=!(state.options.avoidTollRoads);
                var wpts = state.waypoints;
                for (var wptnb=0; wptnb<wpts.length; wptnb++) {
                    var wpt=wpts[wptnb];
                    var wpttmp=new Point (wpt.name,wpt.point.latitude,wpt.point.longitude);
                    this.tabwpts.push(wpttmp);
                    var wptsvia=wpt.viaWaypoints;
                    for (var wptvianb=0; wptvianb<wptsvia.length; wptvianb++) {
                        var wpt=wptsvia[wptvianb];
                        var wpttmp=new Point (wpt.name,wpt.point.latitude,wpt.point.longitude);
                        this.tabwpts.push(wpttmp);
                    }
                }
            }
        }
        
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
        this.namesHelper.tabwithname(this);
    }
    this.run = function () {
        this.url2tab();
    }
}


