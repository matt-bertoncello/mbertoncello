var express = require('express');
var router = express.Router();
var passportFacebook = require('../auth/facebook');
var passportTwitter = require('../auth/twitter');
var passportGoogle = require('../auth/google');
var passportGitHub = require('../auth/github');

/* LOGOUT ROUTER */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/* FACEBOOK ROUTER */
router.get('/facebook',
  passportFacebook.authenticate('facebook'));

router.get('/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('[INFO] user logged-in via facebook: '+req.session.passport.user.email);
    res.redirect('/user');
  });

/* TWITTER ROUTER */
router.get('/twitter',
  passportTwitter.authenticate('twitter'));

router.get('/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('[INFO] user logged-in via twitter: '+req.session.passport.user.email);
    res.redirect('/user');
  });

/* GOOGLE ROUTER */
router.get('/google',
  passportGoogle.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login','https://www.googleapis.com/auth/userinfo.email'] }));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('[INFO] user logged-in via google: '+req.session.passport.user.email);
    res.redirect('/user');
  });

/* GITHUB ROUTER */
router.get('/github',
  passportGitHub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback',
  passportGitHub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('[INFO] user logged-in via github: '+req.session.passport.user.email);
    res.redirect('/user');
  });

module.exports = router;
