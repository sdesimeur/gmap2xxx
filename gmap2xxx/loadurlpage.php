<?php
$tokenok=true;

    
function nextFunc ($conn) {
    
    Header('Cache-Control: no-cache, must-revalidate');
    $url = base64_decode($_POST['url']);
    $keyno = ($_POST['key']=="0");
    $keyok = ($_POST['key']=="1");
    $keynav = ($_POST['key']=="2");
    $opts = array(
      'http'=>array(
          'method'=>"GET",
          'header'=>"Accept-language: en\r\n" .
                "Cookie: foo=bar\r\n".
                "User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0"
      )
    );
    $context = stream_context_create($opts);
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
    }
    if ($keyno) {
        Header ("Content-type: text/html; charset=utf-8");
        ini_set('user_agent', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0');
    }
    
    
    if ($keynav) {
        Header ("Content-type: text/html; charset=utf-8");
        ini_set('user_agent', 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:53.0) Gecko/20100101 Firefox/53.0');
    }
	//$page=file_get_contents($url,false,$context);
	$page=file_get_contents($url);
	$page=str_replace(array("\n","\r"),"",$page);
	echo $page;
}

include ("../mysql/testsecurity.php");
?>
