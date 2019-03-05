
loadUsername();

function logout() {
		window.localStorage.removeItem("sessionKey");
		return true;
}

function loadUsername() {
	var sessionKey = window.localStorage.getItem("sessionKey");
	var username = getUsername(sessionKey);
	document.getElementById("username").innerHTML = username;
}

// Need database
function getUsername(sessionKey) {
	<?php 
		//account renderer 
		//assuming only returning one username 
		$var1 = $_POST['sessionKey'];
		$query = "select username from accountTbl where sessionKey = $var1";
		$results = mysqli_query($conn, $query);	
	?>

	var username = <?php echo json_encode($results); ?>
	return username; 
	//return "TED";
}
