<?php 
	//content validation
	require_once ('db_connect.php'); //need to add the path for this file	

	$sk = $_POST['item']
	$query = "SELECT sessionKey from accountTbl where sessionKey = @sk";
	$results = sqlsrv_query($conn, $query);
	
	$count = sqlsrv_num_rows($results);
	
	if $count = 0 {
		echo false;
	}
	else {
		echo = true;
	}
	sqlsrv_close($conn);
?>

	