"use strict";

function GoogleMaps(del1step) {
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
    //  var urld=urldecode(url);
        var tmp1=decodeURIComponent(url).replace(/\+/g," ").split("data=");
        var tmp2=tmp1[1].split("?");
        var data=tmp2[0].split("!");
        data.push("3e0");
        var tmp3=tmp1[0].split('/dir/');
        var tmp4=tmp3[1].split('/@');
        this.options.autoroute=(data.indexOf('1b1')>-1);
        this.options.peage=(data.indexOf('2b1')>-1);
        var route=tmp4[0].split("/");
    //##############        1m.[05] si avant un 1m.[05] ou 1m2
    //##############            route   => coord
    //##############            data    => rien
    //##############        1m1
    //##############            route   => adr
    //##############            data    => coord
    //##############        1m2
    //##############            route   => rien
    //##############            data    => coord
    //##############        1m3
    //##############            route   => txt
    //##############            data    => coord
        var tabwptdatacoordnoroute = [];
        tabwptdatacoordnoroute.push("1m0");
        tabwptdatacoordnoroute.push("1m5");
        for (var i=1;i<10;i++) {
            tabwptdatacoordnoroute.push("1m"  + "" +  i  + "" +  "0");
            tabwptdatacoordnoroute.push("1m"  + "" +  i  + "" +  "5");
        }
        var tabwptdatacoordnorouteplus = tabwptdatacoordnoroute.slice(0);
        tabwptdatacoordnorouteplus.push("1m2");
        tabwptdatacoordnorouteplus.push("3e0");
        var tabwptall = tabwptdatacoordnorouteplus.slice(0);
        tabwptall.push("1m1");
        tabwptall.push("1m3");
        do {
            do { value=data.shift(); } while ( tabwptall.indexOf(value) == -1 );
            if ( (tabwptdatacoordnorouteplus.indexOf(value)>-1) && (tabwptdatacoordnoroute.indexOf(last)>-1)) {
                rtevalue=route.shift();
                var coord=rtevalue.split(',');
                var wpt =new Point("",coord[0],coord[1]);
                this.tabwpts.push(wpt);
            }
            if (value=="1m2") {
                var tmp5 = []; 
                do {
                    newvalue=data.shift();
                    var test1 = /^1d(-?[0-9]*\.[0-9]*)$/.test(newvalue);
                    if (test1) tmp5 = /^1d(-?[0-9]*\.[0-9]*)$/.exec(newvalue);
                } while ( ! test1 );
                newvalue=data.shift();
                var wpt =new Point("",newvalue.substring(2),tmp5[1]);
                this.tabwpts.push(wpt);
            }
            if ((value=="1m1") || (value=="1m3")) {
                var tmp6 = [];
                do {
                    newvalue=data.shift();
                    var test2 = /^1d(-?[0-9]*\.[0-9]*)$/.test(newvalue);
                    if ( test2 )  { tmp6 = /^1d(-?[0-9]*\.[0-9]*)$/.exec(newvalue); }
                    var test3 = tabwptall.indexOf(newvalue)>-1;
                } while ( ! (test2 || test3) );
                if ( test3 ) {
                    data.unshift(newvalue);
                    rtevalue=route.shift();
                    var coord=rtevalue.split(',');
                    var wpt = new Point("",coord[0],coord[1]);
                    this.tabwpts.push(wpt);
                } else {
                    newvalue=data.shift();
                    var wpt = new Point("",newvalue.substring(2),tmp6[1]);
                    rtevalue=route.shift();
                    var test4 = /^-?[0-9]*\.[0-9]*,-?[0-9]*\.[0-9]*$/.test(rtevalue);
                    if ( test4 ) {
                        route.unshift(rtevalue);
                        wpt.name="";
                    } else {
                        wpt.name=rtevalue;
                    }
                    this.tabwpts.push(wpt);
                }
            }
            last=value;
        } while (value != "3e0");
        while (route.length!=0) {
            rtevalue=route.shift();
            var coord=rtevalue.split(',');
            var wpt = new Point("",coord[0],coord[1]);
            this.tabwpts.push(wpt);
        }
        if (this.del1step) {
            this.tabwpts.shift();
        }
    }
}

