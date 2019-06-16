"use strict";
function MyCookies (vars) {
    this.vars = vars;
    this.vars.myCookies = this;
    this.getCookie = function (sName) {
        var oRegex = new RegExp("(?:; )?" + sName + "=([^;]*);?");
        
        if (oRegex.test(document.cookie)) {
            return decodeURIComponent(RegExp["$1"]);
        } else {
            return null;
        }
    }
    
    this.setCookie = function (sName,sValue) {
        var value = "";
        var today = new Date(), expires = new Date();
        expires.setTime(today.getTime() - 60);
        if (sValue!=null) {
            value=encodeURIComponent(sValue);
            expires.setTime(today.getTime() + (365*24*60*60*1000));
        }
        var dateexp = expires.toGMTString();
        document.cookie = sName + "=" + value + ";expires=" + dateexp;
    }
    
    this.getAllCookies = function () {
        var tmp = this.getCookie("SUPR0");
        this.vars.del1step0 = ((tmp==="1") || (tmp==="0"))?tmp=="1":false;
        tmp = this.getCookie("SUPR1");
        this.vars.del1step1 = ((tmp==="1") ||  (tmp==="0"))?tmp=="1":false;
//        tmp = this.getCookie("EMAILOK");
//        this.vars.emailok = ((tmp=="1") ||  (tmp=="0"))?tmp=="1":true;
        tmp = this.getCookie("ROUTEWPTS");
        this.vars.routewpts = ((tmp==="1") ||  (tmp==="0"))?tmp=="1":false;
        tmp = this.getCookie("EXTRAWPTS");
        this.vars.extrawpts = ((tmp==="1") ||  (tmp==="0"))?tmp=="1":false;
        tmp = this.getCookie("EXTRATRK");
        this.vars.extratrk = ((tmp==="1") ||  (tmp==="0"))?tmp=="1":false;
        this.vars.fname = this.getCookie("FNAME");
        this.vars.ename = this.getCookie("ENAME");
        tmp = this.getCookie("SENDTYPE");
        this.vars.sendtype = (tmp==null)?'file':tmp;
        tmp = this.getCookie("TYPEEXT");
        this.vars.typeext = (tmp==null)?'typeitn':tmp;
        //var youremail = '';
    }
    
    this.setAllCookies = function () {
        this.setCookie ("EMAILOK", this.vars.emailok?"1":"0");
        this.setCookie ("TYPEEXT", this.vars.typeext);
        this.setCookie ("ROUTEWPTS", this.vars.routewpts?"1":"0");
        this.setCookie ("EXTRAWPTS", this.vars.extrawpts?"1":"0");
        this.setCookie ("EXTRATRK", this.vars.extratrk?"1":"0");
        this.setCookie ("FNAME", this.vars.fname);
        this.setCookie ("ENAME", this.vars.ename);
        this.setCookie ("SUPR0", this.vars.del1step0?"1":"0");
        this.setCookie ("SUPR1", this.vars.del1step1?"1":"0");
        this.setCookie ("SENDTYPE", this.vars.sendtype);
    }
    
    /*function url (i) {
        return $('#url'+i).val().replace(/(\n|\r|\s)/g,""); 
    }*/
} 
