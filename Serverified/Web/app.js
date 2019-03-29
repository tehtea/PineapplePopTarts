var express = require("express");
var app = express();
var path = require('path');

// subsystems
var respondentContacter = require('../RespondentContacter/RespondentSMS');
var socialMediaUpdater = require('../SocialMediaUpdater/SocialMedia');
var statusReportManager = require('../StatusReportManager/statusReportManager');
var databaseManager = require('./JAVASCRIPT/CCO/DatabaseManager');

// Set CSS to be fetched from ./CSS/CCO and ./CSS/Map
app.use("/CSS", express.static(path.join(__dirname, "CSS", "CCO")));
app.use("/CSS", express.static(path.join(__dirname, "CSS", "Map")));

// Set JAVASCRIPT to be fetched from ./JAVASCRIPT/CCO and ./JAVASCRIPT/Map
app.use("/JAVASCRIPT", express.static(path.join(__dirname, "JAVASCRIPT", "CCO")));
app.use("/JAVASCRIPT", express.static(path.join(__dirname, "JAVASCRIPT", "Map")));

// Set IMG to be fetched from ./IMG
app.use("/IMG", express.static(path.join(__dirname, "IMG")));

// main game page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "HTML", "CCO", "HomeView.html"));
});

// map page TODO: fix the damn page
app.get("/map", function(req, res) {
    res.sendFile(path.join(__dirname, "HTML", "Map", "MapView.html"));
});

// login page for call center operator
app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "HTML", "CCO", "LoginView.html"));
});

// account view after logging in
app.get("/accountView", function(req, res) {
    res.sendFile(path.join(__dirname, "HTML", "CCO", "AccountView.html"));
});

// information view
app.get("/youDunnoCanGoAndDie", function(req, res) {
    res.sendFile(path.join(__dirname, "HTML", "CCO", "InformationView.html"));
});

// update an incident
app.get("/updateForm", function(req, res) {
    res.sendFile(path.join(__dirname, "HTML", "CCO", "UpdateFormView.html"));
});

// report an incident
app.get("/reportForm", function(req, res) {
    res.sendFile(path.join(__dirname, "HTML", "CCO", "FormView.html"));
});

respondentContacter.runSMS();
socialMediaUpdater.runSocialMedia();
statusReportManager.runStatusReport();
databaseManager.runDatabase();

app.listen(8080);