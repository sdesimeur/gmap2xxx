"use strict";
function Vars () {
    this.myCookies = null;
    this.emailok = true;
//    this.emailok = false;
    this.typeext = "typeitn";
    this.extrawpts = false;
    this.extratrk = false;
    this.fname = "route0";
    this.ename = "";
    this.sendtype = "file";
    this.del1step0 = false;
    this.del1step1 = false;
    this.allurlplus = [];
    this.saveUrls2CookiesAndReloadPage = function () {
        var tmp = window.btoa(unescape(encodeURIComponent(JSON.stringify(this.allurlplus))));
        this.myCookies.setCookie('URLS',tmp);
        location.reload(true);
    }
    this.addUrl = function (urlplus) {
        this.allurlplus.push(urlplus);
    }
}
