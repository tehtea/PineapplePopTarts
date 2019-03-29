// Design pattern - facade for call center operator subsystem
const DATABASE_SERVER = 'http://localhost:5000';
var socket = io.connect(DATABASE_SERVER);

// AccountDetailsRenderer, ContentValidation, FormManager
function getAccountViaKey(sessionKey) {
	return new Promise((resolve,reject) => {
		// From Database check session Key
		socket.emit('hasKey', sessionKey); 
		// Retrieve name from backend
		socket.on('hasKeyDone', function(result) {
			resolve(result);
		});
	});
}

// Login Renderer
function checkAccount(account) {
	console.log("checkingAccount");
	return new Promise((resolve,reject) => {
		console.log("makingPromise");
		socket.emit('login', account); 
		socket.on('loginDone', function(result) {
			resolve(result);
		});
	});
}

// FormManager
function storeNewIncident(obj) {
	return new Promise((resolve,reject) => {
		// From Database Save new incident
		socket.emit('createNewIncident', obj); 
		
		// Get Record ID
		socket.on("createNewIncidentDone",(recordID) => {
			resolve(recordID);
		});
	});
}

function storeUpdateIncident(obj) {
	return new Promise((resolve,reject) => {
		// From Database Save update incident
		socket.emit('createUpdateIncident', obj); 
		resolve();
	});
}

function checkRecord(recordID) {
	return new Promise((resolve, reject) => {
		socket.emit('validateRecordID', recordID); 
		socket.on('validateRecordIDDone', function(result) {
			resolve(result);
		});
	});
}

function updateToResolved(recordID) {
	return new Promise((resolve, reject) => {
		socket.emit('resolveIncident',recordID);
		resolve();
	});
}

function getRespondents(recordID) {
	return new Promise((resolve, reject) => {
		socket.emit('getRespondents', recordID); 
		socket.on('getRespondentsDone', function(result) {
			resolve(result);
		});
	});
}

function getUnresolvedIncidents() {
	return new Promise((resolve, reject) => {
		socket.emit('getUnresolvedIncidents'); 
		socket.on('getUnresolvedIncidentsDone', function(result) {
			resolve(result);
		});
	});
}