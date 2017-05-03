"use strict";

function TypeITF (tabs,myCaller) {
    this.myCaller=myCaller;
    this.vars = this.myCaller.vars;
    this.tabs = tabs;
    this.littleEndian=true;

    this.putString = function (dv,os,s) {
        var ss=s.length;
        dv.setUint16(os,ss,this.littleEndian);
        for (var j=0;j<ss;j++) {
            dv.setUint16(os+2+2*j,s.charCodeAt(j),this.littleEndian);
        }
    }
    this.gotbinaryfile = function  () {
        var i=1;
	    var uneEtape=[0x03,0x00,0x63,0x00,0x61,0x00,0x72,0x00,0x33,0x46,0x54,0x49,0x83,0x94,0x05,0x00,0x17,0xAC,0x4B,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xE5,0x9D,0x05,0x00,0xB1,0xA5,0x4B,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x32,0x54,0x53,0x52,0x83,0x73,0x5F,0x50,0x3C,0x28,0x14,0x08,0x00,0x00,0x80,0x3F,0x8F,0xC2,0x75,0x3F,0xC3,0xF5,0x68,0x3F,0xAE,0x47,0x61,0x3F,0xCD,0xCC,0x4C,0x3F,0x33,0x33,0x33,0x3F,0x00,0x00,0x80,0x3F,0x77,0xBE,0x7F,0x3F,0xEE,0x7C,0x7F,0x3F,0xEE,0x7C,0x7F,0x3F,0x64,0x3B,0x7F,0x3F,0x64,0x3B,0x7F,0x3F,0x02,0x00,0x01,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x32,0x4F,0x56,0x41,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x01,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00];
        var uneEtapeLength=uneEtape.length;
	    var endFile=[0x0A];
	    var obj = new Object();
	    var lonstartoffset=12;
	    var lonendoffset=lonstartoffset+16;
        var highwayAndTollOffset = 146;
	    var deltalon=4;
	    obj.vers="@v7";
        obj.versLength=obj.vers.length;
	    obj.name=this.vars.fname;
        obj.nameLength=obj.name.length;
	    obj.nbetapes= this.tabs.reduce(
            function(sum, current){
                return sum + current.tabwpts.length;
            }, 0
        );
	    var etape1offset=2+2*obj.versLength+2+2*obj.nameLength;
	    var buffer=new ArrayBuffer(etape1offset+uneEtapeLength*(obj.nbetapes-1)+1);
	    var dv = new DataView(buffer);
	    this.putString(dv,0,obj.vers);
	    this.putString(dv,2+2*obj.versLength,obj.name);
	    var uint8 = new Uint8Array(buffer);
	    uint8.set(endFile,etape1offset+uneEtapeLength*(obj.nbetapes-1));
	    for (var k=0;k<obj.nbetapes-1;k++) {
	        uint8.set(uneEtape,etape1offset+k*uneEtapeLength);
	    }
        var i=0;
        var st1=this.tabs.length;
        for (var j=0;j<st1;j++) {
            var opts = this.tabs[j].options;
            var highwayAndTollValue = ((opts.peage)?0:1) + ((opts.autoroute)?0:4);
            var val1 = this.tabs[j].tabwpts;
            var st2=val1.length;
            for (var k=0;k<st2;k++) {
                var val2 = val1[k];
                var lng = parseInt(val2.lng*100000);
                var lat = parseInt(val2.lat*100000);
                if (i<obj.nbetapes-1) {
                    dv.setUint32(etape1offset+i*uneEtapeLength+lonstartoffset,lng,this.littleEndian);
                    dv.setUint32(etape1offset+i*uneEtapeLength+lonstartoffset+deltalon,lat,this.littleEndian);
                    //if (i<obj.nbetapes-2)
//                        dv.setUint8(etape1offset+i*uneEtapeLength+highwayAndTollOffset,highwayAndTollValue,this.littleEndian);
                }
                if (i>0) {
                    dv.setUint32(etape1offset+(i-1)*uneEtapeLength+lonendoffset,lng,this.littleEndian);
                    dv.setUint32(etape1offset+(i-1)*uneEtapeLength+lonendoffset+deltalon,lat,this.littleEndian);
                }
                i++;
            }
        }
	    var data=String.fromCharCode.apply(null,uint8);
        var ret=new Blob(uint8,{ type: 'application/octet-stream' });
        return data;
    }
    
    this.myCaller.toSubmitData(this.gotbinaryfile());

}

