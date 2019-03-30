// Get Data
module.exports = {
	runMap: function() {
		var ioServer = require('./Apps/node_modules/socket.io').listen(3000);
		ioServer.sockets.on('connection', function (socket){
			console.log("made connection on port 3000 with someone else")
			// keep send values to Map whenever they appear
			var io = require("./Apps/node_modules/socket.io-client");
			var socket = io.connect('http://172.21.146.196:5000');
			// Connect to server
			socket.on('connect',function() {
				// Request data from database
				socket.emit('cmRequest');
				// Retrieve data
				socket.on('cmRequestDone', function(result) {
					var x = incidentDataProcessing(result);
					x.then((info) => {
						ioServer.emit('cmRequestDone', info);
					});
				});
			});
			// Disconnect
			socket.on('disconnect', function(){});
	
		});
	}
}

async function incidentDataProcessing(data) {
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
			
			// Format Time
			var date= new Date(newInc[i].InsTime);
			date.setHours(date.getHours() - 8);
			var time = date.toString().slice(4,24);
			
			
			// Find any update incident for that recordID
			for (var j = 0; j < updInc.length; j++) {
				if (newInc[i].RecordID == updInc[j].RecordID) {
					if (newInc[i].InsTime <= updInc[j].UpdTime) {
						updDescr = updInc[j].Descr;
						
						// Format Time
						date= new Date(updInc[j].UpdTime);
						date.setHours(date.getHours() - 8);
						var time = date.toString().slice(4,24);
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
	
	// Format coordinate
	var postalCodes = [];
	for (let i=0; i<result.length; i++){
		postalCodes.push(parseInt(result[i]["postalCode"]));
	}

	var coordsInfo = [];
	// var z;
	for (let i=0; i<postalCodes.length; i++){
		z = await getCoor(postalCodes[i]);
		// check if z is defined first. If z is not defined and we try and access it, the subsystem will crash.
		if (z)
		{
			result[i]["address"] = z["ADDRESS"];
			result[i]["lat"] = z["LATITUDE"];
			result[i]["lng"] = z["LONGITUDE"];
		}
	}		
	
    return result;
};

function getCoor(postalCode) {
	return new Promise((resolve,reject) => {
		//PostalCodeToCoor.js
		const request = require('./Apps/node_modules/request');
		const linkPart1 = "https://developers.onemap.sg/commonapi/search?searchVal=";
		const linkPart2 = "&returnGeom=Y&getAddrDetails=Y";

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