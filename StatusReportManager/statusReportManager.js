"use strict";
const cron = require("node-cron");

var reportTransmitter = require('./reportTransmitter.js');
var reportGenerator = require('./reportGenerator.js');

reportGenerator.generateReport();

cron.schedule('*/30 * * * *', () => {  //EVERY 30 MINS
//cron.schedule('*/10 * * * * *', () => {  //EVERY 10 SECONDS FOR TESTING
    reportTransmitter.sendEmail();
});
