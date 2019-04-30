var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/User');
require('dotenv').config();

passport.serializeUser(function (user, fn) {
  fn(null, user);
});

passport.deserializeUser(function (id, fn) {
  User.findOne({twitter_id: id.doc}, function (err, user) {
    fn(err, user);
  });
});

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CLIENT_ID,
    consumerSecret: process.env.TWITTER_CLIENT_SECRET,
    callbackURL: "/auth/twitter/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName, userid: profile.id}, function(err, user) {
      if (err) {
        console.log(err);
        return done(err);
      }
      done(null, user);
    });
  }
));

module.exports = passport;
