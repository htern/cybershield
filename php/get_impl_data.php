<?php
/**
 *
 * Highcharts - deeper practice for real statistics
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Script Tutorials
 * http://www.script-tutorials.com/
 */

function splitByPairs($array) {
    $odd = array();
    $even = array();
    $both = array(&$even, &$odd);
    array_walk($array, function($v, $k) use ($both) { $both[$k % 2][] = $v; });
    return array($odd, $even);
}

require_once('parsecsv.lib.php');

// select filename
$sFilename = '../data/implementation_data.csv';

// parse CSV
$csv = new parseCSV($sFilename, 0); // 4 is offset (of rows with comments)

// get all categories from the first table
$aCats = array();
foreach ($csv->data[0] as $s) {
    if ($s = trim($s)) {
        $aCats[] = $s;
    }
}

// get stat number (ID)
$i = (int)$_GET['id'];

// Get exact Stat info by ID
$sTitle = $csv->data[$i]['Implementation'];
$aDataSlc = array_slice($csv->data[$i], 3); // we can remove (slice) first three fields (they contain title and total information)
$aData = array();
foreach ($aDataSlc as $s) {
    $aData[] = $s;
}

// separate $aData array to odd and even pairs
list($aPerc, $aVals) = splitByPairs($aData);

// prepare separated arrays of amounts and percentages with category names
$i = 0;
$aValRows = $aPercRows = array();
foreach ($aCats as $s) {
    $fValue = str_replace(',', '.', $aVals[$i]);
    $fValue = ((float)$fValue) ? (float)$fValue : 0;
    $aValRows[] = array('name' => $s, 'val' => $fValue);

    $fPercent = str_replace(',', '.', $aPerc[$i]);
    $fPercent = ((float)$fPercent) ? (float)$fPercent : 0;
    $aPercRows[] = array('name' => $s, 'val' => $fPercent);

    $i++;
}

// echo JSON data
$aJson = array();
$aJson['name'] = trim($sTitle);
$aJson['categories'] = $aCats;
$aJson['values'] = $aValRows;
$aJson['percentages'] = $aPercRows;
echo json_encode($aJson);
