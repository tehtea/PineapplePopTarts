"use strict";
const cron = require("node-cron");

var reportTransmitter = require('./reportTransmitter.js');
var reportGenerator = require('./reportGenerator.js');
var keyIncidentFetcher = require('./keyIncidentFetcher.js');
var apiDataFetcher = require('./apiDataFetcher.js');


reportGenerator.generateReport();

cron.schedule('*/10 * * * * *', () => {  //EVERY 10 SECONDS
    reportTransmitter.sendEmail();
});
