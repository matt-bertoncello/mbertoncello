var express = require('express');
var router = express.Router();
var checkAuthentication = require("../../controllers/AuthController.js").checkAuthentication;
var ultimateController = require("../../controllers/freelance/UltimateController.js");

/* Dashboard */
router.get('/', checkAuthentication, (req,res) => {
  ultimateController.getUltimatesForUser(req.session.passport.user._id, function(games) { // retrieve all ultimate games
    res.render('freelance/ultimate/dashboard', {req: req, games: games});
  })
});

/* New Game */
router.get('/new', checkAuthentication, (req,res) => res.render('freelance/ultimate/newgame', {req: req}));

/* Go To Game */
router.get('/:game', checkAuthentication, (req,res) => {
  ultimateController.getUltimate(req.params.game, function(err, game){
    if (err) {  // If there was an error in retrieving the game from the params, redirect to Ultimate homepage.
      console.log(err);
      res.redirect('/freelance/ultimate');
    } else {
      res.render('freelance/ultimate/gameboard', {req: req, game: game});
    }
  })
});

module.exports = router;
