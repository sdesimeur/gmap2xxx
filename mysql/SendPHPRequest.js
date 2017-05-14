"use strict";


function SendPHPRequest (sql,myCaller) {
    this.myCaller=myCaller;
    this.send = function (sql) {
        $.ajax({
            method: "POST",
            url: "../mysql/ReceivePHPRequest.php",
//            contentType: "application/json; charset=utf-8",
            data: { sql: utils.base64(JSON.stringify(sql)), token: document.getElementById('token').value, IP: document.getElementById('IP').value },      // NOTE CHANGE HERE
            success: function(msg) {
                this.myCaller.ajaxSuccessReturn(msg);
                //console.log(JSON.stringify(msg));
                }.bind(this),
            error: function(msg) {
                this.myCaller.ajaxErrorReturn(msg);
                console.log(JSON.stringify(msg));
                }.bind(this)
        });
    }
    this.send(sql);
}
