<!--
	  Load Security Controls
-->

<!--
<?php

  // start a session
  session_start();

  echo "<p>PHP: client session id: <%= client_assess_id %></p>";
  echo $_GET['client_assess_id'];

?>
-->

  <p>client session id: <%= client_assess_id %></p>

<?php

  // connect to database
  require_once ('../../php/sql/db_connect.php');

  // $sql = "SELECT control_number, control_name 
  //           FROM security_control";

  $sql = "SELECT sc.control_number, sc.control_name, q.assess_question,
                  q.overall_score
            FROM assessment_question q
            JOIN security_control sc ON (sc.control_id = q.control_id)
            WHERE client_assess_id = 1 AND 
                  sc.control_family_id = 1
            ORDER BY control_number
          ";

  $rs = @mysqli_query ($dbc, $sql);	// run the query

  if ($rs) {
?>
    
    <!-- Top section for the client assessment info -->
    <div class="container">
<!--      <h3>NIST 800-53 (Revision 3)</h3> -->
<!--       <p>ID: <%= client_assess_id %></p> -->

 
      <form class="form-inline">
        <ul class="table-filters">
          <!--<li><input type="text" class="form-control" placeholder="Threat-based Search" /></li>-->
          <li>
            <select class="form-control">
              <option>All Control Family</option>

              <?php
                // retrieve control family list
                require ('../../php/sql/control_family_retrieve_list.php');

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
      <table class="table table-hover table-condensed instances">
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
