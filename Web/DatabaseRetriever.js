/**
 * Database Retriever. Contains 
 */

const dbQuery = require('./dbQuery').runQuery;

/**
 * Stores a new respondent into the RespondentRequest table, given a respondent, a record ID and the incident time. 
 * @param {*} respondent 
 * @param {*} recordID 
 * @param {*} insTime 
 */
function storeRespondent (respondent, recordID, insTime) {
	return dbQuery("INSERT INTO RespondentRequest(RecordID, Respondent, InsTime) VALUES \
	('"+recordID+"','"+respondent+"','"+insTime+"');")
};

/**
 * Store a new incident object into the NewIncident table. 
 * Incident must contain:
 * - name - name of reporter
 * - contact - contact number of reporter
 * - address - address of the incident
 * - unitNum - unit number of location (if any)
 * - descr - description of incident
 * - insName - name of operator who handled this incident
 * @param {*} obj - the new incident to be storing
 */
function storeNewIncident(obj) {
	return dbQuery("INSERT INTO NewIncident(Name, Contact, Location, UnitNum, Descr, InsName) VALUES \
	('"+obj.name+"', '"+obj.contact+"', '"+obj.address+"', '"+obj.unitNum+"', '"+obj.descr+"', '"+obj.insName+"');");
};

/**
 * Get the record ID for a newly made incident. 
 * The object must contain insName, which is the name of the call center operator.
 * @param {*} obj 
 */
function getRecordIDIncident(obj) {
	return dbQuery("SELECT RecordID, InsTime FROM NewIncident \
	WHERE RecordID = (	\
		SELECT MAX(RecordID) as RecordID FROM NewIncident \
		WHERE InsName='"+obj.insName+"');");
}

/**
 * Find a new incident using its record id.
 * @param {*} recordID 
 */
function getFormViaRecordID(recordID) {
	return dbQuery("SELECT * FROM NewIncident WHERE \
	RecordID = '"+recordID+"'");
}

/**
 * Store an update incident.
 * @param {*} obj 
 */
function storeUpdateIncident (obj) {
	return dbQuery("INSERT INTO UpdateIncident(RecordID, Respondent, UpdName, Descr) VALUES \
	('"+obj.recordID+"','"+obj.respondentReporting+"','"+obj.updateName+"','"+obj.updateDescr+"');");
}

/**
 * Get time for respondent table from update table
 * @param {*} obj 
 */
function getTimeUpdateIncident(obj) {
	return dbQuery("SELECT MAX(UpdTime) as Time FROM UpdateIncident \
	WHERE RecordID = '"+obj.recordID+"' \
	AND UpdName = '"+obj.updateName+"' ");
};

/**
 * Resolve an incident based on its recordID.
 * @param {*} recordID 
 */
function resolveIncident (recordID) {
	return dbQuery("UPDATE NewIncident SET Resolved=1 WHERE RecordID = "+recordID);
};

/**
 * Get the array of respondents associated with an incident.
 * @param {*} recordID 
 */
function getRespondents(recordID) {
	return dbQuery("SELECT Respondent FROM RespondentRequest WHERE RecordID =" + recordID);
};

/**
 * Getter method for all unresolved incidents.
 */
function getUnresolvedIncidents() {
	return dbQuery("SELECT * FROM NewIncident \
	WHERE Resolved = 0");
};

/**
 * Getter method for the incidents in the past 30 minutes.
 */
function getRecentNewIncident() {
	return dbQuery("SELECT * FROM NewIncident \
	WHERE InsTime > DateADD(mi, -30, Current_TimeStamp)");
};

/**
 * Getter method for all incident updates in the last 30 minutes
 */
function getRecentUpdateIncident() {
	return dbQuery("SELECT * FROM UpdateIncident \
	WHERE UpdTime > DateADD(mi, -30, Current_TimeStamp)");
}

/**
 * Getter method for all respondents requested in the last 30 minutes
 */
function getRecentRespondentRequested() {
	return dbQuery("SELECT * FROM RespondentRequest \
	WHERE InsTime > DateADD(mi, -30, Current_TimeStamp)");
}

/**
 * Getter method for all unresolved incidents
 */
function getAllNewIncident () {
	return dbQuery("SELECT * FROM NewIncident WHERE Resolved=0");
};

/**
 * Getter method for all incident updates
 */
function getAllUpdateIncident () {
	return dbQuery("SELECT * FROM UpdateIncident");
};

/**
 * Getter method for all respondents requested
 */
function getAllRespondentRequested () {
	return dbQuery("SELECT * FROM RespondentRequest");
};

module.exports = {
	storeRespondent: storeRespondent,

	storeNewIncident: storeNewIncident,
	
	getRecordIDIncident: getRecordIDIncident,
	
	getFormViaRecordID: getFormViaRecordID,
	
	storeUpdateIncident: storeUpdateIncident,
	
	getTimeUpdateIncident: getTimeUpdateIncident,
	
	resolveIncident: resolveIncident,
	
	getRespondents: getRespondents,
	
	getUnresolvedIncidents: getUnresolvedIncidents,
	
	// Data retrievals for Status Report Manager 

	getRecentNewIncident: getRecentNewIncident,

	getRecentUpdateIncident: getRecentUpdateIncident,

	getRecentRespondentRequested: getRecentRespondentRequested,
	
	// Data Retrieval for Crisis Map
	getAllNewIncident: getAllNewIncident,

	getAllUpdateIncident: getAllUpdateIncident,

	getAllRespondentRequested: getAllRespondentRequested,
}

