// all middleware goes here
const middlewareObj = {};


// checks if the user is logged in first before doing the next thing they were supposed to do. 
// If the user is not logged in, they will be redirected back to the orginal login page.
middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  console.log("tak authenticate");
  req.session.redirectTo = req.originalUrl;
  req.flash("error", "You need to be logged in first"); // add a one-time message before redirect
  
};

module.exports = middlewareObj;