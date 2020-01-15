var express = require('express');
var router = express.Router();
var authController = require("../../controllers/AuthController.js");
var userController = require("../../controllers/UserController.js");
var notifyController = require("../../controllers/freelance/notify/NotifyController.js");

/* Dashboard */
router.get('/', (req,res) => {
  res.render('freelance/notify/send', {req: req});
});

/*
Confirm email/username and password are correct.
If correct, reply with auth token.
If error, handle and reply with error.
*/
router.get('/api/v1/login', function(req, res) {
  authController.attempt_login(req.headers.email, req.headers.password, function(err, user, loginError) {

    // If there was a login error:
    if (loginError && loginError.message) {
      console.log("[API LOGIN] "+loginError.message)
      res.statusCode = 401; // unauthorized
      res.json({'message': loginError.message});
      res.end();
    } else if (err || !user) {
      res.statusCode = 500; // server error.
      res.json({'message': 'error code: 101'});
      res.end();
    }
    // If login was successful:
    else {
      // create response.
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({'auth_token': user.auth_token});
      res.end();
      console.log('user logged-in via API: '+user._id)
    }

  });
});

router.get('/api/v1/user', function(req, res) {
  userController.getUserFromAuthToken(req.headers.auth_token, function(err, user) {
    // If there was a login error:
    if (err) {
      res.statusCode = 401; // unauthorized
      res.json({'message': err});
      res.end();
    } else if (!user) {
      res.statusCode = 500; // server error
      res.json({'message': 'error code: 101'});
      res.end();
    }
    // If login was successful:
    else {
      // create response.
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        'email': user.email,
        '_id': user._id,
      });
      res.end();
      console.log('retrieved user data via API: '+user._id);
    }
  });
});

module.exports = router;
