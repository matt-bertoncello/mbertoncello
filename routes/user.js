var express = require('express');
var router = express.Router();
var checkAuthentication = require("../controllers/AuthController.js").checkAuthentication;

/* View user details */
router.get('/', checkAuthentication, function(req,res) {
  res.render('user', {req: req});
});

/* Change name */

/* Change username */

module.exports = router;
