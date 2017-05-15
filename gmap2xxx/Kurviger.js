"use strict";

function Kurviger(del1step,url,namesHelper) {
    this.namesHelper=namesHelper;
    this.url=url;
    this.del1step=del1step;
    this.tabwpts = [];
    this.options = [];
    this.options = {
        autoroute: true,
        peage: true
    };


    this.url2tab = function() {
        var last="";
        var newvalue;
        var rtevalue;
        var value;
    //  var urld=urldecode(url);
        var tmp1=decodeURIComponent(this.url);
        var tmp2=tmp1.split("?");
        var data=tmp2[0].split("&");
        this.options.autoroute=(data.indexOf('avoid_motorways=true')>-1);
        this.options.peage=(data.indexOf('avoid_toll_roads=true')>-1);
        do {
            value=data.shift();
            var test1 = /^point=/i.test(value);
            if (test) {
                rtevalue=route.shift();
                var coord=value.replace("point=","").split(',');
                var wpt =new Point("",coord[0],coord[1]);
                this.tabwpts.push(wpt);
            }
        } while (value.length != 0);
        if (this.del1step) {
            this.tabwpts.shift();
        }
        this.namesHelper.tabwithname(this);
    }
    
    this.run = function () {
        this.url2tab();
    }
}

