var DatabaseRetriever = require("./DBRetriever.js");

// Initiate socket.io server
const server = require('http').createServer();
const io = require('socket.io')(server);
server.listen(5000);

module.exports = io;

io.on('connection', function (socket) {

	console.log('client connected');

	// wait for request from subsystem
	socket.on('srRequest', function () {
		// Get values from database 
		Promise.all([DatabaseRetriever.getAllNewIncident(),DatabaseRetriever.getAllUpdateIncident(),DatabaseRetriever.getAllRespondentRequested()]).then((result) => {
			// Return Data retrieve from database
			socket.emit('srRequestDone',result);
		}); 
	});

	socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });

});