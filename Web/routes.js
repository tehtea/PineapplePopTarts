/**
 * The HTTP endpoints served by the Web Server
 */

const   // libraries
        express = require('express'),
        router = express.Router(),
        passport = require('passport'),
        localStrategy = require('passport-local').Strategy,
        loginManager = require('./loginManager'),
        session = require('express-session'), // library for Sessions, which is used to store user data
        io = require('socket.io-client'),
        request = require('request'); // for checking postal code

var socket = io.connect("http://localhost:5000/", {
    reconnection: true
});

// passportJS middlewares
router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 360000, secure: false }
}));

router.use(passport.initialize());
router.use(passport.session());

// tell passport which strategy to use (required for login)
passport.use('local', new localStrategy(
    {
    passReqToCallback : true,
    usernameField: 'userid',
    passwordField: 'pw',
    failureFlash: "invalid username or password!"
    },
        function(req, username, password, done) {
            console.log("Called local strategy");
            // check username and password
            loginManager.checkAccount(username, password)
            .then(() => done(null, username))
            .catch(() => done(null, false, req.flash('loginMessage', '*invalid username or password')));
        }
    )
);

/**
 * Serializing and deserializing are required for making local sessions, which is for checking if the user is logged in
 */
passport.serializeUser(function(user, done) {
    done(null, user);
 });

passport.deserializeUser(function(id, done) {
    done(null, id);
});

// set middleware to apply to all pages
router.use(function(req,res,next){
    res.locals.isLoggedIn = req.isAuthenticated();
    next();
})

// render the home page
router.get('/', function(req, res) {
    res.render("HomeView");
});

// render the login page
router.get('/login', function(req, res) {
    if (!req.isAuthenticated()) {
        res.render("LoginView", {message: req.flash('loginMessage')});
    } else {
        res.redirect('./accountView');
    }
});

// render the account page via login page
router.post('/accountView', 
    passport.authenticate('local', 
    { 
        successRedirect : '/accountView', // redirect to the account view
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true, // allow flash messages
        session: true
    })
);

// render the account page through other places
router.get('/accountView', function(req, res)  {
    if (req.isAuthenticated()) {
        res.render("AccountView", {userid: req.user});
    } else {
        res.redirect('./login');
    }
});

// render the incident submission form
router.get('/reportForm', function(req, res) {
    if (req.isAuthenticated()) {
        res.render("FormView", {postalCodeErr: req.flash('postalCodeErr')});
    } else {
        res.redirect('./login');
    }
});

// submit new incident
router.post('/submitNewIncident', function(req, res) {
    if (req.isAuthenticated()) {
        const incident = Object.assign({}, req.body, {'insName': req.user});
        // sanitize the incident
        if (typeof incident.respondentRequested == 'string')
            incident.respondentRequested = [incident.respondentRequested];
        checkPostalCode(incident.address).then((validPostalCode) => {
            if (validPostalCode) {
                socket.emit('createNewIncident', incident);
                socket.on('createNewIncidentDone', (recordID) => {
                    socket.removeAllListeners();
                    res.render("SubmissionResultView", {resultMessage : `Incident ID: ${recordID} has been submitted!`});
                });
            } else {
                req.flash('postalCodeErr', '*The postal code is not found within Singapore!');
                res.redirect('./reportForm');
            }
        })

    } else {
        res.redirect('./login');
    }
});

// render the update form
router.get('/updateForm', function(req, res) {
    if (req.isAuthenticated()) {
        res.render("UpdateFormView", {serverAddress: req.hostname});
    } else {
        res.redirect('./login');
    }
});

// submit incident update
router.post('/submitUpdate', function(req, res) {
    if (req.isAuthenticated()) {
        var update = req.body;
        // sanity checks for the update object
        if ( typeof update.respondentReporting == 'string')
            update.respondentReporting = [update.respondentReporting];
        update.updateName = req.user;
        if (!update.respondentRequested)
            update.respondentRequested = [];
        if ( typeof update.respondentRequested == 'string' )
            update.respondentRequested = [update.respondentRequested];
        console.log("From routes, /submitUpdate:");
        console.log(update);
        if (req.body.submit == 'Resolve')
        {
            console.log("emitting resolveIncident from routes.js");
            // logic for resolution
            socket.emit('resolveIncident', update);
            socket.on('incidentResolvedSuccessfully', () => {
                socket.removeAllListeners();
                res.render("SubmissionResultView", {resultMessage : `Incident ID: ${update.recordID} has been resolved!`});
            });
            socket.on('incidentCannotBeResolved', (recordID) => {
                socket.removeAllListeners();
                res.status(500);
                res.render("SubmissionResultView", {resultMessage : `Incident ID: ${recordID} unable to be resolved for some reason.`});
            });
        } else {
            // logic for submitting update
            console.log("emitting createUpdateIncident from routes.js");
            socket.emit('createUpdateIncident', update);
            socket.removeAllListeners();
            res.render("SubmissionResultView", {resultMessage : `Incident ID: ${update.recordID} has been updated!`});
        }
    } else {
        res.redirect('./login');
    }
});

router.post('/logout', function(req, res) {
    req.logout();
    res.redirect('./');
});

// render the map
router.get('/map', function(req, res) {
    res.render("MapView", {serverAddress: req.hostname});
});

// show useful info
router.get('/youDunnoCanGoAndDie', function(req, res) {
    res.render("InformationView.ejs");
});

/**
 * Check if a postal code is within Singapore. If not, resolve false.
 * @param {string} postalCode 
 */
function checkPostalCode(postalCode) {
    return new Promise(function(resolve, reject) {
        const linkPart1 =
		"https://developers.onemap.sg/commonapi/search?searchVal=";
        const linkPart2 = "&returnGeom=Y&getAddrDetails=Y";

        // API link for data
        var GeneralLink = linkPart1 + postalCode + linkPart2;
  
        // Retrieve from API
        request.get(GeneralLink, {json: true}, (err, res, body) => {
            if (body.results.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

module.exports = router;