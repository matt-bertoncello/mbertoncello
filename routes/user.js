var express = require('express');
var router = express.Router();
var checkAuthentication = require("../controllers/AuthController.js").checkAuthentication;

router.get('/', checkAuthentication, function(req,res){
  res.render('user', {req: req});
});

module.exports = router;
