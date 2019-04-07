
// modules and libraries
var io = require('socket.io-client'); 
var socket = io.connect('http://localhost:5000/');

var facebookPoster 	= require('./facebookPoster');
var facebookConfig 	= require('./facebookConfig');
var tweeter 		= require('./tweeter');
var twitterConfig 	= require('./twitterConfig');

/** 
 * Social Media class
 */
module.exports = {
	/**
	 * Run social media subsystem server to retrieve recent incident submissions and send SMS
	 */
	runSocialMedia: async function() {
		// Recieve new incident 
		socket.on('newIncidentReported', function(reportData) {
			
			var postMessage = parseNewIncidentData(reportData);
			facebookPoster.postOnPage(
				facebookConfig.PAGE_ID, 
				postMessage,
				facebookConfig.pageAccessToken
			);
			tweeter.postTweet( 
				postMessage,
				twitterConfig
			);
		});
		
		// Recieve update incident
		socket.on('newUpdateToIncident', function(reportData) {			
			var postMessage = parseUpdateIncidentData(reportData);
			facebookPoster.postOnPage(
				facebookConfig.PAGE_ID, 
				postMessage,
				facebookConfig.pageAccessToken
			);
			tweeter.postTweet( 
				postMessage,
				twitterConfig
			);
		});

		/**
		 * String up the new incident data so it can be posted on social media in a readable fashion
		 * @param {object} newInc new incident report
		 * @returns {string} the post message
		 */
		function parseNewIncidentData(newInc) {
			// Extract information
			var recordID = newInc.recordID;
			var descr = newInc.descr;
			var address = newInc.address;
			var unitNum = newInc.unitNum;
			
			var postMessage = "Incident No." + recordID + ": \"" + descr + "\" Location: S" + address + " " + unitNum; 
			return postMessage;
		}

		/**
		 * String up the update incident data so it can be posted on social media in a readable fashion
		 * @param {object} reportData update incident report
		 * @returns {string} the post message
		 */
		function parseUpdateIncidentData(reportData) {
			// Extract information
			var recordID = reportData.updateInc.recordID;
			var descr = reportData.updateInc.updateDescr;
			var address = reportData.newInc.Location;
			var unitNum = reportData.newInc.UnitNum;
			
			var postMessage = "Update on Incident No." + recordID + ": \"" + descr + "\" Location: S" + address + " " + unitNum; 
			return postMessage;
		}
	}
}