<?php
require 'Slim/Slim.php';

$app = new Slim();

$app->post("/assessments", "createAssessment");
$app->get("/assessments", "getClientAssessments");
$app->get("/assessments/:client_id", "getClientAssessment");
$app->get("/categories/:assessment_id", "getAssessmentSummary");
$app->get("/controlfamilies", "getControlFamilies");
$app->get("/controlquestions/:id", "getControlQuestions");
$app->get("/users", "getUsers");
$app->get("/users/:username", "getUser");
$app->post("/users/new", "createUser");
$app->put("/users/:username", "updateUser");
$app->delete("/users/:username", "deleteUser");
$app->get("/assessmentQuestions/:assess_id/:category_id", "getAssessmentQuestions");
$app->get("/questions/:question_id", "getQuestion");
$app->put("/questions/:question_id", "updateQuestion");
$app->get("/assessments/notes/:question_id", "getNotes");
$app->post("/assessments/notes", "createNotes");
$app->delete("/assessments/notes/:question_id/:assess_note_id", "deleteInterviewNotes");
$app->get("/assessments/employees/:question_id", "getEmployeeUtilization");
$app->post("/assessments/employees", "createEmployeeUtilization");
$app->delete("/assessments/employees/:question_id/:employee_id", "deleteEmployeeUtilization");
$app->get("/assessments/tools/:question_id", "getToolUtilization");
$app->post("/assessments/tools", "createToolUtilization");
$app->delete("/assessments/tools/:question_id/:client_tool_id", "deleteToolUtilization");
$app->get("/employees/all/:client_id", "getEmployees");
$app->get("/employees/:employee_id", "getEmployee");
$app->put("/employees/:employee_id", "updateEmployee");
$app->post("/employees/new", "createEmployee");
$app->delete("/employees/:employee_id", "deleteEmployee");
$app->get("/clients", "getClients");
$app->get("/clientTools/all/:client_id", "getClientTools");
$app->get("/clientTools/:client_tool_id", "getClientTool");
$app->put("/clientTools/:client_tool_id", "updateClientTool");
$app->post("/clientTools/new", "createClientTool");
$app->delete("/clientTools/:client_tool_id", "deleteClientTool");
$app->get("/vendorProducts", "getVendorProducts");

$app->run();

