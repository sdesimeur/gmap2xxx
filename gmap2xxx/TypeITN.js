"use strict";

function TypeITN (tabs,sendHelper) {
    this.sendHelper=sendHelper;
    this.tabs = tabs;

    this.gottxt = function  () {
        var ret="";
        var i=1;
        var st1=this.tabs.length;
        for (var j=0;j<st1;j++) {
            var val1 = this.tabs[j].tabwpts;
            var st2=val1.length;
            for (var k=0;k<st2;k++) {
                var val2 = val1[k];
                var tmp=((val2.name=="")?"N" + "" + val2.lat + "" + ",E" + "" + val2.lng:val2.name);
                var etapename='E'+i+'_'+tmp; 
                ret+= parseInt(val2.lng*100000) + "|" + parseInt(val2.lat*100000) + "|" + etapename + "|" + ((k==st2-1)&&(j==st1-1)?"2":"0") + "|\n";
                i++;
            }
        }
        return ret;
    }
    
    this.sendHelper.toSubmitData(this.gottxt());

}

