var DatabaseRetriever = require("./DBRetriever");

// Initiate socket.io server
var io = require('./Apps/node_modules/socket.io').listen(5000);

io.sockets.on('connection', function (socket) {
	// wait for request from Status Report Manager
	socket.on('srRequest', function () {
		// Get values from database 
		Promise.all([DatabaseRetriever.getAllNewIncident(),DatabaseRetriever.getAllUpdateIncident(),DatabaseRetriever.getAllRespondentRequested()]).then((result) => {
			// Return Data retrieve from database
			socket.emit('srRequestDone',result);
		}); 
	});	
	
	// wait for request from Crisis Map
	socket.on('cmRequest', function () {
		// Get values from database 
		Promise.all([DatabaseRetriever.getAllNewIncident(),DatabaseRetriever.getAllUpdateIncident()]).then((result) => {
			// Return Data retrieve from database
			socket.emit('cmRequestDone',result);
		});
	});
	
	// TESTING FOR SMS
	
	
	// TESTING FOR SOCIAL MEDIA
	// Mimic generation of new form submission every x seconds (Both new and updates)
	setInterval(() => {
	var newSubmission = DatabaseRetriever.getAllNewIncident();
	newSubmission.then((result) => {
		// Transmit data to SOCIAL MEDIA SUBSYSTEM
		socket.emit('socialMediaNew',result[0]);
	});
	},7000);
	
	setInterval(() => {
	var updSubmission = DatabaseRetriever.getAllUpdateIncident();
	updSubmission.then((result) => {
		// Transmit data to SOCIAL MEDIA SUBSYSTEM
		socket.emit('socialMediaUpd',result[0]);
	});
	},9000);
});