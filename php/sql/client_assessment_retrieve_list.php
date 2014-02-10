<?php

  require_once ('../../php/sql/db_connect.php');

  $sql = "SELECT client_assess_id, client_name, assessment_date, standard_type, 
  				status, assessed_by 
			FROM client_assessment ca
			JOIN client c ON (c.client_id = ca.client_id)
			join security_standard s ON (s.standard_id = ca.standard_id)
			ORDER BY assessment_date desc, client_name
		";
                      
  $result = @mysqli_query ($dbc, $sql);	// run the query

?>