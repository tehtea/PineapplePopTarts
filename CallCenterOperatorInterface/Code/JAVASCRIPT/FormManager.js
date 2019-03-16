// Control Class - Incident Manager

function createNewIncident(temp) {
	return new Promise((resolve,reject) => {
		var socket = io.connect('http://localhost:5000');		
		// From Database Retrieve Name using session Key
		socket.emit('getNameFromSK', temp.sessionKey); 
		// Retrieve name from backend
		socket.on('getNameFromSKDone', function(insName) {
			// Create Object "NewIncident"
			insName = insName[0].username;
			var obj = new NewIncident(temp.name,temp.contact,temp.address,temp.unitNum,temp.respondent,temp.descr,insName);
			
			// From Database Save new incident
			socket.emit('createNewIncident', obj); 
			// Get Record ID
			socket.on("createNewIncidentDone",(recordID) => {
				localStorage.setItem("recordID", recordID);
				resolve();
			});
		});
	});
}

function createUpdateIncident(temp) {
	return new Promise((resolve,reject) => {
		var socket = io.connect('http://localhost:5000');

		// From Database Retrieve Name using session Key
		socket.emit('getNameFromSK', temp.sessionKey); 
		// Retrieve name from backend
		socket.on('getNameFromSKDone', function(insName) {
			// Create Object "UpdateIncident"
			insName = insName[0].username;
			var obj = new UpdateIncident(temp.recordID,temp.respondentReporting,temp.respondentRequest,temp.descr,insName);
			
			// From Database Save update incident
			socket.emit('createUpdateIncident', obj); 
			resolve();
		});
	});
}

// Update Incident functions
function checkRecord(recordID) {
	return new Promise((resolve, reject) => {
		var socket = io.connect('http://localhost:5000');

		socket.emit('validateRecordID', recordID); 
		socket.on('validateRecordIDDone', function(result) {
			resolve(result);
		});
	});
}

// Parse obj to other subsystems? and need to display recordID