
<div class="container">


	<div class="form-container">

		<form class="form-horizontal" role="form" action="index.php" method="POST">

			<fieldset>

				<legend>New Control Details</legend>

				<div class="form-group">
				    <label class="col-sm-3 control-label">Security Standard</label>
				    <div class="col-sm-9">
				      	<p class="form-control-static">NIST 800-53</p>
				    </div>
				</div>

				<div class="form-group">
					<label for="control_family" class="col-sm-3 control-label">Control Family</label>
					<div class="col-sm-7">
						<select class="form-control" id="control_family" name="control_family">
						<?php
						  // retrieve control family list
						  require ('../../php/sql/control_family_retrieve_list.php');

						  if ($result) {
						  	// process result set
/*							<option value="1" selected="selected">AC-Access Control</option>
							<option value="2">AT-Awareness and Training</option>
							<option value="3">AU-Audit and Accountability</option>
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
					</div>
				</div>
		
				<div class="form-group">
					<label for="control_number" class="col-sm-3 control-label">Control Number</label>
					<div class="col-sm-3">
						<input type="text" class="form-control" name="control_number" id="control_number" placeholder="Control Number">
					</div>
				</div>

				<div class="form-group">
					<label for="control_name" class="col-sm-3 control-label">Control Name</label>
					<div class="col-sm-9">
						<input type="text" class="form-control" name="control_name" id="control_name" placeholder="Control Name">
					</div>
				</div>

				<div class="form-group">
					<label for="control_desc" class="col-sm-3 control-label">Control Description</label>
					<div class="col-sm-9">
						<textarea class="form-control" rows=3 name="control_desc" id="control_desc" placeholder="Control Description"></textarea>
					</div>
				</div>

				<div class="form-group">
					<label for="control_question" class="col-sm-3 control-label">Control Question</label>
					<div class="col-sm-9">
						<textarea class="form-control" rows=8 name="control_question" id="control_question" placeholder="Control Question"></textarea>
					</div>
				</div>

				<div class="form-group">
					<label for="supplemental" class="col-sm-3 control-label">Supplemental Guidance</label>
					<div class="col-sm-9">
						<textarea class="form-control" rows=10 name="supplemental" id="supplemental" placeholder="Supplemental Guidance"></textarea>
					</div>
				</div>

			</fieldset>
				
			<div class="form-group">
			    <div class="col-sm-offset-3 col-sm-9">
			      	<button type="submit" class="btn btn-default">Create Control</button>
			    </div>
			    <input type="hidden" name="submitted" value="TRUE">
			</div>

		</form>
	</div>
</div>
