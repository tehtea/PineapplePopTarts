
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
	return "TED";
}
