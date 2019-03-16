/* To display content on whether user is logged in or not*/
var item = localStorage.getItem("sessionKey");
loadHeader(item);
loadContent(item);

function loadHeader(item) {
	let check = hasKey(item);
	check.then(function(result) {
		if (result) {
			document.getElementById("headerW").style.display = "block";
			document.getElementById("headerWO").style.display = "none";
		} else {
			document.getElementById("headerWO").style.display = "block";
			document.getElementById("headerW").style.display = "none";
		}
	});
}

function hasKey(item) {
	return new Promise((resolve,reject) => {
		if (item == "") {
			resolve (false);
		}
		var socket = io.connect('http://localhost:5000');
		
		// From Database check session Key
		socket.emit('hasKey', item); 
		// Retrieve name from backend
		socket.on('hasKeyDone', function(check) {
			if (check == "") {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	});
}

function loadContent(item) {
	if (document.getElementById("no-log-display")) {
		let check = hasKey(item);
		check.then(function(result) {
			if (result) {
				document.getElementById("no-log-display").style.display = "none";
				document.getElementById("content").style.display = "block";
			} else {
				document.getElementById("no-log-display").style.display = "block";
				document.getElementById("content").style.display = "none";
			}
		});
	}
}