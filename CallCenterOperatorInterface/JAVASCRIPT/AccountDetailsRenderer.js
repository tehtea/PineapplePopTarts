/**
 * Account details renderer class 
 */
loadUsername();

/**
 * Log out user and remove sessionKey from cookies
 */
function logout() {
	window.localStorage.removeItem("sessionKey");
	loadHeader("");
	document.getElementById("content").style.display = "none";
	document.getElementById("logout").style.display = "block";
}

/**
 * Log in user and store sessionKey
 */
function loadUsername() {
	var sessionKey = localStorage.getItem("sessionKey");
	var asynFunction = getAccountViaKey(sessionKey);
	asynFunction.then((result) => {
		var username = result[0].username;
		document.getElementById("username").innerHTML = username;
	});
}