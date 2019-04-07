// Account & Token ID from Twilio
var accountSid = 'AC8f68c14c3b365cf9abba4c8db460cb39';
var authToken = 'f6f83688de9131c8d077a818071b960e'; 

var twilio = require('twilio'); //Import Twilio library
var client = new twilio(accountSid, authToken);

var debugMode = false; // if debug mode is true, don't send SMS but just console log. Conserve consumption of API credits.

var io = require('socket.io-client'); // Import socket.io libraries 
var socket = io.connect('http://localhost:5000/'); // Make the server listen to messages on port 5000

/**
 * Respondent SMS controller class
 */
module.exports = {
	/** 
	 * run the server for SMS to retrieve recent incident submissions from the database, which results in sending SMS to respondents as requested
	 */
	runSMS: async function() {
		socket.on('newIncidentReported', (newInc)=>{		
			for (var res of newInc.respondentRequested) {
				// Extract information
				var respondentContact = getRespondentContact(res);
				var recordID = newInc.recordID;
				var descr = newInc.descr;
				var time = newInc.insTime;
				var address = newInc.address;
				var unitNum = newInc.unitNum;
			
				messageSend(recordID, descr, time, address, unitNum, respondentContact);    
			}
		});
		
		socket.on('newUpdateToIncident', (reportData)=>{
			for (var res of reportData.updateInc.respondentRequested) {
				// Extract information
				var respondentContact = getRespondentContact(res);
				var recordID = reportData.updateInc.recordID;
				var descr = reportData.updateInc.updateDescr;
				var time = reportData.updateInc.updateTime;
				var address = reportData.newInc.Location;
				var unitNum = reportData.newInc.UnitNum;
				
				messageSend(recordID, descr, time, address, unitNum, respondentContact);
			}
		});
	}
}

/**
 * Send SMS to the appropriate respondents 
 * @param {number} recordID the record ID of the incident
 * @param {string} descr the description of the incident
 * @param {string} time the time when the incident is reported
 * @param {string} address the postal code of where the incident is
 * @param {string} unitNum the unit number of where the incident is
 * @param {string} respondentContact the contact number of the respondent
 */
function messageSend(recordID, descr, time, address, unitNum, respondentContact) {
	//Creating and sending message to desired telephone number (Respondents)
	const message = 'record ID: ' + recordID + ', "' + descr + '" reported on ' + time + '. Require assistance at S' + address + ' ' + unitNum;		// report message
	
	// add a debug mode
	if (!debugMode) {

		client.messages.create({
			body: message,
			to: respondentContact,  // Text this number (reportdata.respondentcontactinfo)
			from: '+19733588619' // From a valid Twilio number
			}).then((message) => console.log(message.sid));   

	} else {

		// don't send out message if using debug mode
		console.log(`Message: "${message}" send to Number: ${respondentContact}`);

	}
}

/**
 * Get the contact number of the respondent
 * @param {string} res the respondent type
 * @returns {string} contact number of the respondent
 */
function getRespondentContact(res) {
	var respondentContact;
	switch(res){
		case 'Emergency Ambulance':					// SCDF
			respondentContact = '+6592334282';			// Khairul's Number
			break;
		case 'Rescue and Evacuation':
			respondentContact = '+6583837858';			// My mum's number
			break;
		case 'Fire-Fighting':
			respondentContact = '+6598247659';			// My sis' number
			break;
		case 'Gas Leak Control':					// Singapore Power
			respondentContact = '+6596192840'; 			// Iggy's Number
			break;
		case 'Animal Control':						// AVA
			respondentContact = '+6597853111'; 			// Jesslyn's Number
			break;
		case 'Counter Terrorism':					// SoF
			respondentContact = '+6596755940';			// Martyn's Number
			break;
		case 'Cyber Security':						// CSA
			respondentContact = '+6597832796';			// Xi Tongs's Number
			break;
		case 'Disease Outbreak Control':				// CDC
			respondentContact = '+6597239430';			// Nigel's Number
			break;
		case 'Flood Control':						// PUB
			respondentContact = '+6590603282';			// Jing Wei's Number
			break;
		case 'Police Force':						// SPF
			respondentContact = '+6596684137'; 			// Christopher's Number
			break;
		default: {
			console.log(res);
			throw("Cannot find contact. May be a bug in your code");
		}
	} 
	return respondentContact;
}
