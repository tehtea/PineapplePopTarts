loadUsername();

function logout() {
		window.localStorage.removeItem("sessionKey");
		return true;
}

function loadUsername() {
	var sessionKey = localStorage.getItem("sessionKey");
	
	// Get username
	var socket = io.connect('http://localhost:5000');
		
		// From Database check session Key
		socket.emit('hasKey', sessionKey); 
		// Retrieve name from backend
		socket.on('hasKeyDone', function(check) {
			var username = check[0].username;
			document.getElementById("username").innerHTML = username;
		});
}