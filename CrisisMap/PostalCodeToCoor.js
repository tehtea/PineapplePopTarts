const request = require('./Apps/node_modules/request');
const linkPart1 = "https://developers.onemap.sg/commonapi/search?searchVal=";
const linkPart2 = "&returnGeom=Y&getAddrDetails=Y";

var globalRawData;

//get incident data from CM.js
var incidents;

var socket = io.connect('http://localhost:3335');

socket.on('connect', function(){
	console.log("received connection on port 3335 from CM.js");
	socket.on('incidents', function(result){
		incidents = result;
		console.log(incidents);

		//process incidents to extract the postal codes
		var postalCodes = [];
		for (let i=0; i<incidents.length; i++){
			postalCodes.push(parseInt(incidents[i]["postalCode"]));
		}

		console.log(postalCodes);

		var coordsInfo = [];
		var test;
		for (let i=0; i<postalCodes.length; i++){
			test = getCoor(postalCodes[i]);
			console.log(test);
			test.then((result) => {
				// Insert code here
				console.log(result);
				//CONTINUE TESTING FROM HERE
				// globalCleaned[i]["address"] = result["ADDRESS"];
				// globalCleaned[i]["lat"] = result["LATITUDE"];
				// globalCleaned[i]["lng"] = result["LONGITUDE"];
			});
		}
		console.log(incidents);
	});
});
socket.on('disconnect', function(){});

var pctc_to_map = require('./Apps/node_modules/socket.io').listen(3333);

ioServer2.sockets.on('connection', function (socket){
		console.log("made connection on port 3333 with Map.js");
		// keep send values to Map whenver they appear
		if (postalCodes){
			socket.emit('postalcodes', postalCodes);
		}
});

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
