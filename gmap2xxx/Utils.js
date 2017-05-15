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

String.prototype.encode = function(encoding) {
	var result = "";
	
	var s = this.replace(/\r\n/g, "\n");
	
	for(var index = 0; index < s.length; index++) {
	var c = s.charCodeAt(index);
	
	if(c < 128) {
	result += String.fromCharCode(c);
	}
	else if((c > 127) && (c < 2048)) {
	result += String.fromCharCode((c >> 6) | 192);
	result += String.fromCharCode((c & 63) | 128);
	}
	else {
	result += String.fromCharCode((c >> 12) | 224);
	result += String.fromCharCode(((c >> 6) & 63) | 128);
	result += String.fromCharCode((c & 63) | 128);
	}
	}
	
	return result;
	};
	
	
	String.prototype.decode = function(encoding) {
	var result = "";
	
	var index = 0;
	var c = c1 = c2 = 0;
	
	while(index < this.length) {
	c = this.charCodeAt(index);
	
	if(c < 128) {
	result += String.fromCharCode(c);
	index++;
	}
	else if((c > 191) && (c < 224)) {
	c2 = this.charCodeAt(index + 1);
	result += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
	index += 2;
	}
	else {
	c2 = this.charCodeAt(index + 1);
	c3 = this.charCodeAt(index + 2);
	result += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	index += 3;
	}
	}
	
	return result;
	};
