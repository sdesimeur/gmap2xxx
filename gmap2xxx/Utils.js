"use strict";
function Utils () {
    this.base64 = function (text) {
        return window.btoa(unescape(encodeURIComponent(text)));
    }
}
