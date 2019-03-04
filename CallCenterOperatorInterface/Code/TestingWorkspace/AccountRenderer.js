loadView();

function logout() {
	window.localStorage.removeItem("sessionKey");
	loadView();
	return;
}

function login() {
	window.localStorage.setItem("sessionKey","CCO-1");
	loadView();
	return;
}

function loadView() {
	if (localStorage.getItem("sessionKey") == "CCO-1") {
		document.getElementById("in").style.display = "block";
		document.getElementById("out").style.display = "none";
	} else {
		document.getElementById("out").style.display = "block";
		document.getElementById("in").style.display = "none";
	}
}
