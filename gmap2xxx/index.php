<?php 
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
	<title>Conversion d&rsquo;une URL en fichier ITN pour Tomtom ou en fichier GPX</title>
<link rel="stylesheet" href="../jquery/jquery-ui.min.css" />
<link rel="stylesheet" href="./index.css" />
	<meta content="text/html; charset=utf-8" http-equiv="content-type">
    <meta charset="UTF-8">
	<meta type="keywords" content="google,maps,googlemaps,gps,tomtom,itn,gpx,conversion,convert,route" />
        <meta type="description" content="Transformez vos URL GoogleMaps en fichier pour un GPS." />
        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
</head>
<body>
    <?php include "../mysql/security.php"; ?>
    <div id="dialogs"></div>
	<script type="text/javascript" src="./Loader.js?version=075"></script>
	<script type="text/javascript" src="../jquery/jquery-1.12.3.min.js"></script>
	<script type="text/javascript" src="../jquery/jquery-ui.min.js"></script>
<!--	<script type="text/javascript" src="./View.js"></script>
	<script type="text/javascript" src="./Controler.js"></script>
	<script type="text/javascript" src="./GoogleMaps.js"></script>
	<script type="text/javascript" src="./BingMaps.js"></script>
	<script type="text/javascript" src="./TabWpts.js"></script>
	<script type="text/javascript" src="./TypeGPX.js"></script>
	<script type="text/javascript" src="./TypeITN.js"></script>-->
<!--    <script type="text/javascript" src="../firebug-lite.js"></script>-->

	<br/>
	<table id="promotion" class="mepg"><tr>
		<td class="cote" id="gauche">
			<table id="over_titre" class="mepw"><tr>
				<td>
					<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
					<h2>Paypal</h2>
					<input type="hidden" name="cmd" value="_s-xclick">
					<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----">
					<input type="image" src="https://www.paypalobjects.com/fr_FR/FR/i/btn/btn_donateCC_LG.gif" name="submit" alt="PayPal - la solution de paiement en ligne la plus simple et la plus sécurisée !">
					<img id="paypal" alt="" src="https://www.paypalobjects.com/fr_FR/i/scr/pixel.gif">
					</form>
				</td>
			</tr></table>
			<table class="titre_principal mepg"><tr><td><h2>Conversion d&rsquo;une URL<br/>###GMAPLNK### ou ###BMAPLNK###<br/>en fichier ITN pour Tomtom<br/>ou en fichier GPX</h2></td></tr></table>
		</td>
		<td class="cote" id="droite">
				<h2>Facebook</h2>
			Si vous souhaitez obtenir des renseignements, 
			partager votre expérience concernant GMap2XXX
			ou indiquer les problèmes que vous avez rencontrés,
			abonnez vous sur la page FaceBook.
			<a href="https://www.facebook.com/gmap2itn" target="_blank" title="GMap2XXX"><img id="img_gmap2itn" src="https://badge.facebook.com/badge/211700412284833.904.92227316.png" style="border: 0px;" /></a>
		</td>
	</tr></table>
<table id="newsheader" class="mepg"> <tr><td class="gris">
	<h1 class="titreeffect"><a href="#nouveautes">Nouveaut&eacute; pour les Smartphones</a>.</h1>
</td></tr></table>

<table id="backgd"><tr>
<td id="googleads">
<script type="text/javascript">
	google_ad_client = "ca-pub-9661728609879677";
	google_ad_slot = "8918890402";
	google_ad_width = 160;
	google_ad_height = 600;
	</script>
	<!-- gps -->
	<script type="text/javascript"
	src="//pagead2.googlesyndication.com/pagead/show_ads.js">
	</script>
