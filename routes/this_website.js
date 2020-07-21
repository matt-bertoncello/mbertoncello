var express = require('express');
var router = express.Router();
var updateUser = require("../controllers/UserController.js").updateUser;

/* display this website page */
router.get('/', updateUser, function(req,res) { res.render('this_website/website', {req: req}); });

module.exports = router;
