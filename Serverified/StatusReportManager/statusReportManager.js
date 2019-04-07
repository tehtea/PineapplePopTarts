"use strict";
const cron = require("node-cron");

var reportTransmitter = require('./reportTransmitter.js');
var reportGenerator = require('./reportGenerator.js');

var reportGenerated;

/** 
 * Status Report Manager class
 */
module.exports = {
	/**
	 * Generate the status report every 30 minutes
	 */
	runStatusReport: async function() {
		cron.schedule('*/30 * * * *', () => {  //EVERY 30 MINS (XX:00 & XX:30)
		//cron.schedule('*/10 * * * * *', () => {  //EVERY 10 SECONDS FOR TESTING
			reportGenerated = reportGenerator.generateReport();
  			reportGenerated.then(() => {
				reportTransmitter.sendEmail();
			});  
		});
	}
}
