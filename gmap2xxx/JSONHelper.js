"use strict";

function JSONHelper (myCaller,indice,inddest) {
    this.myCaller=myCaller;
    this.vars=this.myCaller.vars;
    this.indice=indice;
    this.inddest = inddest;

    this.tab2gpx = function () {
        var url=this.tab2downloadurl();
//        window.open(url,"_blank");
        $.ajax({
            method: "POST",
            url: "loadurlpage.php",
            data: { url: window.btoa(unescape(encodeURIComponent(url))), key: "1", token: $('#token').val(), IP: $('#IP').val() },
            success: function (data) {
                this.myCaller.jsonroad[this.inddest]=data;
                this.myCaller.incrTabReady();
            }.bind(this),
            error: function (msg) {
                console.log(JSON.stringify(msg));
                this.myCaller.jsonroad[this.inddest]=null;
                if (msg.status == 409) {
                    new Dialog("sessionerr",this.vars).affiche("Erreur","<p>Votre session est arrivée à expiration.<br>La page va être rechargée.<br>Vous devez à nouveau cliquer pour traiter vos urls.</p>",false);
                } else {
                    new Dialog("othererr").affiche("Erreur","<p>Une erreur s'est produite dans le traitement des suppléments (trks et/ou wpts)</p>",false);
                    this.myCaller.incrTabReady();
                }
            }.bind(this)
        });
    }
    
    this.tab2downloadurl = function () {
        var tw = this.myCaller.tabs[this.indice].tabwpts;
        var st = tw.length;
        var val = tw[0];
    //  var output="xml";
        var output="json";
        var url = "https://maps.googleapis.com/maps/api/directions/" + output + "?origin=";
        if ((this.inddest % 2) == 1) {
            val = tw[st-1];
            url += val.lat + "," + val.lng;
            var tw1 = this.myCaller.tabs[this.indice+1].tabwpts;
            val = tw1[0];
            url +=  "&destination=" + val.lat + "," + val.lng;
        } else {
            url += val.lat + "," + val.lng;
            val = tw[st-1];
            url +=  "&destination=" + val.lat + "," + val.lng;
            val = tw[1];
            url +=  "&waypoints=via:" + val.lat + "," + val.lng;
            for (var i=2; i < st-1 ; i++ ) {       
                val = tw[i];
                url=url + "|via:" + val.lat + "," + val.lng;
            }
        }
        var tmp=[];
        if (typeof this.myCaller.tabs[this.indice].options != undefined) {
            if (! this.myCaller.tabs[this.indice].options.autoroute) tmp.push("highways");
            if (! this.myCaller.tabs[this.indice].options.peage) tmp.push("tolls");
            if (tmp.length > 0) { url+= "&avoid=" + tmp.join("|"); }
        }
        return url;
    }

    this.tab2gpx();

}
