// modules and libraries
var io = require("./Apps/node_modules/socket.io-client");
var facebookPoster 	= require('./facebookPoster');
var facebookConfig 	= require('./facebookConfig');
var tweeter 		= require('./tweeter');
var twitterConfig 	= require('./twitterConfig');

// socket.io initialization
var socket = io.connect('http://localhost:5000');

// Connect to server
socket.on('connect',function() {
	// Recieve new incident 
	socket.on('socialMediaNew', function(result) {
		console.log("Received New Incident: ");
		// ADD CODE HERE
		var postMessage = parseNewIncidentData(result);
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
	socket.on('socialMediaUpd', function(result) {
		console.log("Received Update Incident");
		// ADD CODE HERE
		// Won't add anything here first because i'm not sure if we should be posting updates to an incident as it is directly.
	});
});

// string up the incident data so it can be posted on social media in a readable fashion
function parseNewIncidentData(incidentData) {
	return incidentData.Descr + " on " + incidentData.InsTime + " at " + incidentData.Location + ".";
}
