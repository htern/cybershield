<!--
	  Load Security Controls
-->

<?php

  // connect to database
  require_once ('../php/sql/db_connect.php');

  $sql = "SELECT control_number, control_name 
            FROM security_control";
  $rs = @mysqli_query ($dbc, $sql);	// run the query

  if ($rs) {
?>


    <div class="container">
      <h3>NIST 800-53 (Revision 3)</h3>
      
      <form class="form-inline">
        <ul class="table-filters">
          <!--<li><input type="text" class="form-control" placeholder="Threat-based Search" /></li>-->
          <li>
            <select class="form-control">
              <option>All Control Family</option>

              <?php
                // retrieve control family list
                require ('../php/sql/control_family_retrieve_list.php');

                if ($result) {

                  // process result set
  /*              <option value="1">AC-Access Control</option>
                  <option></option>
                  <option></option>
  */
                  while ($row = mysqli_fetch_array( $result, MYSQLI_ASSOC)) {
                    echo '
                      <option value="' . $row['control_family_id'] . '">' . 
                      $row['identifier'] . '-' . $row['control_family_name'] . 
                      '</option>';
                  }
                }
              ?>

            </select>
          </li>
<!--      <li>
            <button class="btn btn-primary">Add New Control</button>
          </li> -->
        </ul>
      </form>
    </div>

    <div class="container">
      <table class="table table-striped table-bordered table-hover table-condensed instances">
        <thead>
          <tr>
            <th><a href="#" class="sortable">Control Number</a></th>
            <th><a href="#" class="sortable">Control Name</a></th>
            <th><a href="#" class="sortable">Complete</a></th>
            <th><a href="#" class="sortable">Score</a></th>
          </tr>
        </thead>
        <tbody>


<?php

  	// process result set
  	while ($row = mysqli_fetch_array( $rs, MYSQLI_ASSOC)) {
  		echo '
  		  <tr>
  		    <td>' . $row['control_number'] . '</td>
  		    <td>' . $row['control_name'] . '</td>
          <td>N</td>
          <td></td>
  		  </tr>
  		';
  	}

  	echo '
  	    </tbody>
  	  </table>
      </div>
  	  ';
  } else {
    echo '<p>ERROR: Unable to retreive data!</p>';
  }

?>
