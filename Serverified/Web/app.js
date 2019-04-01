const routes = require("./routes");
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// random middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use("/public/views", express.static(path.join(__dirname, "public","views")));

app.use(routes);

app.listen(8080, function() {
    console.log('App listening on port 8080!');
});