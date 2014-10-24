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
}

// start a session
session_start();

include ('./templates/header.html');
?>


    <div class="container bs-docs-container">

      <div class="row">
        <div class="col-md-3">
          <div class="bs-sidebar" role="complementary">
            <ul class="nav bs-sidenav">

              <!-- display sidebar here -->
              <!-- <div id="mainSidebar"></div> -->
              <li class="active"><a href="#"><span class="badge pull-right">3.5</span><b>AC</b>-Access Control <span class="label label-primary">7</span></a></li>
              <li><a href="#"><span class="badge pull-right">2.5</span><b>AT</b>-Awareness and Training</a></li>
              <li><a href="#"><span class="badge pull-right">1.5</span><b>CA</b>-Securty Assessment and Authorization</a></li>
              <li><a href="#"><b>PE</b>-Physical and Environmental Protection   <span class="label label-primary">12</span></a></li>
              <li><a href="#"><b>SC</b>-System and Communications Protection</a></li>

            </ul>
  
            <a href="#new-project" id="add-project" class="btn pull-right"><i class="icon-folder-open"></i>&nbsp;&nbsp;Add Control</a>
  
          </div>

        </div>

        <div class="col-md-9" role="main">
          <div class="bs-docs-section">

          <!-- main display area -->
          <div id="mainView"></div>

          <!-- main display sub-page area -->
          <div class="container">
            <div id="subTabPage"></div>
          </div>

        </div>
      </div>
    </div>
  </div>

<?php
include ('./templates/footer.html');
?>
