"use strict";
$(document).ready(function () { 
    $(document).on('click','#submit',function () {
        var sqltxt=$('#sqltxt').val();
        var tab = sqltxt.split(";");
        new SendPHPRequest(tab,null);
    });
   
});
