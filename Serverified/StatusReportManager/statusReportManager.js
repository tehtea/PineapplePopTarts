"use strict";
const cron = require("node-cron");

var reportTransmitter = require('./reportTransmitter.js');
var reportGenerator = require('./reportGenerator.js');

var reportGenerated;

module.exports = {
	runStatusReport: async function() {
		cron.schedule('*/30 * * * *', () => {  //EVERY 30 MINS (XX:00 & XX:30)
		// cron.schedule('*/60 * * * * *', () => {  //EVERY 1 MINUTE FOR TESTING
			reportGenerated = reportGenerator.generateReport();
  			reportGenerated.then(() => {
				reportTransmitter.sendEmail();
			});  
		});
	}
}
