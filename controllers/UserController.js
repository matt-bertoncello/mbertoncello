var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("../models/User");

var userController = {};

userController.postLoginRedirect = null;

/*
Updates the User in req
*/
userController.updateUser = function(req,res,next) {
  if (req.session.passport && req.session.passport.user) {
    userController.getUser(req.session.passport.user._id, function(err, user) {
      if (err) { throw err; }
      req.user = user;
      next();
    });
  } else {
    next();
  }
}

/*
If username is not valid or unique, redirect to user update page.
*/
userController.checkUsername = function(req, res, next) {
  exceptions = ["/user"];

  if (req.user.username || exceptions.includes(req.originalUrl)) {
    next();
  } else {
    userController.postLoginRedirect = req.originalUrl;
    console.log('[ERROR] user does not have unique username. Post-authentication redirect: '+userController.postLoginRedirect);
    res.redirect("/user");
  }
}

// Get user by ID.
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

/*
Get user from username
*/
userController.getUserFromUsername = function(username, next) {
  User.findOne({ username: username}, function(err, user) {
    if (err) { throw err; }
    if (!user) {
      err = "[ERROR] no user found with username: "+username;
    }
    next(err, user);
  });
}

/*
Get user from email
*/
userController.getUserFromEmail = function(email, next) {
  User.findOne({ email: email}, function(err, user) {
    if (err) { throw err; }
    if (!user) {
      err = "[ERROR] no user found with email: "+email;
    }
    next(err, user);
  });
}

module.exports = userController;
