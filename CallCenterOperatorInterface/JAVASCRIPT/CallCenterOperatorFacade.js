// Facade class for call center operator subsystem (Design pattern)

const DATABASE_SERVER = 'http://localhost:5000';
var socket = io.connect(DATABASE_SERVER);

/**
 * Retrieve account details with session key from database.
 * Used in AccountDetailsRenderer, ContentValidation, FormManager classes
 * @param {string} sessionKey the account's session key
 * @returns {Account} matching account 
 */
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

/**
 * Change whether account is valid. 
 * Used in Login Renderer class
 * @param {Account} account account
 * @returns {Account} matching account 
 */
function checkAccount(account) {
	return new Promise((resolve,reject) => {
		socket.emit('login', account); 
		socket.on('loginDone', function(result) {
			resolve(result);
		});
	});
}

/**
 * Store a new incident into the database.
 * Used in FormManager
 * @param {object} obj new incident report
 * @returns {string} recordID
 */
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

/**
 * Store an update incident into the database.
 * Used in FormManager
 * @param {object} obj update incident report
 */
function storeUpdateIncident(obj) {
	return new Promise((resolve,reject) => {
		// From Database Save update incident
		socket.emit('createUpdateIncident', obj); 
		resolve();
	});
}

/**
 * Check whether the recordID exists in the database
 * @param {string} recordID incident report ID
 */
function checkRecord(recordID) {
	return new Promise((resolve, reject) => {
		socket.emit('validateRecordID', recordID); 
		socket.on('validateRecordIDDone', function(result) {
			resolve(result);
		});
	});
}

/**
 * Change the incident to resolved in the database
 * @param {string} recordID incident report ID
 */
function updateToResolved(recordID) {
	return new Promise((resolve, reject) => {
		socket.emit('resolveIncident',recordID);
		resolve();
	});
}

/**
 * Get the respondents that were previously requested in an incident
 * @param {string} recordID incident report ID
 * @returns {object} respondents
 */
function getRespondents(recordID) {
	return new Promise((resolve, reject) => {
		socket.emit('getRespondents', recordID); 
		socket.on('getRespondentsDone', function(result) {
			resolve(result);
		});
	});
}

/**
 * Get all unresolved incidents from database
 * @returns {object} unresolved incidents
 */
function getUnresolvedIncidents() {
	return new Promise((resolve, reject) => {
		socket.emit('getUnresolvedIncidents'); 
		socket.on('getUnresolvedIncidentsDone', function(result) {
			resolve(result);
		});
	});
}