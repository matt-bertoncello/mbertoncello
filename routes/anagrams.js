var express = require('express');
var router = express.Router();
var anagramController = require('../controllers/anagrams/AnagramController');

/* Retrieve all chat rooms for this user. */
router.get('/', function(req,res) { res.render('anagrams/dashboard', {req: req, random_word: anagramController.getRandomWord()}); });

/* Go To ChatRoom */
router.get('/:word', (req,res) => { res.render('anagrams/dashboard', {req: req }); });


module.exports = router;
