var express = require('express');
var router = express.Router();
var updateUser = require("../controllers/UserController.js").updateUser;

/* display notify page */
router.get('/', updateUser, function(req,res) { res.render('notify/notify', {req: req}); });

module.exports = router;
