//Return false to prevent redirect

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
		var socket = io.connect('http://localhost:5000');

		socket.emit('login', account); 
		 socket.on('loginDone', function(result) {
			result = result[0];
			
			// If Invalid acc 
			if (result == "") {
				document.getElementById("errorMsg").innerHTML = "*invalid username or password";
			} else {
				console.log(result.sessionkey);
				localStorage.setItem("sessionKey",result.sessionkey);
				location.replace("file:///C:/Users/darrenchewy/Desktop/Jesslyn/cz3003%20CCO/CZ3003-master/HTML/AccountView.html");
			}
		}); 
	return false;
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
