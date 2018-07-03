"use strict";
function AllTabWpts (sendHelper) {
    this.sendHelper=sendHelper;
    this.vars=this.sendHelper.vars;
    this.allTabs=[];
    this.nbTabReady=0;
    this.nbTab=0;
    this.isFull = false;
    this.addTab = function (tab2add) {
       this.allTabs.push(tab2add);
       this.nbTab++;
    }
    this.incrNbTabReady = function () {
        this.nbTabReady++;
        if ((this.isFull) && (this.nbTabReady == this.nbTab)) {
            var tabs = [];
            var st = this.allTabs.length;
            for (var i=0;i<st;i++) {
                tabs.push(this.allTabs[i]);
            }
            this.sendHelper.toSubmit(tabs); 
        }
    }
}

