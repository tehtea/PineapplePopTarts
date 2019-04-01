const   express = require('express'),
        router = express.Router(),
        passport = require('passport'),
        localStrategy = require('passport-local').Strategy;
        var loginManager = require('./loginManager'),
        session = require('express-session'); // library for Sessions, which is used to store user data
        var io = require('socket.io-client');
        const databaseManager = require('./DatabaseManager');

var socket = io.connect("http://localhost:5000/", {
    reconnection: true
});

// passportJS middlewares
router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000, secure: false }
}));

router.use(passport.initialize());
router.use(passport.session());

// tell passport which strategy to use (required for login)
passport.use('local', new localStrategy(
    {
    passReqToCallback : true,
    usernameField: 'userid',
    passwordField: 'pw',
    },
        function(req, username, password, done) {
            console.log("Called local strategy");
            // check username and password
            loginManager.checkAccount(username, password)
            .then(() => done(null, username))
            .catch(() => done(null, false));
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
        res.render("LoginView");
    } else {
        res.redirect('./accountView');
    }
});

// render the account page via login page
router.post('/accountView', passport.authenticate('local', { failureRedirect: '/login', session: true}), function(req, res)  {
    res.render("AccountView", {userid: req.body.userid, isLoggedIn: req.isAuthenticated()});
});

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
        res.render("FormView");
    } else {
        res.redirect('./login');
    }
});

// submit new incident
router.post('/submitNewIncident', function(req, res) {
    if (req.isAuthenticated()) {
        const incident = Object.assign({}, req.body, {'insName': req.user});
        socket.emit('createNewIncident', incident);
        res.status(200).send("Incident has been submitted!");
    } else {
        res.redirect('./login');
    }
});

// render the update form
router.get('/updateForm', function(req, res) {
    if (req.isAuthenticated()) {
        res.render("UpdateFormView");
    } else {
        res.redirect('./login');
    }
});

// submit incident update
router.post('/submitUpdate', function(req, res) {
    if (req.isAuthenticated()) {
        // this is not the actual thing to do
        console.log(req.body)
        // socket.emit('createUpdateIncident', incident);
        res.status(200).send("Successfully updated the incident!");
    } else {
        res.redirect('./login');
    }
});

// show useful info
router.get('/youDunnoCanGoAndDie', function(req, res) {
    res.render("InformationView.ejs");
})

databaseManager.runDatabase();

module.exports = router;