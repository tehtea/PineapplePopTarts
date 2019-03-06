<?php
	
	require_once ('db_connect.php');  //need to add the path for this file	
	
	// get all accounts in database
	$query = "select username, password from accountTbl";
	$results = sqlsrv_query($conn, $query);
	$data = array();
		
	//put into array 
	while ($row = sqlsrv_fetch_assoc($results)){
		$data[]=$row;
	}
	//output array 
	echo json_encode($data);
	
?>
