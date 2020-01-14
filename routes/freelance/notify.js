var express = require('express');
var router = express.Router();
var authController = require("../../controllers/AuthController.js");
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
  authController.attempt_login(req.headers.email, req.headers.password, function(err, user) {

    // If there was a login error:
    if (err || !user) {
      res.statusCode = 400;
      res.end();
    }
    // If login was successful:
    else {
      // create response.
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({'auth_token': user.auth_token});
      res.end();
    }

    console.log('user logged-in via API: '+user._id)
  });
});

module.exports = router;
