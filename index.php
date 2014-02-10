<?php

if (isset($_POST['submitted'])) {

  	// connect to database
  	require_once ('./php/sql/db_connect.php');

	$sql = "INSERT INTO security_control SET
     standard_id = 2,
     control_family_id = " . $_POST['control_family'] . ",
     control_number = '" . $_POST['control_number'] . "',
     control_name = '" . $_POST['control_name'] . "',
     control_desc = '" . $_POST['control_desc'] ."',
     control_question = '" . $_POST['control_question'] ."',
     supplemental = '" . $_POST['supplemental'] ."'";

	if (!mysqli_query($dbc, $sql))
	{
		$error = 'Error adding security control: ' . mysqli_error($dbc);
		include './templates/error.html.php';
		exit();
	}

  $sql = "INSERT INTO assessment_question (
              client_assess_id,
              control_id,
              assess_question )
          SELECT 1, control_id, control_question
               FROM security_control 
               WHERE control_id = LAST_INSERT_ID()";

  if (!mysqli_query($dbc, $sql))
  {
    $error = 'Error adding assessment question: ' . mysqli_error($dbc);
    include './templates/error.html.php';
    exit();
  }

}

// start a session
session_start();

include ('./templates/header.html');
?>

  <!-- main display area -->
  <div id="mainView"></div>

  <!-- main display sub-page area -->
<!--  <div class="container">  -->
    <div id="subTabPage"></div>
<!--  </div> -->

<?php
include ('./templates/footer.html');
?>
