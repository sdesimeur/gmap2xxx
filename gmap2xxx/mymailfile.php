<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

//require_once 'PHPMailerAutoload.php';

$tokenok=true;

include ("../mysql/testsecurity.php");

function nextFunc ($conn) {
    $ename = base64_decode($_POST['ename']);
    $data = base64_decode($_POST['data']);
    $fname = base64_decode($_POST['fname']);
    $mbody = base64_decode($_POST['mbody']);    
try {    
    $mail = new PHPMailer(true);
    $fileKey='.config/.smtp/.config.php';
    $i=0;
    while ( (! file_exists($fileKey)) && ($i < 10) ) {
    	$fileKey = '../' . $fileKey;
        $i++;
    }
    if ($i<10) include ($fileKey);
    
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
} catch (Exception $e) {
    echo "Message couldnt be sent. PHPMailer error: " . $e->getMessage();
}
}
?>
