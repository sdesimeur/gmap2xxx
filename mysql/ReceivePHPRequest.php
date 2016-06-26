<?php
$tokenok=true;

include ("../mysql/testsecurity.php");


function nextFunc ($conn) {
    $restab = Array();
    Header("Cache-Control: no-cache, must-revalidate");
    Header ("Content-type: application/json; charset=utf-8");
    //Header ("Content-type: text/html; charset=utf-8");
    $sqltxt = base64_decode($_POST['sql']);
    $sql = json_decode($sqltxt);
    $sz=count($sql);
    for ($i=0;$i<$sz;$i++) {
        $result=$conn->query($sql[$i]);
        if ( ! ($result) ) {
           $restab[$i]="erreur";
           $tmp = sprintf("INSERT INTO Errors (id,error,sqltxt) VALUES (null,'%s','%s')",$conn->real_escape_string($conn->error),$conn->real_escape_string($sql[$i]));
           $conn->query($tmp);
        } else {
            if ($result !== true) {
                array_push($restab,$result->fetch_all(MYSQLI_ASSOC));
            }
        }
    }
    echo json_encode($restab);
}

?>
