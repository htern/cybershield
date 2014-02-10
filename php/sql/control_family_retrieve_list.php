<?php

  require_once ('../../php/sql/db_connect.php');

  $sql = "SELECT cf.control_family_id, identifier, control_family_name, COUNT(DISTINCT sc.control_id) as controlCnt
		     FROM control_family cf
		     LEFT JOIN security_control sc ON ( sc.control_family_id = cf.control_family_id )
		     GROUP BY cf.control_family_id, identifier, control_family_name
		     ORDER BY cf.control_family_id, identifier, control_family_name
			";

  $result = @mysqli_query ($dbc, $sql);	// run the query

?>