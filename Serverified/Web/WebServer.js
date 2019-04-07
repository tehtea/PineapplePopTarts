<<<<<<< HEAD
/**
 * The script to execute the web server using.
 */

const routes = require("./routes");
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var flash = require('connect-flash');


// local drivers
var databaseManager = require('./DatabaseManager');

module.exports = {
    runWeb : function() {
        // random middleware
        app.set("view engine", "ejs");
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(express.static("public"));
        app.use(flash());

        // set where to find static files for frontend
        app.use("/CSS", express.static(path.join(__dirname, "public", "CSS")));
        app.use("/IMG", express.static(path.join(__dirname, "public", "IMG")));
        app.use("/JAVASCRIPT", express.static(path.join(__dirname, "public", "JAVASCRIPT")));

        app.set('views', path.join(__dirname, '/views'));
        
        // import the routes defined elsewhere
        app.use(routes);

        // run the various managers
        databaseManager.runDatabase();

        // run the web server proper
        app.listen(8080, function() {
            console.log('App listening on port 8080!');
        });
=======
var express = require("express");
var app = express();
var path = require('path');

module.exports = {
    runWebServer: async function() {
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

        app.listen(8080);
>>>>>>> master
    }
}
