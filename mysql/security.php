<?php
$tokenok=false;
$IP=$_SERVER['REMOTE_ADDR'];
$token = md5((md5($IP).md5(microtime(true)).md5(mt_rand())));
echo sprintf('<input type="hidden" id="IP" value="%s">',$IP);
echo sprintf('<input type="hidden" id="token" value="%s">',$token);

include ("../mysql/testsecurity.php");

function nextFunc ($conn) {
    global $IP, $token;
    $sql=sprintf("INSERT INTO Sessions (id,ip,token) VALUES (null,'%s','%s')",$IP,$token);
    $result=$conn->query($sql);
    if ( ! ($result) ) {
       $restab[$i]="erreur";
       $tmp = sprintf("INSERT INTO Errors (id,error,sqltxt) VALUES (null,'%s','%s')",$conn->real_escape_string($conn->error),$conn->real_escape_string($sql[$i]));
       $conn->query($tmp);
    }
}
?>
