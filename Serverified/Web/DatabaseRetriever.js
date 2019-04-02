/**
 * Database Retriever.
 */

const dbQuery = require('./dbQuery').runQuery;

module.exports = {
	// Store Respondent
	storeRespondent: function(respondent, recordID, insTime) {
		return dbQuery("INSERT INTO RespondentRequest(RecordID, Respondent, InsTime) VALUES \
		('"+recordID+"','"+respondent+"','"+insTime+"');");
	},
	
	// Store New Incident
	storeNewIncident: function(obj) {
		return dbQuery("INSERT INTO NewIncident(Name, Contact, Location, UnitNum, Descr, InsName) VALUES \
		('"+obj.name+"', '"+obj.contact+"', '"+obj.address+"', '"+obj.unitNum+"', '"+obj.descr+"', '"+obj.insName+"');");
	},
	
	// Get Record ID for newly made Incident
	getRecordIDIncident: function(obj) {
		return dbQuery("SELECT RecordID, InsTime FROM NewIncident \
		WHERE RecordID = (	\
			SELECT MAX(RecordID) as RecordID FROM NewIncident \
			WHERE InsName='"+obj.insName+"');");
	},
	
	// For Update Form, find new incident by recordID
	getFormViaRecordID: function(recordID) {
		return dbQuery("SELECT * FROM NewIncident WHERE \
		RecordID = '"+recordID+"'");
	},
	
	// Store Update Form
	storeUpdateIncident: function(obj) {
		return dbQuery("INSERT INTO UpdateIncident(RecordID, Respondent, UpdName, Descr) VALUES \
		('"+obj.recordID+"','"+obj.respondentReporting+"','"+obj.updateName+"','"+obj.updateDescr+"');");
	},
	
	// Get time for respondent table from update table
	getTimeUpdateIncident: function(obj) {
		return dbQuery("SELECT MAX(UpdTime) as Time FROM UpdateIncident \
		WHERE RecordID = '"+obj.recordID+"' \
		AND UpdName = '"+obj.updateName+"' ");
	},
	
	resolveIncident: function(recordID) {
		return dbQuery("UPDATE NewIncident SET Resolved=1 WHERE RecordID = "+recordID);
	},
	
	getRespondents: function(recordID) {
		return dbQuery("SELECT Respondent FROM RespondentRequest WHERE RecordID =" + recordID);
	},
	
	getUnresolvedIncidents: function() {
		return dbQuery("SELECT * FROM NewIncident \
		WHERE Resolved = 0");
	},
	
	// Data retrieval for Status Report Manager 
	getRecentNewIncident: function() {
		return dbQuery("SELECT * FROM NewIncident \
		WHERE InsTime > DateADD(mi, -30, Current_TimeStamp)");
	},
	getRecentUpdateIncident: () => {
		return dbQuery("SELECT * FROM UpdateIncident \
		WHERE UpdTime > DateADD(mi, -30, Current_TimeStamp)");
	},
	getRecentRespondentRequested: () => {
		return dbQuery("SELECT * FROM RespondentRequest \
		WHERE InsTime > DateADD(mi, -30, Current_TimeStamp)");
	},
	
	// Data Retrieval for Crisis Map
	getAllNewIncident: () => {
		return dbQuery("SELECT * FROM NewIncident WHERE Resolved=0");
	},
	getAllUpdateIncident: () => {
		return dbQuery("SELECT * FROM UpdateIncident");
	},
	getAllRespondentRequested: () => {
		return dbQuery("SELECT * FROM RespondentRequest");
	}
}

