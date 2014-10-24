<?php
/**
 *
 * Permalinks - php-driven tutorial
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Script Tutorials
 * http://www.script-tutorials.com/
 */

// connect to db
require_once ('php/sql/db_connect.php');


// active menu elements, titles and explanations (depending on params)
$sMac1 = $sMac2 = $sMac3 = $sMac4 = $sMac5 = $sMac6 = '';
$sTitle = $sText = 'Home';
if ($_GET) {
    switch($_GET['module']) {
        case 'home':
            $sMac1 = 'class="active"';
            $sText = 'RewriteRule ^home/{0,1}$  index.php?module=home [QSA,L]';

            if (isset($_GET['key']) && $_GET['key']) {
                $sTitle .= ' - ' . $_GET['key'];
                $sText = 'RewriteRule ^home/([^/.]+)/{0,1}$  index.php?module=home&key=$1 [QSA,L]';
            }
            break;
        case 'faces':
            $sMac2 = 'class="active"';
            $sTitle = 'Faces';
            $sText = 'RewriteRule ^faces/{0,1}$  index.php?module=faces [QSA,L]';

            if (isset($_GET['value'])) {
                $sTitle .= ' - ' . (int)$_GET['value'] . ' page';
                $sText = 'RewriteRule ^faces/([0-9]+)/{0,1}$  index.php?module=faces&value=$1 [QSA,L]';
            }
            break;
        case 'clubs':
            $sMac3 = 'class="active"';
            $sTitle = 'Clubs';
            $sText = 'RewriteRule ^clubs/{0,1}$  index.php?module=clubs [QSA,L]';

            if (isset($_GET['key']) && isset($_GET['value'])) {
                $sTitle .= ' - ' . (int)$_GET['value'] . ' ' . $_GET['key'];
                $sText = 'RewriteRule ^clubs/([^/.]+)/([0-9]+)/{0,1}$  index.php?module=clubs&key=$1&value=$2 [QSA,L]';
            }
            break;
        case 'photos':
            $sMac4 = 'class="active"';
            $sTitle = 'Photos';
            $sText = 'RewriteRule ^photos/{0,1}$  index.php?module=photos [QSA,L]';

            if (isset($_GET['value1']) && isset($_GET['value2'])) {
                $sTitle .= ' - ' . (int)$_GET['value1'] . ' : ' . (int)$_GET['value2'];
                $sText = 'RewriteRule ^photos/([0-9]+)/([0-9]+)/{0,1}$  index.php?module=photos&value1=$1&value2=$2 [QSA,L]';
            }
            break;
        case 'videos':
            $sMac5 = 'class="active"';
            $sTitle = 'Videos';
            $sText = 'RewriteRule ^videos/{0,1}$  index.php?module=videos [QSA,L]';
            break;
        case 'blog':
            $sMac6 = 'class="active"';
            $sTitle = 'Blog';
            $sText = 'RewriteRule ^blog/{0,1}$  index.php?module=blog [QSA,L]';
            break;
        case 'other':
            if (isset($_GET['key'])) {
                $sTitle = 'Other - ' . $_GET['key'] . ' (or, error 404, not found)';
                $sText = 'RewriteRule ^([^/]+)/{0,1}$ index.php?module=other&key=$1 [QSA,L]';
            }
            break;
    }
} else {
    $sMac1 = 'class="active"';
}

// Display main page
$aKeys = array(
    '{url}' => 'http://www.script-tutorials.com/demos/343/',
    '{mact1}' => $sMac1,
    '{mact2}' => $sMac2,
    '{mact3}' => $sMac3,
    '{mact4}' => $sMac4,
    '{mact5}' => $sMac5,
    '{mact6}' => $sMac6,
    '{title}' => $sTitle,
    '{explanation}' => $sText,
);
echo strtr(file_get_contents('templates/xindex.html'), $aKeys);