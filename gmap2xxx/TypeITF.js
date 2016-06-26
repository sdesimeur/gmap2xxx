"use strict";

function TypeITF (tabs,sendHelper) {
    this.sendHelper=sendHelper;
    this.tabs = tabs;

    this.gotbinaryfile = function  () {
        var allbuffer = [];
        var buftmp=new ArrayBuffer(12);
        var dvtmp=new DataView(buftmp,0);
        var olddate = new Date("2001/01/01 0:0:0.0");
        var newdate = new Date();
        dvtmp.setInt32(0,parseInt((newdate.getTime()-olddate.getTime())*1000),true);
        dvtmp.setUint32(4,0,true);
        dvtmp.setInt16(8,1,true);
        var i=1;
        var st1=this.tabs.length;
        dvtmp.setUint16(10,st1,true);
        allbuffer.push(buftmp);
        var stt=12;
        for (var j=0;j<st1;j++) {
            var val1 = this.tabs[j].tabwpts;
            var st2=val1.length;
            for (var k=0;k<st2;k++) {
                var val2 = val1[k];
                var tmp=((val2.name=="")?"N" + "" + val2.lat + "" + ",E" + "" + val2.lng:val2.name);
                var etapename='E'+i+'_'+tmp+"\0"; 
                stt+=12+etapename.length;
                buftmp=new ArrayBuffer(12+etapename.length);
                dvtmp = new DataView(buftmp,0);
                dvtmp.setInt32(0,parseInt(val2.lng*100000),true);
                dvtmp.setInt32(4,parseInt(val2.lat*100000),true);
                var e=1+(((j+k)==(st1+st2-2))?1:0)+((j==0)&&(k==0)?2:0);        
                dvtmp.setUint8(8,e,true);
                dvtmp.setUint8(9,0,true);
                dvtmp.setUint16(10,etapename.length,true);
                var st3=etapename.length;
                for (var l=0;l<st3;l++) {
                    dvtmp.setUint8(12+l,(etapename.charCodeAt(l))%256,true);
                }
                allbuffer.push(buftmp);
                i++;
            }
        }
        var ret="";
        var st4=allbuffer.length;
        for (var m=0;m<st4;m++) {
            var onebuf=allbuffer[m];
            dvtmp=new DataView(onebuf,0);
            var st5=onebuf.byteLength;
            for (var n=0;n<st5;n++) {
                ret+=String.fromCharCode(dvtmp.getUint8(n,true));
            }
        }
        ret=new Blob(allbuffer,{ type: 'application/octet-stream' });
        return ret;
    }
    
    this.sendHelper.toSubmitData(this.gotbinaryfile());

}

