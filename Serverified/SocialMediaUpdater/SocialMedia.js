
// modules and libraries
var socket = require('./Apps/node_modules/socket.io'); 
var io = socket.listen(5050);

var facebookPoster 	= require('./facebookPoster');
var facebookConfig 	= require('./facebookConfig');
var tweeter 		= require('./tweeter');
var twitterConfig 	= require('./twitterConfig');

module.exports = {
	runSocialMedia: async function() {
		// Connect to server
		io.on('connection', (socket) =>{
			// Recieve new incident 
			socket.on('socialMediaNew', function(reportData) {
				console.log("Received New Incident: ");
				
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
			socket.on('socialMediaUpd', function(reportData) {
				console.log("Received Update Incident");
				
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
		});

		// string up the incident data so it can be posted on social media in a readable fashion
		function parseNewIncidentData(newInc) {
			// Extract information
			var recordID = newInc.recordID;
			var descr = newInc.descr;
			var address = newInc.address;
			var unitNum = newInc.unitNum;
			
			var postMessage = "Incident No." + recordID + ": \"" + descr + "\" Location: S" + address + " " + unitNum; 
			return postMessage;
		}

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