"use strict";

var javaScriptFiles = [
    "./debug.js",
    "./Controler.js",
    "./xxx2gmap.js"
    ];

var filesadded=""; //list of files already added
 
function checkloadjscssfile(filename, filetype){
    if (filesadded.indexOf("["+filename+"]")==-1){
        loadjscssfile(filename, filetype);
        filesadded+="["+filename+"]"; //List of files added in the form "[filename1],[filename2],etc"
    }
}
    
function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script');
        fileref.setAttribute("type","text/javascript");
        fileref.setAttribute("src", filename);
    } else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", filename);
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref);
}

function loadScripts () {
    var st = javaScriptFiles.length;
    for (var i=0; i<st; i++) {
        var name = javaScriptFiles[i];
        var ext = name.replace(/.*\./g,"");
        checkloadjscssfile(name,ext)
//        var element = document.createElement ('script');
//        element.src=javaScriptFiles[i];
//        document.body.appendChild(element); 
//    $.getScript(javaScriptFiles[i]);
    }
}

loadScripts();
