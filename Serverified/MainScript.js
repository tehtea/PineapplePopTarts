// subsystems
var respondentContacter = require('./RespondentContacter/RespondentSMS');
var socialMediaUpdater = require('./SocialMediaUpdater/SocialMedia');
var statusReportManager = require('./StatusReportManager/statusReportManager');
var databaseManager = require('./Web/JAVASCRIPT/CCO/DatabaseManager');
var weatherFetcher = require("./Web/JAVASCRIPT/Map/Weather.js");
var webServer = require("./Web/WebServer.js");

// run all subsystems
respondentContacter.runSMS();
socialMediaUpdater.runSocialMedia();
statusReportManager.runStatusReport();
databaseManager.runDatabase();
weatherFetcher.runWeather();
webServer.runWebServer();