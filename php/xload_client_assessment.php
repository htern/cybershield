<?php

  // retrieve control family list
  require ('../php/sql/client_assessment_retrieve_list.php');

  if ($result) {

  	echo '<div class="container">
  	  <table class="table table-striped table-bordered table-hover table-condensed instances">
  	    <thead>
    	    <tr>
    	      <th><a href="#" class="sortable">Client</a></th>
  	        <th><a href="#" class="sortable">Start Date</a></th>
            <th><a href="#" class="sortable">Security Standard</a></th>
            <th><a href="#" class="sortable">Analyst</a></th>
            <th><a href="#" class="sortable">Status</a></th>
            <th><a href="#" class="sortable">% Complete</a></th>
  	      </tr>
  	    </thead>
  	    <tbody>
  		';

  	// process result set
  	while ($row = mysqli_fetch_array( $result, MYSQLI_ASSOC)) {
  		echo '
  		  <tr>
  		    <td>' . $row['client_name'] . '</td>
          <td>' . $row['assessment_date'] . '</td>
          <td>' . $row['standard_type'] . '</td>
          <td>' . $row['assessed_by'] . '</td>
          <td>' . $row['status'] . '</td>
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
    echo '<p>ERROR: Unable to retreive client assessment data!</p>';
  }

?>
