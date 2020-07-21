var express = require('express');
var router = express.Router();
var updateUser = require("../controllers/UserController.js").updateUser;

/* display about page */
router.get('/', updateUser, function(req,res) { res.render('about/about', {req: req}); });

module.exports = router;
