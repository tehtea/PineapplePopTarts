var DatabaseRetriever = require("./DBRetriever.js");

// Initiate socket.io server
var io = require('socket.io').listen(5000);

io.sockets.on('connection', function (socket) {
	// wait for request from subsystem
	socket.on('srRequest', function () {
		// Get values from database 
		Promise.all([DatabaseRetriever.getAllNewIncident(),DatabaseRetriever.getAllUpdateIncident(),DatabaseRetriever.getAllRespondentRequested()]).then((result) => {
			// Return Data retrieve from database
			socket.emit('srRequestDone',result);
		}); 
	});
});