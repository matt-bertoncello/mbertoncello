var express = require('express');
var router = express.Router();
var anagramController = require('../../controllers/uni/anagrams/AnagramController');

/* Go to anagrams dashboard. */
router.get('/', function(req,res) { res.render('uni/anagrams/dashboard', {req: req, random_word: anagramController.getRandomWord()}); });

/* Search word in Oxford Dictionary and return results */
router.get('/:word', (req,res) => {
  var anagrams = anagramController.getPerfectAnagram(req.params.word.toLowerCase());
  res.render('uni/anagrams/word', {req: req, word: req.params.word.toLowerCase(), anagrams: anagrams});
});


module.exports = router;
