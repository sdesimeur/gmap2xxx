<?php
$file='.config/.mysql/.config.php';
$i=0;
while ( (! file_exists($file)) && ($i < 10) ) {
	$file = '../' . $file;
    $i++;
}
if ($i<10) include ($file);
$conn = new mysqli($host_name, $user_name, $password, $database);

if($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    if ($tokenok) {
        $token = $_POST['token'];
        $IP = $_POST['IP'];
        $sqldel="DELETE FROM Sessions WHERE (CURRENT_TIMESTAMP()-ndate)>(15*60)";
        $sqlupd=sprintf("UPDATE Sessions SET ndate=null WHERE token='%s'",$token);
        $sqlver=sprintf("SELECT id From Sessions WHERE (ip='%s' AND token='%s')",$IP,$token);
        $conn->query($sqldel);
        $conn->query($sqlupd);
        $result = $conn->query($sqlver);
        if ($result->num_rows > 0) {
            nextFunc($conn);
        } else {
            header("HTTP/1.0 409 Conflict");
            trigger_error("Votre session a expirée", E_USER_NOTICE);
        }
    } else {
        nextFunc($conn);
    }
    $conn->close();
}
?>
