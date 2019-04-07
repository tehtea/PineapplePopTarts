/* To display content on whether user is logged in or not*/
var item = localStorage.getItem("sessionKey");
loadHeader(item);
loadContent(item);

/**
 * Generate different header based on whether the user is logged in
 * @param {string} item user's local session key
 */
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

/**
 * Check whether the session key is valid
 * @param {string} item user's local session key
 * @returns {boolean} confirmation of valid account
 */
function hasKey(item) {
	return new Promise((resolve,reject) => {
		//  !item is added so that if item is null, promise still gets resolved.
		if (item == "" || !item) {
			resolve (false);
		}
		
		var asynFunction = getAccountViaKey(item);
		asynFunction.then((result) => {
			if (result == "") {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	});
}

/**
 * Generate different content based on whether the user is logged in
 * @param {string} item user's local session key
 */
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