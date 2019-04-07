//Return false to prevent redirect

/**
 * Validate login 
 * @returns {boolean} refresh page
 */
function validateForm() {
		// Check that all fields are present.
		var userID = document.forms["loginForm"]["userid"].value.toLowerCase() ;
		var userPW = document.forms["loginForm"]["pw"].value;
		var val = isFilled(userPW, userID);
		
		if (val == false) {
			return false;
		}
		
		// Compare to database and check whether account is valid
 		var account = new Account(userID,userPW);

		var asynFunction = checkAccount(account);
		asynFunction.then((result) => {
			console.log("asynRan");
			result = result[0];
			
			// If Invalid acc 
			if (result) {
				console.log(result.sessionkey);
				localStorage.setItem("sessionKey",result.sessionkey);
				location.replace("./accountView");
			} else {
				console.log("idk");
				document.getElementById("errorMsg").innerHTML = "*invalid username or password";
			}
		}); 
	return false;
}

/**
 * Check that all fields are present
 * @param {string} userPW user's password
 * @param {string} userID user's username
 * @returns {boolean} confirmation of all fields filled
 */
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
	// need to clear the error message if it is not missing
	else {
		document.getElementById("errorMsg").innerHTML = "";	
	}
	return true;
}
