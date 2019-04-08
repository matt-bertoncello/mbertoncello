var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: "413980866333-jcjmqq9fj77n2eqt5sfio4v75re1bpr9.apps.googleusercontent.com",
    clientSecret: "wrrl2KE7NYDEYPKQlldhV8mP",
    callbackURL: process.env.ROOT_URL + '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ userid: profile.id }, { name: profile.displayName, userid: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

module.exports = passport;
