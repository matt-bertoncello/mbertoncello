var express = require('express');
var router = express.Router();
var authController = require("../controllers/AuthController.js");
var checkAuthentication = authController.checkAuthentication;
var hermesController = require("../controllers/HermesController.js");

/* View user details */
router.get('/', checkAuthentication, function(req,res) {
  res.render('hermes/dashboard', {req: req});
});

/* New ChatRoom */
router.get('/new', checkAuthentication, (req,res) => res.render('hermes/newchat', {req: req}));

/* Go To ChatRoom */
router.get('/:username', checkAuthentication, (req,res) => {
  authController.getUserFromUsername(req.params.username, function(err, friend) {
    if (err) { // if user doesn't exist, redirect to hermes homepage
      console.log(err);
      res.redirect('/hermes');
    } else {  // If user does exist, attempt to get chatroom
      hermesController.getChat(req.user._id, friend._id, function(err, chatRoom) {
        if (err) {  // If there was an error in retrieving the chatroom from the params, redirect to Hermes homepage.
          console.log(err);
          res.redirect('/hermes');
        } else {
          res.render('hermes/chatroom', {req: req, chatRoom: chatRoom});
        }
      });
    }
  });
});


module.exports = router;
