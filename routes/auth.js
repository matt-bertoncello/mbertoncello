var express = require('express');
var router = express.Router();
var passportFacebook = require('../controllers/auth/facebook');
var passportTwitter = require('../controllers/auth/twitter');
var passportGoogle = require('../controllers/auth/google');
var passportGitHub = require('../controllers/auth/github');
var postAuthentication = require("../controllers/AuthController.js").postAuthentication;

/* LOGOUT ROUTER */
router.get('/logout', function(req, res){
  req.logout();
  delete req.session.passport;  // stores user._id
  delete req.user;  // stores user
  res.redirect('/');
});

/* FACEBOOK ROUTER */
router.get('/facebook',
  passportFacebook.authenticate('facebook', { scope : ['email'] }));

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('[INFO] user logged-in via facebook: '+req.session.passport.user._id);
    req.session.passport.loginProvider = "facebook";
    postAuthentication(req, res);
  });

/* TWITTER ROUTER */
router.get('/twitter',
  passportTwitter.authenticate('twitter', { scope: ['include_email=true']}));

router.get('/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('[INFO] user logged-in via twitter: '+req.session.passport.user._id);
    req.session.passport.loginProvider = "twitter";
    postAuthentication(req, res);
  });

/* GOOGLE ROUTER */
router.get('/google',
  passportGoogle.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.email'] }));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('[INFO] user logged-in via google: '+req.session.passport.user._id);
    req.session.passport.loginProvider = "google";
    postAuthentication(req, res);
  });

/* GITHUB ROUTER */
router.get('/github',
  passportGitHub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
  passportGitHub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('[INFO] user logged-in via github: '+req.session.passport.user._id);
    req.session.passport.loginProvider = "github";
    postAuthentication(req, res);
  });

module.exports = router;
