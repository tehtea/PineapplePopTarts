"use strict";

var reportTransmitter = require('./report_transmitter.js');
var reportGenerator = require('./report_generator.js');
var keyIncidentFetcher = require('./key_incident_fetcher.js');
var apiDataFetcher = require('./api_data_fetcher.js');


let transporter = reportTransmitter.createTransport();
reportGenerator.generateReport();
reportTransmitter.sendEmail(transporter);
