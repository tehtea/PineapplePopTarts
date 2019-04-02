// Control class - Database Manager
var DatabaseRetriever = require("./DatabaseRetriever");
var DatabaseSMSManager = require('./DatabaseSMSManager');
var DatabaseSocialMediaManager = require('./DatabaseSocialMediaManager');

// Initiate socket.io server
var io = require('socket.io').listen(5000);

// why is everything in module.exports?
module.exports = {
	runDatabase: async function() {
		io.sockets.on('connection', function (socket) {
			// 2. Add new incident
			socket.on('createNewIncident', function (obj) {
				// New Incident Table
				let x = DatabaseRetriever.storeNewIncident(obj); 
				x.then(() => {
					// Get record id
					let getRecord = DatabaseRetriever.getRecordIDIncident(obj);
					getRecord.then((record) => {
						// Fix time format
						var timeString = record.InsTime.toISOString();
						
						// Generate Respondent Table
						// edge case: if only one respondent, respondentRequested will be a string
						if (typeof obj.respondentRequested == 'string') {
							DatabaseRetriever.storeRespondent(obj.respondentRequested, record.RecordID, timeString);
						} else {
							for (var i = 0; i < obj.respondentRequested.length; i ++) {
								var resp = obj.respondentRequested[i];
								console.log(resp);
								DatabaseRetriever.storeRespondent(resp, record.RecordID, timeString);
							}		
						};
						obj.recordID = record.RecordID;
						var date= new Date(record.InsTime);
						date.setHours(date.getHours() - 8);
						obj.insTime = date.toString().slice(4,24);
						
						// Send SMS to Respondents
						DatabaseSMSManager.newIncidentSendSMS(obj);
						// Create social media post
						DatabaseSocialMediaManager.socialMediaNew(obj);
						
						// Return RecordID
						socket.emit("createNewIncidentDone",record.RecordID);
					});
				});
			});
			
			// 3. Check RecordID
			socket.on('validateRecordID', function (input) {
				// Get values from database 
				let retrievedData = DatabaseRetriever.getFormViaRecordID(input);
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
						
						var date= new Date(time.Time);
						date.setHours(date.getHours() - 8);
						obj.updateTime = date.toString().slice(4,24);
						
						// get original report
						var getFormViaRecordID = DatabaseRetriever.getFormViaRecordID(obj.recordID);
						getFormViaRecordID.then((newIncident) => {	
							if (obj.respondentRequested.length > 0) {
								// Send SMS to Respondenta if any
								DatabaseSMSManager.updateIncidentSendSMS(obj, newIncident);
							}
							// Create social media post
							DatabaseSocialMediaManager.socialMediaUpd(obj, newIncident);
						});
					});
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
			
			// STATUS REPORT SUBSYSTEM
			socket.on('srRequest', function () {
				// Get values from database 
				Promise.all([DatabaseRetriever.getRecentNewIncident(),DatabaseRetriever.getRecentUpdateIncident(),DatabaseRetriever.getRecentRespondentRequested()]).then((result) => {
					// Return Data retrieve from database
					socket.emit('srRequestDone',result);
				}); 
			});
			
			// CRISIS MAP SUBSYSTEM
			socket.on('cmRequest', function () {
				// Get values from database
				Promise.all([DatabaseRetriever.getAllNewIncident(),DatabaseRetriever.getAllUpdateIncident()]).then((result) => {
					// Return Data retrieve from database
					socket.emit('cmRequestDone',result);
				});
			});
		});
	}
}