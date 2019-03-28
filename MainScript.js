var Database = require("./CallCenterOperatorInterface/JAVASCRIPT/DatabaseManager.js");
//var SocialMedia = require("./SocialMediaUpdater/SocialMedia.js");
//var SMS = require("./RespondentContacter/RespondentSMS.js");
var StatusReport = require("./StatusReportManager/statusReportManager.js");
var CrisisMap = require("./CrisisMap/CM.js");
var Weather = require("./CrisisMap/Weather.js");

//SocialMedia.runSocialMedia();
//SMS.runSMS();
Database.runDatabase();
Weather.runWeather();
StatusReport.runStatusReport();



/*
Notes:
SMS and Social Media are fully functional

To run the system:
- Install all dependencies(npm install) in the following places
+ .\CallCenterOperatorInterface\JAVASCRIPT\Apps
+ .\CrisisMap\Apps
+ .\RespondentContacter\Apps
+ .\SocialMediaUpdater
+ .\SocialMediaUpdater\Apps
+ .\StatusReportManager
+ .\StatusReportManager/Apps

- Install other dependencies manually
socket.io.js
*/