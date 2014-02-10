<?php

  // retrieve control family list
  require ('../php/sql/control_family_retrieve_list.php');

  if ($result) {

  	echo '<div class="container">
  	  <table class="table table-striped table-bordered table-hover table-condensed instances">
  	    <thead>
    	    <tr>
    	      <th><a href="#" class="sortable">Control Family</a></th>
  	        <th><a href="#" class="sortable"># of Controls</a></th>
            <th><a href="#" class="sortable">% Complete</a></th>
            <th><a href="#" class="sortable">Average Score</a></th>
  	      </tr>
  	    </thead>
  	    <tbody>
  		';

  	// process result set
  	while ($row = mysqli_fetch_array( $result, MYSQLI_ASSOC)) {
  		echo '
  		  <tr>
  		    <td><b>' . $row['identifier'] . '</b>-' . $row['control_family_name'] . '</td>
  		    <td>' . $row['controlCnt'] . '</td>
          <td></td>
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
    echo '<p>ERROR: Unable to retreive control family data!</p>';
  }

?>
