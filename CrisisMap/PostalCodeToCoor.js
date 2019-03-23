
const request = require('./Apps/node_modules/request');
const linkPart1 = "https://developers.onemap.sg/commonapi/search?searchVal=";
const linkPart2 = "&returnGeom=Y&getAddrDetails=Y";

module.exports = {
	getCoor: function(postalCode) {
		return new Promise((resolve,reject) => {
			// API link for data
			var GeneralLink = linkPart1 + postalCode + linkPart2;

			// Retrieve from API
			request(GeneralLink, { json: true }, (err, res, body) => {
				  if (err) { return console.log(err); }
				  if (res.statusCode == 200 && res.headers['content-type'].includes("application/json"))
				  {
					 var rawData = body.results[0];
					 resolve (rawData);
				  }
			});
		});
	}
}


var test = getCoor(416729);
test.then((result) => {
	// Insert code here
	console.log(result);
});
