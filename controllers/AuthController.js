var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");

var userController = {};

/*
Redirect to login page if user isn't logged in.
Load User into req.user.
If user does not have a unique username, make user create username.
*/
userController.checkAuthentication = function(req,res,next){
  /* If session has never been initialised on client side, also redirect to login page */
  if (req.session.passport && req.session.passport.user) {
    userController.getUser(req.session.passport.user._id, function(err, user) {
      if (err) {throw err;}
      req.user = user;
      next();
    });
  } else {
    userController.postLoginRedirect = req.originalUrl;
    console.log('[ERROR] user is not logged-in. Redirect to login page. Post-authentication redirect: '+userController.postLoginRedirect);
    res.redirect("/login");
  }
}

// Restrict access to root page
userController.home = function(req, res) {
  res.redirect('/');
};

// Go to registration page
userController.register = function(req, res) {
  res.redirect('/register');
};

// Post registration
userController.doRegister = function(req, res) {
  User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
    if (err) {
      console.log('[ERROR] user register unsuccessful')
      res.redirect('/register');
    }

    passport.authenticate('local')(req, res, function () {
      console.log('[INFO] user register successful')
      res.redirect('/user');
    });
  });
};

// Go to login page
userController.postLogin = function(req, res) {
  res.render('login');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    console.log('[INFO] user login successful');
    userController.postAuthentication(req, res);
  });
};

/* Once user has been authenticated, run this function */
userController.postAuthentication = function(req, res) {
  /* If user came from 'checkAuthentication' middleware, return to initial page */
  if (userController.postLoginRedirect) {
    redirect = userController.postLoginRedirect;
    delete userController.postLoginRedirect;
    console.log("[REDIRECT] redirected to: "+redirect)
    res.redirect(redirect);
  } else {
    res.redirect('/user');
  }
}

// logout
userController.logout = function(req, res) {
  console.log('[INFO] user logout')
  req.logout();
  res.redirect('/');
};

userController.getUser = function(id, next) {
  User.findOne({
    _id: id
  }, function(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      err = "[ERROR] no user found with _id: "+id;
    }
    next(err, user);
  });
}

// Retrieve user by Id, then update username. Return error.
userController.updateUsername = function(id, username, next) {
  userController.getUser(id, function(err, user) {
    if (err) { throw err; }
    user.username = username;
    user.save(function(err) {
      next(err);
    })
  })
}

module.exports = userController;
