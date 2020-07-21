var express = require('express');
var router = express.Router();
var updateUser = require("../controllers/UserController.js").updateUser;

router.get('/', updateUser, function(req,res) { res.render('bwt/bwt', {req: req}); });

module.exports = router;
