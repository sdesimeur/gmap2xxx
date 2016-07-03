"use strict";

function SendHelper (myCaller) {
    this.vars=myCaller.vars;
    this.tabUrls;
    
    this.setTabErr = function (tab) {
        var st = tab.length;
        for (var i=0; i<st; i++) {
            var num=tab[i];
            if ((num%2)==0) {
                this.tabUrls[num/2].error4trk = true;
            } else {
                this.tabUrls[(num-1)/2].error4trk2 = true;
            }
        }
    }
    this.setTabUrls = function (tab) {
        this.tabUrls = tab;
    }
    this.ajaxSuccessReturn = function (msg) {
    }
    this.ajaxErrorReturn = function (msg) {
        if (msg.status == 409) {
            new Dialog("sessionerr",this.vars).affiche("Erreur","<p>Votre session est arrivée à expiration.<br>La page va être rechargée.<br>Vous devez à nouveau cliquer pour traiter vos urls.</p>",false);
        }
    }
    this.sendstats = function () {
        var ip = $("#IP").val();
        var nav = navigator.userAgent;
        var sql = [];
        sql.push("INSERT INTO RequestsIds (id,ip,useragent) VALUES (null,'"+escape(ip)+"','"+escape(nav)+"');");
        sql.push("set @lastID = LAST_INSERT_ID();");
        var tmp="INSERT INTO Cookies (id4identities,typeext,extrawpts,extratrk,fname,ename,sendtype,del1step0,del1step1) VALUES ";
        tmp+="(@lastID,'"+this.vars.typeext+"',"+(this.vars.extrawpts?1:0)+","+(this.vars.extratrk?1:0)+",'" +escape(this.vars.fname)+"','" +escape(this.vars.ename)+"','" +this.vars.sendtype+"'," +(this.vars.del1step0?1:0)+"," +(this.vars.del1step1?1:0)+");"
        sql.push(tmp);
        tmp="INSERT INTO RequestsUrls (id4identities,url,del1step,errorjson,errorjson2) VALUES ";
        var sturls=this.tabUrls.length;
        for (var i=0;i<sturls;i++) {
            var tmptab = this.tabUrls[i];
            tmp+="(@lastID,'"+escape(tmptab.url)+"',"+(tmptab.del1step?1:0)+","+(tmptab.errorjson?1:0)+","+(tmptab.errorjson2?1:0)+")"
            tmp+=(i==sturls-1?";":",");
        }
        sql.push(tmp);
        new SendPHPRequest(sql,this);
    }
    this.toSubmitData = function (data) {
        if (this.vars.emailok) {
            this.sendstats();
        }
        switch (this.vars.sendtype) {
            case 'screen' :
                this.send2screen(data);
            break;
            case 'file' :
                this.send2file(data);
            break;
            case 'email' :
                this.sendmailafile(data);
            break;
        }
    }
    this.toSubmit = function (tabs) {
        switch (this.vars.typeext) {
            case 'typegpx' :
                new TypeGPX(tabs,this);
            break;
            case 'typeitn' :
                new TypeITN(tabs,this);
            break;
            case 'typeitf' :
                new TypeITF(tabs,this);
            break;
        }
    }
    this.send2file = function (data) {
        var fname=this.vars.fname+'.'+this.vars.typeext.substr(-3);
        var link = this.downloadFile(data, fname);
        if (link != false) {
            var temp = "Si le téléchargement ne démarre pas automatiquement,<br>"
            temp += 'vous pouvez obtenir votre fichier en cliquant sur le lien ci-dessous:<br>';
            //temp+ = '<a id="tempanchor"';
            //temp+=' download="'+fname+'"';
            //temp+=' target="_blank"';
            //temp+= ' href="data:text/plain;charset=utf-8;base64,' + Base64.encode(data) +'">';
            //temp+= fname + '</a>.';
            temp += link.outerHTML;
            new Dialog("fichier").affiche("Téléchargez votre fichier", temp,false);
            link.click();
        }
    }
    
    this.send2screen = function (data) {
        new Dialog("screen").affiche("Le fichier obtenu",$('<div/>').text(data).html().replace(/\n/g,"<br>"),true);
    }
    
    this.sendmailafile = function (data) {
        var fname=this.vars.fname+'.'+this.vars.typeext.substr(-3);
        $.ajax({
            method: "POST",
            url: "mymailfile.php",
            data: { ename: Base64.encode(this.vars.ename), data: Base64.encode(data), fname:Base64.encode(fname), token: $('#token').val(), IP: $('#IP').val() },
            success : function( msg ) {
                new Dialog("mail").affiche("Envoi d'EMail",msg,false);
            }.bind(this),
            error : function (msg) {
                if (msg.status == 409) {
                    new Dialog("sessionerr",this.vars).affiche("Erreur","<p>Votre session est arrivée à expiration.<br>La page va être rechargée.<br>Vous devez à nouveau cliquer pour traiter vos urls.</p>",false);
                } else {
                    new Dialog("othererr").affiche("Erreur","<p>Une erreur s'est produite dans l'envoi de l'email, veuillez vérifier votre adresse.</p>",false);
                }
                console.log(JSON.stringify(msg));
            }.bind(this)
        });
    }
    this.downloadFile = function (content, filename) {
        var supportsDownloadAttribute = 'download' in document.createElement('a');
        var link;
        if(supportsDownloadAttribute) {
            link = $('<a>Votre fichier</a>');
            link.attr({
                href: 'data:attachment/csv;base64,' + encodeURI(btoa(content)),
                target: '_blank',
                download: filename
            })[0];
            /*$timeout(function() {
                link.remove();
            }, 50);*/
            return link[0];
        } else if(typeof safari !== 'undefined') {
            window.open('data:attachment/csv;charset=utf-8,' + encodeURI(content));
            return false;
        } else {
            var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
            saveAs(blob, filename);
            return false;
        }
    }
}
