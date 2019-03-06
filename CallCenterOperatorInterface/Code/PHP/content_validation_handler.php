<?php 
	//content validation
	include_once ('db_connect.php'); //need to add the path for this file	

	$sk = $_POST['item']
	$query = "SELECT sessionKey from accountTbl where sessionKey = @sk";
	$results = mysqli_query($conn, $query);
	
	$count = mysqli_num_rows($results);
	
	if $count = 0 {
		$found = false;
	}
	else {
		$found = true;
	}
	echo $found;
	
?>

	