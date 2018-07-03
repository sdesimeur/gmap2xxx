<?php
$tokenok=true;


require_once 'PHPMailerAutoload.php';
include ("../mysql/testsecurity.php");

function nextFunc ($conn) {
    $ename = base64_decode($_POST['ename']);
    $data = base64_decode($_POST['data']);
    $fname = base64_decode($_POST['fname']);
    $mbody = base64_decode($_POST['mbody']);    
    $mail = new PHPMailer;
    $fileKey='.config/.smtp/.config.php';
    $i=0;
    while ( (! file_exists($fileKey)) && ($i < 10) ) {
    	$fileKey = '../' . $fileKey;
        $i++;
    }
    if ($i<10) include ($fileKey);
    
    $mail->setFrom('gps@sdesimeur.com','Samuel Desimeur');
    $mail->addReplyTo('gps@sdesimeur.com','Samuel Desimeur');
    $mail->addAddress($ename);
    $mail->Subject = 'Itineraire de GMap2XXX';
    $mail->isHTML(true);
    $mail->Body = $mbody;
    $mail->addStringAttachment($data,$fname);
    Header ("Content-type: text/plain; charset=utf-8");
    if (!$mail->send()) {
    	echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
    	echo "Message envoy&eacute; &agrave; " . $ename;
    }
}
?>
