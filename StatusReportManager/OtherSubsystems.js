
// Run it every 5 seconds (parameter in miliseconds)
setInterval(() => {
	let retrieval = retrieveData();
	retrieval.then(function(result) {
		// Insert your code here
		console.log(result);
		
		/* Notes:
		*	result[0] is newincident
		*	result[1] is updateincident
		*	result[2] is respondentRequest
		*/
	});
}, 5000);

// Get Data
function retrieveData() {
	return new Promise(function(resolve,reject) { 
		var io = require("socket.io-client");
		var socket = io.connect('http://localhost:5000');
		// Connect to server
		socket.on('connect',function() {
			// Request data from database
			socket.emit('srRequest'); 
			// Retrieve data
			socket.on('srRequestDone', function(result) {
				resolve(result);
			});
		});
		// Disconnect
		socket.on('disconnect', function(){});
	});
}