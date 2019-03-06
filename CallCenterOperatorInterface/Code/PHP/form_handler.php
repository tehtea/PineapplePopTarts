
<?php
	// form renderer
	include_once ('db_connect.php'); //need to add the path for this file	

	$name = $_POST['name'];
	$contact = $_POST['mobileNum'];
	$pc = $_POST['postalCode'];
	$building = $_POST['building'];
	$respondent = $_POST['respondent'];
	$description = $_POST['description'];
	$username = $_POST['username'];
	if (empty($building)) {
		$location = $pc;
	}
	else {
		$location = ($building.",".$pc);
	}
		
	//idk why it keeps having a red highlight 
	$query = "INSERT INTO incidentTbl (name, contact, location, assistanceType, description, ins_name, upd_name)
		VALUES ($name, $contact, $location, $respondent, $description, $username, $username)";
	
	if(mysqli_query($conn, $query)) {
   		echo "Records added successfully.";
	} 
	else {
   		echo "ERROR: Could not able to execute query." . mysqli_error($query);
	}

	?>