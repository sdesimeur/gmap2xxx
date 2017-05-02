"use strict";
function NamesHelper (myCaller) {
    this.myCaller=myCaller;
    this.vars=this.myCaller.vars;
    
    this.tab2url = function () {
        var url = "https://www.google.fr/maps/dir";
        var st1=this.maptab.tabwpts.length;
        for (var i=0;i<st1;i++) {      
            var val = this.maptab.tabwpts[i];
            url = url + "/" + val.lat + "," + val.lng;
        }
        return url;
    }

    this.tabwithname = function (tab) {
        this.maptab=tab;
        var url1=this.tab2url();
        $.ajax({
            method: "POST",
            url: "loadurlpage.php",
            data: { url: Utils.base64(url1), key: "0", token: $('#token').val(), IP: $('#IP').val() },
            success:function (data) {
                return this.gotPage(data);
                }.bind(this),
            error: function(msg) {
                if (msg.status == 409) {
                    new Dialog("sessionerr",this.vars).affiche("Erreur","<p>Votre session est arrivée à expiration.<br>La page va être rechargée.<br>Vous devez à nouveau cliquer pour traiter vos urls.</p>",false);
                } else {
                    new Dialog("othererr").affiche("Erreur","<p>Une erreur s'est produite dans le traitement des adresses des points de passage.<br>Certains points n'afficheront pas une adresse mais des coordonées GPS.</p>",false);
                }
                console.log(JSON.stringify(msg));
                this.myCaller.incrNbTabReady();
                return false;
                }.bind(this)
            });
    }

    this.gotPage = function (page) {
        var st1=this.maptab.tabwpts.length;
        for (var i=0;i<st1;i++) {      
            var val = this.maptab.tabwpts[i];
            var name = val.name;
            name = (name==undefined)?"":name;
            if ( name.length<5 ) {
                var reg = new RegExp(  (parseInt(val.lat*10000)/10000) + '[0-9]*\\s*,\\s*' + (parseInt(val.lng*10000)/10000) + '[0-9]*\\s*\\]\\s*,\\s*"([^"]*)"' );
                if (reg.test(page)) {
                    var ret=reg.exec(page);
                    if ((ret != undefined) && (ret[1].length>name.length)) { name=ret[1]; }
                }
            }
            if ( name.length<3 ) {
                name="";
            }
            this.maptab.tabwpts[i].name=name;
        }
        this.myCaller.incrNbTabReady();
        return true;
    }
}

