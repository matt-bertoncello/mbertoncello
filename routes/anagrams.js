var express = require('express');
var router = express.Router();

/* Retrieve all chat rooms for this user. */
router.get('/', function(req,res) { res.render('anagrams/dashboard', {req: req }); });

/* Go To ChatRoom */
router.get('/:word', (req,res) => { res.render('anagrams/dashboard', {req: req }); });


module.exports = router;