</td>
<td id="gmap2xxx">
		<table class="mepg">
			<tr>
				<td class="gris">
					<p>
						<b><i><u>Vous souhaitez avoir un retour par:</u></i></b>:<br> 
					&nbsp;&nbsp;<input type="radio" name="sendtype" id="sendtypeemail" value="email"><label for="sendtypeemail"> Un email</label>
					<span id="enamezone"> : 
						<input name="ename" id="ename" size="50" type="email" value="">&nbsp;
						<input type="button" id="resetename" value="Reset">
						&nbsp;&nbsp;&nbsp;
					</span> <br>
					&nbsp;&nbsp;<input type="radio" name="sendtype" id="sendtypefile" value="file"><label for="sendtypefile"> Un fichier</label><br>
					&nbsp;&nbsp;<input type="radio" name="sendtype" id="sendtypescreen" value="screen"><label for="sendtypescreen"> L'ecran</label><br>
					<br>
					Donnez <b><i><u>un nom &agrave; votre route</u></i></b> :
					<span id="fnamezone">
						<input name="fname" id="fname" size="35" type="text" value="">&nbsp;
						<input type="button" id="resetfname" value="Reset">&nbsp;
						<input type="button" id="buttonincrement" value="Incrément">
					</span> <br>
					<p>
						S&eacute;lectionner un <b><i><u>type de sortie</u></i></b> souhait&eacute;:<br> 
						<input type=radio name="typeext" id="typeitn" value="typeitn">
						<label for="typeitn"><b><i><u>ITN</u></i></b> (Pour Tomtom)</label>    
						<input type=radio name="typeext" id="typegpx" value="typegpx">
						<label for="typegpx"><b><i><u>GPX</u></i></b> (Pour un GPS qui comprend ce type g&eacute;n&eacute;rique)</label>
						<input type=radio name="typeext" id="typeitf" value="typeitf">
						<label for="typegpx"><b><i><u>ITF</u></i></b> (Pour l'application <a href="https://play.google.com/store/apps/details?id=com.sygic.aura">Sygic</a> pour Android, IPhone,...)</label>
<!--						<input type=radio name="typeext" id="typeitf" value="typeitf">
						<b><i><u>ITF</u></i></b> (Pour l'application <a href="">Sygic</a>)-->
					</p>
					<div id="gpxoptions">
					Options : <br>
					&nbsp;<input name="extratrk" id="extratrk" value="on" type="checkbox"><label for="extratrk"> Ajouter une trace (trk) lisible pour les applications (OSMAND, Locus, ...)</label><br>
					&nbsp;<input name="extrawpts" id="extrawpts" value="on" type="checkbox"><label for="extrawpts"> Ajouter les waypoints des indications des changements de direction obtenus dans ###GMAPLNK###.</label><br>
					</div>

				</td>
			</tr>
		</table>
		<br/>
		<div id="zoneurl">
			<table class="mepg">
				<tr>
					<td class="gris">
						<h1>ATTENTION</h1>
						<h2>Vous devez utiliser la nouvelle interface de ###GMAPLNK###<br> &nbsp;&nbsp;&nbsp;ou l'interface ###BMAPLNK###.<br>
						</h2>
						<ul id="zoneallurls">
							<li>
								<fieldset>
									<label for="url0"><span id="txturl0">Entrez une URL</span> obtenue dans ###GMAPLNK### ou dans ###BMAPLNK### (Lisez les <a href="#remarques">remarques</a> ci-dessous):</label><br/>
									<input name="url[]" id="url0" type="text" class="url">
									&nbsp;<button id="razurl0" value="razurl" type="button" class="razurl">Remise à zéro de l'URL</button><br/>
									<label for="del1step0">Si vous souhaitez supprimer la premi&egrave;re &eacute;tape pour cette URL, cochez la case suivante:</label>
									<input name="del1step[]" id="del1step0" value="on" type="checkbox">
								</fieldset>
							</li>
							<br/>
							<div id="zoneurl2"></div>
						</ul>
						<div id="btnsubmurl">
						<table><tr>
							<td><label for="tempanchor"><a id="submitbtn" name="submitbtn">Transformer les URLs</a></label></td>
							<td><button id="addurl" value="addurl" type="button">Ajouter une URL</button></td>
							<td><button id="razurlall" value="razallurl" type="button">Remise à zéro des URLs</button></td>
						</tr></table>
						</div>
					</td>
				</tr>
			</table>
		</div>
</td>	
</tr></table>
		<div id="myemailzone">
			<table><tr>
				<td class="gris">
                    <b><i>Pour m&rsquo;aider &agrave; am&eacute;liorer le script</i></b>, laissez la case suivante coch&eacute;e <input name="emailok" id="emailok" value="on" type="checkbox">,<br>
					les URLs utilis&eacute;es me seront automatiquement envoy&eacute;es. <br>
					<i><b>Ces informations ne seront pas utilis&eacute;es &agrave; des fins commerciales.</b></i><br>
				</td>
			</tr></table>
		</div>
<table>
<tr><td class="conseils">
	<div id="variablezone">
	
	</div>
	<br/>
</td></tr>
<tr><td class="conseils">
	<h4><a name="trouverurl">
		O&ugrave; trouver l'URL dans ###GMAPLNK###?
	</a></h4>
	L'URL se trouve tout simplement dans la barre d'adresse quelques secondes apr&egrave;s la derni&egrave;re modification!
	<br/>
	Vous pouvez aussi la trouver dans le menu "Partager", mais vous ne devez pas prendre l'url courte!
	<br/>
	<br/>
</td></tr>
<tr><td class="conseils">
	<h4 class="titreeffect"><a name="nouveautes">
		Nouveaut&eacute; pour les Smartphones
	</a></h4>
	Plusieurs éléments sont fournis pour les fichiers GPX :<br>
	<ul>
		<li> Les waypoints (wpt) que vous avez choisis lors de la cr&eacute;ation de l'itin&eacute;raire sous ###GMAPLNK### sont automatiquement inclus dans le fichier.</li>
		<li> La route (rte) qui suit ses m&ecirc;mes waypoints est automatiquement incluse. c'est normalement la norme de cr&eacute;ation d'un itin&eacute;raire, mais trop peu d'applications suivent cette norme (voir <a href="#applications">ci-dessous</a>).</li>
		<li> La trace (trk) qui s'affiche dans l'&eacute;cran de ###GMAPLNK### peut être ajout&eacute;e au fichier en option (voir les options). Elle est normalement pr&eacute;vue pour s'afficher sur la carte de navigation, elle n'est normalement pas pr&eacute;vue pour la navigation mais il y a des exceptions (voir <a href="#applications">ci-dessous</a>).</li>
		<li> Les waypoints (wpt) de changement de direction qui s'affichent dans l'&eacute;cran de ###GMAPLNK### peut être ajout&eacute;e au fichier en option (voir les options). Cette option est toutefois déconseill&eacute;e, car elle ajoute un tr&eagrave;s grand nombre de points qui rendra la liste des waypoints illisible dans votre application</li>
	</ul>

	<a name="applications">Plusieurs applications pour SmartPhone Android sont compatibles</a>:
	<ul>
		<li> Les traces (trk en option) sont compatibles avec <a href="https://play.google.com/store/apps/details?id=com.mapfactor.navigator">MapFactor Navigator</a>. La route (rte) est compatible avec <a href="https://play.google.com/store/apps/details?id=com.mapfactor.navigator">MapFactor Navigator</a> en la chargeant avec le plugin <a href="https://play.google.com/store/apps/details?id=org.kadiba.routeimporter">MapFactor Navigator Plugin</a>.</li>
	<li> Les traces (trk en option) sont compatibles avec <a href="https://play.google.com/store/apps/details?id=net.osmand">OSMAND</a> de deux façons : <ul>
 <li>Elles peuvent &ecirc;tre affich&eacute;es sur la carte dans le menu "Configurer la carte".</li>
 <li>Elles peuvent &ecirc;tre suivies en guidage routier dans les "param&egrave;tres de navigation".</li>
</ul></li>
	<li> Les traces (trk) sont compatibles avec <a href="https://play.google.com/store/apps/details?id=menion.android.locus">Locus Map</a> pour un affichage sur la carte. Je vous laisse le soin de voir s'il est possible de les utiliser pour le guidage routier.</li>
	</ul>
	<br/>
</td></tr>
<tr><td class="conseils">
	<h4><a name="remarques">
		Remarque:
	</a></h4>
	Il n&rsquo;y a aucune garantie du r&eacute;sultat, car votre GPS n'a pas le m&ecirc;me moteur de calcul que 
	###GMAPLNK### et que ###BMAPLNK###.
	<br/>
	La seule garantie est de cr&eacute;er un itin&eacute;raire qui passera par les points que vous avez indiqu&eacute;s lors de la création de votre itinéraire sous ###GMAPLNK### ou sous ###BMAPLNK###.
	<br/>
</td></tr>
<tr><td class="conseils">
	<h4>Attention:</h4>
	<i>
		Une fois le fichier charg&eacute; dans votre GPS, v&eacute;rifiez les points de passage qui se trouvent sur les 2x2 voies.
		<br/>
		Il est possible qu'ils se trouvent sur la mauvaise voie (&agrave; cause des diff&eacute;rences de cartographie)
		<br/>
		Dans ce cas, votre GPS vous obligera &agrave; faire demi-tour pour y passer.
	</i>
	<br/>
</td></tr>
<tr><td class="conseils">
	<div class="bas_de_page">
		<a href="https://www.facebook.com/messages/gmap2itn" target="_blank">Pour m&rsquo;&eacute;crire</a>
		<br/>
		<a href="https://github.com/sdesimeur/gmap2xxx/tree/master/">Ici</a>, vous trouverez les sources de cette page ainsi que celles des scripts PHP.
		<br/>
		Libre &agrave; vous de les modifier.
	</div>
	<br/>
</td></tr>
</table>
</body>
</html>
