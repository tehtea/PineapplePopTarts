<?php 

$dbServername = "172.21.146.196";
$dbUsername = "Admin1" ;
$dbPassword = "pineapple";
$dbName = "Database3003";

$loginInfo = array("Database"=>$dbName, "UID"=>$dbUsername, "PWD"=>$dbPassword):

/* connection using SQL Server Authentication */
$conn = sqlsrv_connect($dbServername, $loginInfo);

if ($conn) {
	echo "Connection established.<br/>";
}
else {
	     echo "Connection could not be established.<br />";
     die( print_r( sqlsrv_errors(), true));
}

?>