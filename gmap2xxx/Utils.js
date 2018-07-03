"use strict";
function Utils () {
    this.base64 = function (text) {
        return window.btoa(text);
        //return window.btoa(unescape(encodeURIComponent(text)));
    }
}
var utils = new Utils();

String.prototype.encode = function() {
    return unescape(encodeURIComponent(this));
}
     
String.prototype.decode = function(){
    return decodeURIComponent(escape(this));
}
