<?php
	
	include_once ('db_connect.php');  //need to add the path for this file	
	
	// get all accounts in database
	$query = "select username, password from accountTbl";
	$results = mysqli_query($conn, $query);
	$data = array();
		
	//put into array 
	while ($row = mysqli_fetch_assoc($results)){
	$data[]=$row;
	}
	
	//output array 
	echo $data;
?>
