var express = require('express');
var router = express.Router();
var checkAuthentication = require("../../controllers/AuthController.js").checkAuthentication;
var notifyController = require("../../controllers/freelance/notify/NotifyController.js");

/* Dashboard */
router.get('/', (req,res) => {
  res.render('freelance/notify/send', {req: req});
});


module.exports = router;
