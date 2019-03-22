loadUsername();

function logout() {
	window.localStorage.removeItem("sessionKey");
	loadHeader("");
	document.getElementById("content").style.display = "none";
	document.getElementById("logout").style.display = "block";
}

function loadUsername() {
	var sessionKey = localStorage.getItem("sessionKey");
	var asynFunction = getAccountViaKey(sessionKey);
	asynFunction.then((result) => {
		var username = result[0].username;
		document.getElementById("username").innerHTML = username;
	});
}