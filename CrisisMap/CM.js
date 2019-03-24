var globalCleaned;

// Get Data
function retrieveData() {
	return new Promise(function(resolve,reject) {
		var io = require("./Apps/node_modules/socket.io-client");
		var socket = io.connect('http://localhost:5000');
		// Connect to server
		socket.on('connect',function() {
			// Request data from database
			socket.emit('cmRequest');
			// Retrieve data
			socket.on('cmRequestDone', function(result) {
				resolve(result);
			});
		});
		// Disconnect
		socket.on('disconnect', function(){});
	});
}

// INSERT CRISIS MAP CODE HERE
var ioServer = require('./Apps/node_modules/socket.io').listen(3333);

ioServer.sockets.on('connection', function (socket){
		console.log("made connection on port 3333 with someone else")
		// keep send values to Map whenever they appear
		if (globalCleaned){
			socket.emit('incidents', globalCleaned);
		}
});

var retrieval = retrieveData();
retrieval.then((result) => {
	var cleaned = incidentDataProcessing(result);
	//console.log(cleaned);
	//update globalCleaned (global version)
	globalCleaned = cleaned;
	//process incidents to extract the postal codes
	var postalCodes = [];
	for (let i=0; i<cleaned.length; i++){
		postalCodes.push(parseInt(cleaned[i]["postalCode"]));
	}

	//console.log(postalCodes);

	var coordsInfo = [];
	var z;
	for (let i=0; i<postalCodes.length; i++){
		z = getCoor(postalCodes[i]);
		z.then((result) => {
			// Insert code here
			//console.log(result["ADDRESS"]);
			cleaned[i]["address"] = result["ADDRESS"];
			cleaned[i]["lat"] = result["LATITUDE"];
			cleaned[i]["lng"] = result["LONGITUDE"];
			return cleaned;
			//console.log(globalCleaned[i]);
		}).then((result) => {
			//for each iteration of for loop, update globalCleaned
			globalCleaned = result;
		});
	}

});
/* Notes:
*	result[0] is newincidents
*	result[1] is updateincidents
*/

function incidentDataProcessing(data) {
	/* Extract all unresolved incidents, with each has the following format:
	*	Location of the incident
	*	Unit Number of the incident
	*	Initial description of the incident
	*	Latest description of updates (if any)
	*	Time of the latest report on the incident
	*/

	var newInc = data[0];
	var updInc = data[1];
	var result = [];
	var location, unitNum, initDescr, updDescr, time;

	for (var i = 0; i < newInc.length; i ++) {
		if (newInc[i].Resolved == false) {
			location = newInc[i].Location;
			unitNum = newInc[i].UnitNum;
			initDescr = newInc[i].Descr;
			updDescr = "";
			time = newInc[i].InsTime;

			// Find any update incident for that recordID
			for (var j = 0; j < updInc.length; j++) {
				if (newInc[i].RecordID == updInc[j].RecordID) {
					if (time <= updInc[j].UpdTime) {
						updDescr = updInc[j].Descr;
						time = updInc[j].UpdTime;
					}
				}
			}

			var incident = {
				postalCode: location,
				unitNum: unitNum,
				initDescr: initDescr,
				updDescr: updDescr,
				time: time
			};
			result.push(incident);
		}
	}
	return result;
}

//PostalCodeToCoor.js
const request = require('./Apps/node_modules/request');
const linkPart1 = "https://developers.onemap.sg/commonapi/search?searchVal=";
const linkPart2 = "&returnGeom=Y&getAddrDetails=Y";

var globalRawData;

function getCoor(postalCode) {
	return new Promise((resolve,reject) => {
		// API link for data
		var GeneralLink = linkPart1 + postalCode + linkPart2;

		// Retrieve from API
		request(GeneralLink, { json: true }, (err, res, body) => {
			  if (err) { return console.log(err); }
			  if (res.statusCode == 200 && res.headers['content-type'].includes("application/json"))
			  {
				 var rawData = body.results[0];
				 resolve(rawData);
			  }
		});
	});
}

var test = getCoor(416729);
test.then((result) => {
	// Insert code here
	console.log(result);
});
