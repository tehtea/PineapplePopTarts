// Control class - Database Manager
var DatabaseRetriever = require("./DatabaseRetriever");
var DatabaseSMSManager = require('./DatabaseSMSManager');
var DatabaseSocialMediaManager = require('./DatabaseSocialMediaManager');

// Initiate socket.io server
var io = require('socket.io').listen(5000);

module.exports = {
	runDatabase: async function() {
		io.sockets.on('connection', function (socket) {
			// 2. Add new incident
			socket.on('createNewIncident', function (obj) {
				/**
				 * obj should have:
				 * name - string
				 * contact - int
				 * address - string
				 * unitNum - string
				 * descr - string
				 * insName - string
				 * respondentRequested - array
				 */
				let x = DatabaseRetriever.storeNewIncident(obj); 
				x.then(() => {
					// Get record id
					let getRecord = DatabaseRetriever.getRecordIDIncident(obj);
					getRecord.then((record) => {
						record = record[0]; // unpack the record

						// Fix time format
						var timeString = record.InsTime.toISOString();
						
						// Generate Respondent Table
						for (var i = 0; i < obj.respondentRequested.length; i ++) {
							var resp = obj.respondentRequested[i];
							DatabaseRetriever.storeRespondent(resp, record.RecordID, timeString);
						}		

						obj.recordID = record.RecordID; // inject record id into obj
						
						// fix date format
						var date= new Date(record.InsTime);
						date.setHours(date.getHours() - 8); 
						obj.insTime = date.toString().slice(4,24);
						
						// Send SMS to Respondents
						DatabaseSMSManager.newIncidentSendSMS(obj);
						
						// Create social media post
						DatabaseSocialMediaManager.socialMediaNew(obj);
						
						// Return RecordID. TODO: add to the frontend
						socket.emit("createNewIncidentDone",record.RecordID);
					});
				});
			});
			
			// 3. Check RecordID
			socket.on('validateRecordID', function (recordID) {
				// Get values from database 
				let retrievedData = DatabaseRetriever.getFormViaRecordID(recordID);
				retrievedData.then(function(result) {
					// unpack the result
					result = result[0];
					// Return data retrieved from database
					socket.emit('validateRecordIDDone',result);
				}); 
			});
			
			/**
			 * 4. Add update incident
			 * 
			 * Update object should contain:
			 * recordID - int
			 * respondentReporting - array
			 * updateName - name of call center operator updating
			 * updateDescr - string
			 */
			socket.on('createUpdateIncident', function (obj) {
				// Update Incident Table
				let x = DatabaseRetriever.storeUpdateIncident(obj); 
				x.then(() => {
					// Get time of the update incident
					let getRecord = DatabaseRetriever.getTimeUpdateIncident(obj);
					
					getRecord.then((time) => {
						// unpack the result
						time = time[0];

						// Fix time format
						var timeString = time.Time.toISOString();
						
						// Insert into Respondent Table
						for (var i = 0; i < obj.respondentRequested.length; i ++) {
							var resp = obj.respondentRequested[i];
							DatabaseRetriever.storeRespondent(resp, obj.recordID, timeString);
						}	
						
						// fix time
						var date= new Date(time.Time);
						date.setHours(date.getHours() - 8);
						obj.updateTime = date.toString().slice(4,24);
						
						// get original report
						var getFormViaRecordID = DatabaseRetriever.getFormViaRecordID(obj.recordID);
						getFormViaRecordID.then((newIncident) => {	
							newIncident = newIncident[0] // unpack the result

							if (obj.respondentRequested.length > 0) {
								// Send SMS to Respondents if any
								DatabaseSMSManager.updateIncidentSendSMS(obj, newIncident);
							}
							// Create social media post
							DatabaseSocialMediaManager.socialMediaUpd(obj, newIncident);
						});
					});
				});
			});
			
			// 6. Resolve incident
			/**
			 * Resolve incident
			 * Should resolve the incident in the database, then send this resolved incident over
			 * to the Map subsystem, the Status Report Manager subsystem and the Social Media 
			 * subsystem.
			 */
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
			
			// 8. Get all unresolved incidents. Used by the call center operator update form.
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