function getVendorProducts() {

  	$sql = "SELECT v.vendor_id, v.vendor_name, vp.vendor_product_id, vp.product_name, tp.tool_type
				FROM vendor v
				LEFT JOIN vendor_product vp ON (vp.vendor_id = v.vendor_id)
				LEFT JOIN tool_type tp ON (tp.tool_type_id = vp.tool_type_id)
				ORDER BY v.vendor_name, vp.product_name
			";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$rs = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

		$first_time = true;
		$vendors = [];
		$vendor_products = [];
		$vendor_products["products"] = [];
		$vendorID = 0;
		$product = [];
		foreach ($rs as $row) {
			if ($vendorID == $row->vendor_id) {
				$product["vendor_product_id"] = $row->vendor_product_id;
				$product["product_name"] = $row->product_name;
				$product["tool_type"] = $row->tool_type;
				array_push($vendor_products["products"], $product);
			 } else {
			 	if ($first_time) {
			 		$first_time = false;
			 		$vendorID = $row->vendor_id;
			 	} else {
			 		// changed of vendor, push vendor to array
					array_push($vendors, $vendor_products);
					// reset vendor ID and vendor products array
					$vendorID = $row->vendor_id;
					$vendor_products["products"] = [];			 		
			 	}
				$vendor_products["vendor_id"] = $row->vendor_id;
				$vendor_products["vendor_name"] = $row->vendor_name;
				$product["vendor_product_id"] = $row->vendor_product_id;
				$product["product_name"] = $row->product_name;
				$product["tool_type"] = $row->tool_type;
				array_push($vendor_products["products"], $product);
			}
		}
		// last one to push to array
		array_push($vendors, $vendor_products);
		echo json_encode($vendors);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteClientTool($client_tool_id) {
	$request = Slim::getInstance()->request();
	$rs = json_decode($request->getBody());
	$sql = "DELETE FROM client_tool WHERE client_tool_id = :client_tool_id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("client_tool_id", $client_tool_id);
		$stmt->execute();
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function createClientTool() {
	$request = Slim::getInstance()->request();
	$rs = json_decode($request->getBody());
	$sql = "INSERT INTO client_tool (
				client_id, vendor_product_id, version_number, purchase_date, purchase_cost,
				depreciation_cost, annual_maint_cost, maint_expiration_date, 
				license_purchased, license_used, deployed_percentage, utilization_percentage )
			VALUES (
				:client_id, :vendor_product_id, :version_number, :purchase_date, :purchase_cost,
				:depreciation_cost, :annual_maint_cost, :maint_expiration_date, 
				:license_purchased, :license_used, :deployed_percentage, :utilization_percentage )";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("client_id", $rs->client_id);
		$stmt->bindParam("vendor_product_id", $rs->vendor_product_id);
		$stmt->bindParam("version_number", $rs->version_number);
		$stmt->bindParam("purchase_date", $rs->purchase_date);
		$stmt->bindParam("purchase_cost", $rs->purchase_cost);
		$stmt->bindParam("depreciation_cost", $rs->depreciation_cost);
		$stmt->bindParam("annual_maint_cost", $rs->annual_maint_cost);
		$stmt->bindParam("maint_expiration_date", $rs->maint_expiration_date);
		$stmt->bindParam("license_purchased", $rs->license_purchased);
		$stmt->bindParam("license_used", $rs->license_used);
		$stmt->bindParam("deployed_percentage", $rs->deployed_percentage);
		$stmt->bindParam("utilization_percentage", $rs->utilization_percentage);
		$stmt->execute();
		$rs->id = $db->lastInsertId();
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateClientTool($client_tool_id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$rs = json_decode($body);
	$sql = "UPDATE client_tool SET 
				vendor_product_id = :vendor_product_id,
				version_number = :version_number,
				purchase_date = :purchase_date,
				purchase_cost = :purchase_cost,
				depreciation_cost = :depreciation_cost,
				annual_maint_cost = :annual_maint_cost,
				maint_expiration_date = :maint_expiration_date,
				license_purchased = :license_purchased,
				license_used = :license_used,
				deployed_percentage = :deployed_percentage,
				utilization_percentage = :utilization_percentage
			WHERE client_tool_id = :client_tool_id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("vendor_product_id", $rs->vendor_product_id);
		$stmt->bindParam("version_number", $rs->version_number);
		$stmt->bindParam("purchase_date", $rs->purchase_date);
		$stmt->bindParam("purchase_cost", $rs->purchase_cost);
		$stmt->bindParam("depreciation_cost", $rs->depreciation_cost);
		$stmt->bindParam("annual_maint_cost", $rs->annual_maint_cost);
		$stmt->bindParam("maint_expiration_date", $rs->maint_expiration_date);
		$stmt->bindParam("license_purchased", $rs->license_purchased);
		$stmt->bindParam("license_used", $rs->license_used);
		$stmt->bindParam("deployed_percentage", $rs->deployed_percentage);
		$stmt->bindParam("utilization_percentage", $rs->utilization_percentage);
		$stmt->bindParam("client_tool_id", $client_tool_id);
		$stmt->execute();
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getClientTools($client_id) {

	$sql =	"SELECT ct.*, (ct.purchase_cost-IFNULL(ct.depreciation_cost,0)+IFNULL(ct.annual_maint_cost,0)) AS total_cost,
				c.client_name, v.vendor_id, v.vendor_name, vp.product_name, tp.tool_type,
 				CONCAT(v.vendor_name, ' - ', vp.product_name) AS vendor_product,
  				CONCAT('#/clientTool/',ct.client_tool_id) AS urlLink
				FROM client_tool ct
				LEFT JOIN client c ON (c.client_id = ct.client_id)
  				LEFT JOIN vendor_product vp ON (vp.vendor_product_id = ct.vendor_product_id)
  				LEFT JOIN vendor v ON (v.vendor_id = vp.vendor_id)
  				LEFT JOIN tool_type tp ON (tp.tool_type_id = vp.tool_type_id)
				WHERE ct.client_id = :client_id
				ORDER BY v.vendor_name, vp.product_name
			";
 	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("client_id", $client_id);
		$stmt->execute();
		$rs = $stmt->fetchAll(PDO::FETCH_OBJ);  
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getClientTool($client_tool_id) {
	$sql = "SELECT ct.*,
				c.client_name, v.vendor_id, v.vendor_name, vp.product_name, tp.tool_type
			FROM client_tool ct
			LEFT JOIN client c ON (c.client_id = ct.client_id)
  			LEFT JOIN vendor_product vp ON (vp.vendor_product_id = ct.vendor_product_id)
  			LEFT JOIN vendor v ON (v.vendor_id = vp.vendor_id)
  			LEFT JOIN tool_type tp ON (tp.tool_type_id = vp.tool_type_id)
			WHERE client_tool_id=:client_tool_id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("client_tool_id", $client_tool_id);
		$stmt->execute();
		$rs = $stmt->fetchObject();  
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getClients() {

  	$sql = "SELECT client_id, client_name, city, state,
					CONCAT('#/clientProfile/',client_id) AS urlLink,
					CONCAT('#/assessments','') AS assessmentsLink,
					CONCAT('#/manageEmployees/',client_id) AS employeesLink,
					CONCAT('#/manageClientTools/',client_id) AS toolsLink
		     FROM client c
		     ORDER BY client_name
			";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$rs = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($rs);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function createEmployee() {
	$request = Slim::getInstance()->request();
	$rs = json_decode($request->getBody());
	$sql = "INSERT INTO employee (
				client_id, employee_type, employee_name, job_title, last_promotion_date, 
				report_to, department, fully_burdened_rate, company_start_date,
				security_start_date, education_level, certification, phone_number,
				email_address, total_years_expr, security_expr, security_ops_percentage ) 
			VALUES (
				:client_id, :employee_type, :employee_name, :job_title, :last_promotion_date, 
				:report_to, :department, :fully_burdened_rate, :company_start_date,
				:security_start_date, :education_level, :certification, :phone_number,
				:email_address, :total_years_expr, :security_expr, :security_ops_percentage )";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("client_id", $rs->client_id);
		$stmt->bindParam("employee_type", $rs->employee_type);
		$stmt->bindParam("employee_name", $rs->employee_name);
		$stmt->bindParam("job_title", $rs->job_title);
		$stmt->bindParam("last_promotion_date", $rs->last_promotion_date);
		$stmt->bindParam("report_to", $rs->report_to);
		$stmt->bindParam("department", $rs->department);
		$stmt->bindParam("fully_burdened_rate", $rs->fully_burdened_rate);
		$stmt->bindParam("company_start_date", $rs->company_start_date);
		$stmt->bindParam("security_start_date", $rs->security_start_date);
		$stmt->bindParam("education_level", $rs->education_level);
		$stmt->bindParam("certification", $rs->certification);
		$stmt->bindParam("phone_number", $rs->phone_number);
		$stmt->bindParam("email_address", $rs->email_address);
		$stmt->bindParam("total_years_expr", $rs->total_years_expr);
		$stmt->bindParam("security_expr", $rs->security_expr);
		$stmt->bindParam("security_ops_percentage", $rs->security_ops_percentage);
		$stmt->execute();
		$rs->id = $db->lastInsertId();
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateEmployee($employee_id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$rs = json_decode($body);
	$sql = "UPDATE employee SET 
				employee_name = :employee_name,
				employee_type = :employee_type,
				job_title = :job_title,
				last_promotion_date = :last_promotion_date,
				report_to = :report_to,
				department = :department,
				fully_burdened_rate = :fully_burdened_rate,
				security_ops_percentage = :security_ops_percentage,
				phone_number = :phone_number,
				email_address = :email_address,
				education_level = :education_level,
				certification = :certification,
				company_start_date = :company_start_date,
				security_start_date = :security_start_date,
				total_years_expr = :total_years_expr,
				security_expr = :security_expr
			WHERE employee_id = :employee_id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("employee_name", $rs->employee_name);
		$stmt->bindParam("employee_type", $rs->employee_type);
		$stmt->bindParam("job_title", $rs->job_title);
		$stmt->bindParam("last_promotion_date", $rs->last_promotion_date);
		$stmt->bindParam("report_to", $rs->report_to);
		$stmt->bindParam("department", $rs->department);
		$stmt->bindParam("fully_burdened_rate", $rs->fully_burdened_rate);
		$stmt->bindParam("security_ops_percentage", $rs->security_ops_percentage);
		$stmt->bindParam("phone_number", $rs->phone_number);
		$stmt->bindParam("email_address", $rs->email_address);
		$stmt->bindParam("education_level", $rs->education_level);
		$stmt->bindParam("certification", $rs->certification);
		$stmt->bindParam("company_start_date", $rs->company_start_date);
		$stmt->bindParam("security_start_date", $rs->security_start_date);
		$stmt->bindParam("total_years_expr", $rs->total_years_expr);
		$stmt->bindParam("security_expr", $rs->security_expr);
		$stmt->bindParam("employee_id", $employee_id);
		$stmt->execute();
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getEmployee($employee_id) {
	$sql = "SELECT * 
			FROM employee
			WHERE employee_id=:employee_id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("employee_id", $employee_id);
		$stmt->execute();
		$rs = $stmt->fetchObject();  
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getEmployees($client_id) {

	$sql =	"SELECT *, CONCAT(em.employee_name, ' (', em.job_title, ')' ) AS name_title,
  				CONCAT('#/employeeProfile/',em.employee_id) AS urlLink
				FROM employee em
				WHERE em.client_id = :client_id
				ORDER BY em.employee_name
			";
 	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("client_id", $client_id);
		$stmt->execute();
		$rs = $stmt->fetchAll(PDO::FETCH_OBJ);  
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteEmployee($employee_id) {
	$request = Slim::getInstance()->request();
	$rs = json_decode($request->getBody());
	$sql = "DELETE FROM employee WHERE employee_id = :employee_id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("employee_id", $employee_id);
		$stmt->execute();
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateQuestion($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$question = json_decode($body);
	$sql = "UPDATE assessment_question SET 
				response_notes = :response_notes,
				manual_coverage = :manual_coverage,
				manual_compliance = :manual_compliance,
				manual_documentation = :manual_documentation,
				manual_score = :manual_score,
				manual_process = :manual_process,
				auto_coverage = :auto_coverage,
				auto_compliance = :auto_compliance,
				auto_documentation = :auto_documentation,
				auto_score = :auto_score,
				auto_process = :auto_process,
				score = :score,
				status = :status,
				complete = :complete,
				last_updated = :time_now,
				last_touched = :last_touched
			WHERE assess_question_id = :id
			";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("response_notes", $question->response_notes);
		$stmt->bindParam("manual_coverage", $question->manual_coverage);
		$stmt->bindParam("manual_compliance", $question->manual_compliance);
		$stmt->bindParam("manual_documentation", $question->manual_documentation);
		$stmt->bindParam("manual_score", $question->manual_score);
		$stmt->bindParam("manual_process", $question->manual_process);
		$stmt->bindParam("auto_coverage", $question->auto_coverage);
		$stmt->bindParam("auto_compliance", $question->auto_compliance);
		$stmt->bindParam("auto_documentation", $question->auto_documentation);
		$stmt->bindParam("auto_score", $question->auto_score);
		$stmt->bindParam("auto_process", $question->auto_process);
		$stmt->bindParam("score", $question->score);
		$stmt->bindParam("status", $question->status);
		$stmt->bindParam("complete", $question->complete);
		$stmt->bindParam("time_now", $question->time_now);
		$stmt->bindParam("last_touched", $question->last_touched);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($question); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getNotes($question_id) {
 	$sql = "SELECT assess_note_id, note_created_by, note_entry_date, notes
		    FROM assessment_notes
			WHERE assess_question_id=:question_id
		    ORDER BY note_entry_date DESC, note_created_by
			";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("question_id", $question_id);
		$stmt->execute();
		$rs = $stmt->fetchAll(PDO::FETCH_OBJ);  
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function createToolUtilization() {
	$request = Slim::getInstance()->request();
	$rs = json_decode($request->getBody());
	$sql = "INSERT INTO tool_utilization
				(assess_question_id, client_tool_id) 
			VALUES (:assess_question_id, :client_tool_id)
			";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("assess_question_id", $rs->assess_question_id);
		$stmt->bindParam("client_tool_id", $rs->client_tool_id);
		$stmt->execute();
		$rs->id = $db->lastInsertId();
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteToolUtilization($question_id, $client_tool_id) {
	$request = Slim::getInstance()->request();
	$rs = json_decode($request->getBody());
	$sql = "DELETE FROM tool_utilization 
			WHERE assess_question_id = :question_id AND client_tool_id = :client_tool_id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("question_id", $question_id);
		$stmt->bindParam("client_tool_id", $client_tool_id);
		$stmt->execute();
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getToolUtilization($question_id) {
 	$sql = "SELECT tu.client_tool_id, 
				v.vendor_id, v.vendor_name, vp.product_name, tp.tool_type,
 				CONCAT(v.vendor_name, ' - ', vp.product_name) AS vendor_product,
 				tu.tool_util_id, tu.assess_question_id
		    FROM tool_utilization tu
		    JOIN client_tool ct ON (ct.client_tool_id = tu.client_tool_id)
  			LEFT JOIN vendor_product vp ON (vp.vendor_product_id = ct.vendor_product_id)
  			LEFT JOIN vendor v ON (v.vendor_id = vp.vendor_id)
  			LEFT JOIN tool_type tp ON (tp.tool_type_id = vp.tool_type_id)
			WHERE assess_question_id=:question_id
		    ORDER BY v.vendor_name, vp.product_name
			";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("question_id", $question_id);
		$stmt->execute();
		$rs = $stmt->fetchAll(PDO::FETCH_OBJ);  
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function createEmployeeUtilization() {
	$request = Slim::getInstance()->request();
	$rs = json_decode($request->getBody());
	$sql = "INSERT INTO employee_utilization
				(assess_question_id, employee_id) 
			VALUES (:assess_question_id, :employee_id)
			";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("assess_question_id", $rs->assess_question_id);
		$stmt->bindParam("employee_id", $rs->employee_id);
		$stmt->execute();
		$rs->id = $db->lastInsertId();
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getEmployeeUtilization($question_id) {
 	$sql = "SELECT eu.employee_id, em.employee_name, CONCAT(em.employee_name, ' (', em.job_title, ')' ) AS name_title,
 				eu.employee_util_id, eu.assess_question_id
		    FROM employee_utilization eu
		    JOIN employee em ON (em.employee_id = eu.employee_id)
			WHERE assess_question_id=:question_id
		    ORDER BY em.employee_name, em.job_title
			";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("question_id", $question_id);
		$stmt->execute();
		$rs = $stmt->fetchAll(PDO::FETCH_OBJ);  
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteEmployeeUtilization($question_id, $employee_id) {
	$request = Slim::getInstance()->request();
	$rs = json_decode($request->getBody());
	$sql = "DELETE FROM employee_utilization 
			WHERE assess_question_id = :question_id AND employee_id = :employee_id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("question_id", $question_id);
		$stmt->bindParam("employee_id", $employee_id);
		$stmt->execute();
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function createNotes() {
	$request = Slim::getInstance()->request();
	$notes = json_decode($request->getBody());
	$sql = "INSERT INTO assessment_notes
				(assess_question_id, note_created_by, note_entry_date, notes) 
			VALUES (:assess_question_id, :note_created_by, :note_entry_date, :notes)
			";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("assess_question_id", $notes->assess_question_id);
		$stmt->bindParam("note_created_by", $notes->note_created_by);
		$stmt->bindParam("note_entry_date", $notes->note_entry_date);
		$stmt->bindParam("notes", $notes->notes);
		$stmt->execute();
		$notes->id = $db->lastInsertId();
		$db = null;
		echo json_encode($notes); 
	} catch(PDOException $e) {
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteInterviewNotes($question_id, $assess_note_id) {
	$request = Slim::getInstance()->request();
	$rs = json_decode($request->getBody());
	$sql = "DELETE FROM assessment_notes 
			WHERE assess_note_id = :assess_note_id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("assess_note_id", $assess_note_id);
		$stmt->execute();
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getAssessmentQuestions($assess_id, $category_id) {

	$sql = "SELECT sc.control_number, sc.control_name, sc.control_desc, sc.supplemental, 
				aq.assess_question_id, aq.control_id, aq.assess_question,
				aq.response_notes, aq.status, aq.score, aq.assess_question_id, 
				IF(aq.complete=0,'No','Yes') AS complete, sc.DFARS,
  				CONCAT('#/questionDetails/',aq.assess_question_id) AS urlLink
            FROM assessment_question aq
            JOIN security_control sc ON (sc.control_id = aq.control_id)
			JOIN security_standard ss ON (ss.standard_id = sc.standard_id)
            WHERE client_assess_id = :assess_id AND 
                  sc.control_category_id = :category_id
            ORDER BY control_number
            ";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("assess_id", $assess_id);
		$stmt->bindParam("category_id", $category_id);
		$stmt->execute();
		$rs = $stmt->fetchAll(PDO::FETCH_OBJ);  
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function createAssessment() {
	$request = Slim::getInstance()->request();
	$assessment = json_decode($request->getBody());
	$sql = "INSERT INTO client_assessment 
				(client_id, standard_id, assessment_date, status, contact_name, assessed_by) 
			VALUES (:client_id, :standard_id, :assessment_date, :status, :contact_name, :assessed_by)
			";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("client_id", $assessment->client_id);
		$stmt->bindParam("standard_id", $assessment->standard_id);
		$stmt->bindParam("assessment_date", $assessment->assessment_date);
		$stmt->bindParam("status", $assessment->status);
		$stmt->bindParam("contact_name", $assessment->contact_name);
		$stmt->bindParam("assessed_by", $assessment->assessed_by);
		$stmt->execute();
		$assessment->id = $db->lastInsertId();
		$db = null;
		echo json_encode($assessment); 
	} catch(PDOException $e) {
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getClientAssessments() {

	$sql =	"SELECT ca.client_assess_id, c.client_name, assessment_date, 
				CONCAT(s.standard_type, IFNULL(CONCAT(' (',s.version_number,')'),'')) AS standard_type, 
  				status, contact_name, assessed_by, c.client_id,
  				CONCAT('#/controlCategoryList/',ca.client_assess_id) AS urlLink,
				IFNULL(tc.total_controls,0) AS total_controls,
				IFNULL(tc.total_score,0) AS total_score,
				IFNULL(cc.completed_controls,0) AS completed_controls,
				ROUND(IFNULL(cc.completed_controls,0)/IFNULL(tc.total_controls,0.001)*100,2) as complete_percentage,
				ROUND(IFNULL(tc.total_score,0)/IFNULL(tc.total_controls,0.001),2) as avg_score
			FROM client_assessment ca
			JOIN client c ON (c.client_id = ca.client_id)
			JOIN security_standard s ON (s.standard_id = ca.standard_id)
			LEFT JOIN (SELECT client_assess_id, COUNT(*) AS total_controls, SUM(score) AS total_score
                  FROM assessment_question
                  GROUP BY client_assess_id) AS tc 
						ON (tc.client_assess_id = ca.client_assess_id)
            LEFT JOIN (SELECT client_assess_id, count(*) as completed_controls
                  FROM assessment_question
                  WHERE complete 
                  GROUP BY client_assess_id) AS cc
						ON (cc.client_assess_id = ca.client_assess_id)
			ORDER BY FIELD(status,'In Progress','Ready','Pending','Complete'), assessment_date desc, c.client_name
			";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$rs = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($rs);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getClientAssessment($client_id) {

	$sql =	"SELECT ca.client_assess_id, c.client_name, assessment_date, 
				CONCAT(s.standard_type, IFNULL(CONCAT(' (',s.version_number,')'),'')) AS standard_type, 
  				status, contact_name, assessed_by, c.client_id,
  				CONCAT('#/controlCategoryList/',ca.client_assess_id) AS urlLink,
				IFNULL(tc.total_controls,0) AS total_controls,
				IFNULL(tc.total_score,0) AS total_score,
				IFNULL(cc.completed_controls,0) AS completed_controls,
				ROUND(IFNULL(cc.completed_controls,0)/IFNULL(tc.total_controls,0.001)*100,2) as complete_percentage,
				ROUND(IFNULL(tc.total_score,0)/IFNULL(tc.total_controls,0.001),2) as avg_score
			FROM client_assessment ca
			JOIN client c ON (c.client_id = ca.client_id)
			JOIN security_standard s ON (s.standard_id = ca.standard_id)
			LEFT JOIN (SELECT client_assess_id, COUNT(*) AS total_controls, SUM(score) AS total_score
                  FROM assessment_question
                  GROUP BY client_assess_id) AS tc 
						ON (tc.client_assess_id = ca.client_assess_id)
            LEFT JOIN (SELECT client_assess_id, count(*) as completed_controls
                  FROM assessment_question
                  WHERE complete 
                  GROUP BY client_assess_id) AS cc
						ON (cc.client_assess_id = ca.client_assess_id)
			WHERE ca.client_id = :client_id
			ORDER BY assessment_date desc, c.client_name
			";
 	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("client_id", $client_id);
		$stmt->execute();
		$rs = $stmt->fetchAll(PDO::FETCH_OBJ);  
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getAssessmentSummary($assessment_id) {

  	$sql = "SELECT cc.control_category_id, cc.identifier, control_category_name, 
  				cf.control_function_name, 
  				COUNT(DISTINCT aq.control_id) as controlCnt,
  				COUNT(DISTINCT ccs.control_id) as completeCnt,
  				COUNT(DISTINCT inp.control_id) as inProgressCnt,
  				COUNT(DISTINCT dfar.control_id) as dfarsCnt,
  				ROUND(SUM(aq.score)/COUNT(DISTINCT aq.control_id),2) as avg_score,
  				CONCAT('#/assessmentQuestionList/',cc.control_category_id) AS urlLink,
  				ROUND(COUNT(DISTINCT ccs.control_id)/COUNT(DISTINCT aq.control_id) * 100,2) AS complete_percentage
		    FROM control_category cc
		    LEFT JOIN control_function cf ON (cf.control_function_id = cc.control_function_id)
		    LEFT JOIN security_control sc ON (sc.control_category_id = cc.control_category_id)
		    LEFT JOIN assessment_question aq ON (aq.control_id = sc.control_id)
		    LEFT JOIN (SELECT * FROM assessment_question WHERE complete) as ccs 
		    			ON (ccs.control_id = sc.control_id)
		    LEFT JOIN (SELECT * FROM assessment_question WHERE status='In Progress') as inp 
		    			ON (inp.control_id = sc.control_id)
		    LEFT JOIN (SELECT * FROM security_control WHERE DFARS) as dfar 
		    			ON (dfar.control_id = sc.control_id)
		    WHERE aq.client_assess_id = :assessment_id
		    GROUP BY cc.control_category_id, identifier, control_category_name, cf.control_function_name
		    ORDER BY cc.control_category_id, identifier, control_category_name, cf.control_function_name
			";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("assessment_id", $assessment_id);
		$stmt->execute();
		$rs = $stmt->fetchAll(PDO::FETCH_OBJ);  
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getControlFamilies() {

  	$sql = "SELECT cf.control_family_id, identifier, control_family_name, 
  				COUNT(DISTINCT aq.control_id) as controlCnt,
  				SUM(aq.score)/COUNT(DISTINCT aq.control_id) as avg_score
		     FROM control_family cf
		     LEFT JOIN security_control sc ON ( sc.control_family_id = cf.control_family_id )
		     LEFT JOIN assessment_question aq ON (aq.control_id = sc.control_id)
		     WHERE aq.client_assess_id = 1
		     GROUP BY cf.control_family_id, identifier, control_family_name
		     ORDER BY cf.control_family_id, identifier, control_family_name
			";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$controls = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($controls);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getControlQuestions($id) {

	$sql = "SELECT sc.control_number, sc.control_name, sc.control_desc, sc.supplemental, 
				aq.assess_question_id, aq.control_id, aq.assess_question,
				aq.response_notes, aq.score, aq.assess_question_id
            FROM assessment_question aq
            JOIN security_control sc ON (sc.control_id = aq.control_id)
			JOIN security_standard ss ON (ss.standard_id = sc.standard_id)
            WHERE client_assess_id = 1 AND 
                  sc.control_family_id = :id
            ORDER BY control_number
            ";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$rs = $stmt->fetchAll(PDO::FETCH_OBJ);  
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getQuestion($question_id) {
	$sql = "SELECT aq.assess_question_id, aq.assess_question, aq.response_notes, 
				aq.manual_coverage, aq.manual_compliance, aq.manual_documentation, 
				aq.manual_score, aq.manual_process,
				aq.auto_coverage, aq.auto_compliance, aq.auto_documentation, 
				aq.auto_score, aq.auto_process, 
				aq.score, aq.status, aq.complete, aq.last_updated, aq.last_touched,
				sc.control_number, sc.control_name, sc.control_desc, sc.supplemental, sc.DFARS,
				ss.standard_type, ss.version_number
			FROM assessment_question aq
			JOIN security_control sc ON (sc.control_id = aq.control_id)
			JOIN security_standard ss ON (ss.standard_id = sc.standard_id)
			WHERE assess_question_id=:question_id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("question_id", $question_id);
		$stmt->execute();
		$rs = $stmt->fetchObject();  
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getUser($username) {
	$sql = "SELECT user_id, username, password, first_name, last_name, u.client_id, c.client_name, admin
			FROM user u
		    LEFT JOIN client c ON (c.client_id=u.client_id)
			WHERE username=:username";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("username", $username);
		$stmt->execute();
		$rs = $stmt->fetchObject();  
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function createUser() {
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());
	$sql = "INSERT INTO user (username, password, first_name, last_name, client_id, admin) 
			VALUES (:username, :password, :first_name, :last_name, :client_id, :admin)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("username", $user->username);
		$stmt->bindParam("password", $user->password);
		$stmt->bindParam("first_name", $user->first_name);
		$stmt->bindParam("last_name", $user->last_name);
		$stmt->bindParam("client_id", $user->client_id);
		$stmt->bindParam("admin", $user->admin);
		$stmt->execute();
		$user->id = $db->lastInsertId();
		$db = null;
		echo json_encode($user); 
	} catch(PDOException $e) {
		//error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateUser($username) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$rs = json_decode($body);
	$sql = "UPDATE user SET 
				first_name = :first_name,
				last_name = :last_name,
				password = :password,
				client_id = :client_id,
				admin = :admin
			WHERE username = :id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("first_name", $rs->first_name);
		$stmt->bindParam("last_name", $rs->last_name);
		$stmt->bindParam("password", $rs->password);
		$stmt->bindParam("client_id", $rs->client_id);
		$stmt->bindParam("admin", $rs->admin);
		$stmt->bindParam("id", $username);
		$stmt->execute();
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getUsers() {

  	$sql = "SELECT user_id, username, first_name, last_name, password, u.client_id, c.client_name, admin,
					CONCAT('#/userProfile/',username) AS urlLink
		     FROM user u
		     LEFT JOIN client c ON (c.client_id=u.client_id)
		     ORDER BY first_name, last_name, user_id
			";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$rs = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($rs);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteUser($username) {
	$request = Slim::getInstance()->request();
	$rs = json_decode($request->getBody());
	$sql = "DELETE FROM user WHERE username=:username";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("username", $username);
		$stmt->execute();
		$db = null;
		echo json_encode($rs); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="cyber";
	$dbpass="Secure!1";
	$dbname="shield";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>