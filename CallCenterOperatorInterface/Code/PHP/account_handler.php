<?php 
	//account renderer 
	//assuming only returning one username 

	include_once ('db_connect.php'); //need to add the path for this file	

	$var1 = $_POST['sessionKey'];
	$query = "select username from accountTbl where sessionKey = $var1";
	$results = mysqli_query($conn, $query);	
	
	//output results 
	echo $results;

?>
