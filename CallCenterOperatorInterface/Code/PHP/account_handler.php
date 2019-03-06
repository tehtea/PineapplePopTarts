<?php 
	//account renderer 
	//assuming only returning one username 

	require_once ('db_connect.php'); //need to add the path for this file	

	$var1 = $_POST['sessionKey'];
	$query = "select username from accountTbl where sessionKey = $var1";
	$results = sqlsrv_query($conn, $query);	
	
	//output results 
	echo $results;

?>
