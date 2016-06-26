<?php
return array(
    'features' => array(
        'html5-boilerplate' => array(
            'name' => 'HTML5 Boilerplate',
            'description' => 'HTML5 Boilerplate is a professional front-end template'
                . ' for building fast, robust, and adaptable web apps or sites.',
        ),
        'angular' => array(
            'name' => 'Angular',
            'description' => 'AngularJS is a toolset for building the framework most'
                . ' suited to your application development.',
        ),
        'karma' => array(
            'name' => 'Karma',
            'description' => 'Spectacular Test Runner for JavaScript.',
        ),
    ),
    'queries' => array (
        'nbids' => "select COUNT(*) from `RequestsIds` ",
        'ids' => "SELECT `RequestsIds`.`id` AS `id`,`RequestsIds`.`ip` AS `ip`,"
        . "`RequestsIds`.`useragent` AS `useragent`,`RequestsIds`.`ndate` AS `ndate`,"
        . "`Cookies`.`typeext` AS `typeext`,`Cookies`.`extrawpts` AS `extrawpts`,"
        . "`Cookies`.`extratrk` AS `extratrk`,`Cookies`.`fname` AS `fname`,"
        . "`Cookies`.`ename` AS `ename`,`Cookies`.`sendtype` AS `sendtype`,"
        . "`Cookies`.`del1step0` AS `del1step0`,`Cookies`.`del1step1` AS `del1step1`"
        . "FROM (`RequestsIds` LEFT OUTER JOIN `Cookies` "
        . "ON (`RequestsIds`.`id` = `Cookies`.`id4identities`)) ",
        'urls' => "SELECT * FROM `RequestsUrls` ",
        'nbsidsgroupbyip' => "SELECT COUNT(*) FROM "
        ."(SELECT `ip` FROM `RequestsIds` GROUP BY `ip`) AS TEMP",
        'idsgroupbyip' => "SELECT `RequestsIds`.`ip` AS `ip`, "
        ."GROUP_CONCAT(`RequestsIds`.`id` SEPARATOR '#') AS `ids`,"
        ."COUNT(`RequestsIds`.`ip`) AS `nbids`, "
        ."GROUP_CONCAT(`RequestsIds`.`ndate` SEPARATOR '#') AS `ndate`, "
        ."COUNT(`RequestsUrls`.`url`) AS `nburls` "
        ."FROM `RequestsIds` LEFT OUTER JOIN `Cookies` ON `RequestsIds`.`id` = `Cookies`.`id4identities` "
        ."LEFT OUTER JOIN `RequestsUrls` ON `RequestsIds`.`id` = `RequestsUrls`.`id4identities` "
        ."GROUP BY `RequestsIds`.`ip`",
    ),
);
