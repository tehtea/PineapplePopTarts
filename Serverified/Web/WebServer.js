const routes = require("./routes");
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// local drivers
var databaseManager = require('./DatabaseManager'),
    crisisMapManager = require('./CM'),
    weatherFetcher = require('./public/JAVASCRIPT/Weather');

module.exports = {
    runWeb : function() {
        // random middleware
        app.set("view engine", "ejs");
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(express.static("public"));

        // use the views
        app.use("/CSS", express.static(path.join(__dirname, "public", "CSS")));
        app.use("/IMG", express.static(path.join(__dirname, "public", "IMG")));
        app.use("/JAVASCRIPT", express.static(path.join(__dirname, "public", "JAVASCRIPT")));

        app.set('views', path.join(__dirname, '/views'));
        
        // import the routes defined elsewhere
        app.use(routes);

        // run the various managers
        crisisMapManager.runMap();
        databaseManager.runDatabase();
        weatherFetcher.runWeather();

        // run the web server proper
        app.listen(8080, function() {
            console.log('App listening on port 8080!');
        });
    }
}