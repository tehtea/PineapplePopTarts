
	let retrieval = retrieveData();
	retrieval.then(function (result) {
		// Insert your code here
		console.log(result[0][0]);
		console.log(result[1][1]);
		console.log(result[2][2]);

		/* Notes:
		*	result[0] is newincident
		*	result[1] is updateincident
		*	result[2] is respondentRequest
		*/
	});

// Get Data
function retrieveData() {
	return new Promise(function (resolve, reject) {
		var io = require("socket.io-client");
		var socket = io.connect('http://localhost:5000');
		console.log('connect');
		// Connect to server
		socket.on('connect', function () {
			// Request data from database
			socket.emit('srRequest');
			// Retrieve data
			socket.on('srRequestDone', function (result) {
				// Disconnect
				socket.emit('disconnect');
				resolve(result);
			});
		});

	});
}