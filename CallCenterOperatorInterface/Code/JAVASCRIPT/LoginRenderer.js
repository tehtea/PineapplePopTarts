//Return false to prevent redirect

function validateForm() {
		// Check that all fields are present.
		var userID = document.forms["loginForm"]["userid"].value;
		var userPW = document.forms["loginForm"]["pw"].value;
		var val = isFilled(userPW, userID);
		
		if (val == false) {
			return false;
		}
		
		// Compare to database and check whether account is valid
		var accountDetails = getAccounts();
		var found = false;
		for (var i = 0; i < accountDetails.length; i ++) {
			if (userID.toLowerCase() == accountDetails[i].username & userPW == accountDetails[i].password) {
				found = true;
				break;
			}
		}
		// If invalid pw or id
		if (found == false) {
			document.getElementById("errorMsg").innerHTML = "*invalid username or password";
			return false;
		}
		
		// If valid pw and id
		else {
			localStorage.setItem("sessionKey",accountDetails[i].sessionKey);
			return true;
		}
}

// Need database
function getAccounts() {
	var accountDetails =[												// Assume that the account details stores username as small-casing 
		{username: "ted", password: "TED", sessionKey:"CCO-1"},
		{username: "cheese", password:"Pie", sessionKey:"CCO-1"},
		{username: "shark", password: "chicken", sessionKey:"CCO-1"}];
	return accountDetails;
}

// Check that all fields are present.
function isFilled(userPW, userID) {
		if (userPW == "" && userID == "") {
		document.getElementById("errorMsg").innerHTML = "*username & password missing";
		return false;
	}
	else if (userID == "") {
		document.getElementById("errorMsg").innerHTML = "*username missing";
		return false;
	}
	else if (userPW == "") {
		document.getElementById("errorMsg").innerHTML = "*password missing";	
		return false;
	}
	return true;
}