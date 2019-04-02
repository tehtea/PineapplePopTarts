// subsystems
var respondentContacter = require('./RespondentContacter/RespondentSMS');
var socialMediaUpdater = require('./SocialMediaUpdater/SocialMedia');
var statusReportManager = require('./StatusReportManager/statusReportManager');
var webServer = require("./Web/WebServer.js");

// run all subsystems
respondentContacter.runSMS();
socialMediaUpdater.runSocialMedia();
// statusReportManager.runStatusReport(); // this shit needs more debugging
webServer.runWeb();