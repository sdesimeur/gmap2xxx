<?php
$tokenok=true;

    
function nextFunc ($conn) {
    
    Header('Cache-Control: no-cache, must-revalidate');
    $url = base64_decode($_POST['url']);
    $keyok = ($_POST['keyok']=="1");
    if ($keyok) {
        $fileKey='.config/.googleKeys/.googleDirectionApiKey.php';
        $i=0;
        while ( (! file_exists($fileKey)) && ($i < 10) ) {
	        $fileKey = '../' . $fileKey;
            $i++;
        }
        if ($i<10) include ($fileKey);
        Header ("Content-type: application/json; charset=utf-8");
	    $url.="&key=" . $googleDirectionApiKey;
    } else {
        Header ("Content-type: text/html; charset=utf-8");
    }
    //trigger_error($url, E_USER_NOTICE);
	//$ch = curl_init();
	//curl_setopt($ch, CURLOPT_URL, $url);
	//curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); 
	//curl_setopt($ch, CURLOPT_FORBID_REUSE, true); 
	//curl_setopt($ch, CURLOPT_FRESH_CONNECT, true); 
	//curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	//curl_setopt($ch, CURLOPT_HEADER, false);
	//$page=curl_exec($ch);
	$page=file_get_contents($url);
    //trigger_error($page, E_USER_NOTICE);
	$page=str_replace(array("\n","\r"),"",$page);
	//curl_close($ch);
	echo $page;
}

include ("../mysql/testsecurity.php");
?>
