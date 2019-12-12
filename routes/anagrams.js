var express = require('express');
var router = express.Router();
var anagramController = require('../controllers/anagrams/AnagramController');

/* Go to anagrams dashboard. */
router.get('/', function(req,res) { res.render('anagrams/dashboard', {req: req, random_word: anagramController.getRandomWord()}); });

/* Search word in Oxford Dictionary and return results */
router.get('/:word', (req,res) => {
  anagramController.getDefinition(req.params.word, function(err, results) {
    res.render('anagrams/word', {req: req, word_data: results});
  });
});


module.exports = router;
