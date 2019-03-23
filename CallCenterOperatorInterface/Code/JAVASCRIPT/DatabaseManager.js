// Control class - Database Manager

var DatabaseRetriever = require("./DatabaseRetriever");

// Initiate socket.io server
var io = require('./Apps/node_modules/socket.io').listen(5000);

io.sockets.on('connection', function (socket) {
	// 1. wait for "hasKey" [For content validation]
	socket.on('hasKey', function (input) {
		// Get values from database 
		let retrievedData = DatabaseRetriever.checkKey(input);
		retrievedData.then(function(result) {
			// Return Data retrieve from database
			socket.emit('hasKeyDone',result);
		}); 
	});
	
	// 2. Add new incident
	socket.on('createNewIncident', function (obj) {
		// New Incident Table
		let x = DatabaseRetriever.storeNewIncident(obj); 
		x.then(() => {
			// Get record id
			let getRecord = DatabaseRetriever.getRecordIDIncident(obj);
			getRecord.then((record) => {
				// Fix time format
				var time = record.InsTime;
				var timeString = record.InsTime.toISOString();
				
				// Generate Respondent Table
				for (var i = 0; i < obj.respondentRequested.length; i ++) {
					var resp = obj.respondentRequested[i];
					DatabaseRetriever.storeRespondent(resp, record.RecordID, timeString);
				}				
				// Return RecordID
				socket.emit("createNewIncidentDone",record.RecordID);
			});
		});
	});
	
	// 3. Check RecordID
	socket.on('validateRecordID', function (input) {
		// Get values from database 
		let retrievedData = DatabaseRetriever.validateRecordID(input);
		retrievedData.then(function(result) {
			// Return Data retrieve from database
			socket.emit('validateRecordIDDone',result);
		}); 
	});
	
	// 4. Add update incident
	socket.on('createUpdateIncident', function (obj) {
		// Update Incident Table
		let x = DatabaseRetriever.storeUpdateIncident(obj); 
		x.then(() => {
			// Get record id
			let getRecord = DatabaseRetriever.getTimeUpdateIncident(obj);
			
			getRecord.then((time) => {
				// Fix time format
				var timeString = time.Time.toISOString();
				
				// Generate Respondent Table
				for (var i = 0; i < obj.respondentRequested.length; i ++) {
					var resp = obj.respondentRequested[i];
					DatabaseRetriever.storeRespondent(resp, obj.recordID, timeString);
				}				
			});
		});
	});
	
	// 5. Login
	socket.on('login', function (input) {
		// Get values from database 
		let retrievedData = DatabaseRetriever.getAccountByID(input);
		retrievedData.then(function(result) {
			// Return Data retrieve from database
			socket.emit('loginDone',result);
		}); 
	});
	
	// 6. Resolve incident
	socket.on('resolveIncident', function (recordID) {
		DatabaseRetriever.resolveIncident(recordID);
	});
	
	// 7. Get respondents
	socket.on('getRespondents', function (recordID) {
		// Get values from database 
		let retrievedData = DatabaseRetriever.getRespondents(recordID);
		retrievedData.then(function(result) {
			// Return Data retrieve from database
			socket.emit('getRespondentsDone',result);
		}); 
	});
	
	// 8. Get all unresolved incidents
	socket.on('getUnresolvedIncidents', function () {
		// Get values from database 
		let retrievedData = DatabaseRetriever.getUnresolvedIncidents();
		retrievedData.then(function(result) {
			// Return Data retrieve from database
			socket.emit('getUnresolvedIncidentsDone',result);
		}); 
	});
});
