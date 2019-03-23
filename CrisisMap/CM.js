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
var cm_to_pctc = require('./Apps/node_modules/socket.io').listen(3335);

cm_to_pctc.sockets.on('connection', function (socket){
		console.log("made connection on port 3335 with PCTC.js");
		// keep send values to Map whenver they appear
		if (globalCleaned){
			socket.emit('incidents', globalCleaned);
		}
});

var retrieval = retrieveData();
retrieval.then((result) => {
	var cleaned = incidentDataProcessing(result);
	console.log(cleaned);
	// debug
	globalCleaned = cleaned;
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
