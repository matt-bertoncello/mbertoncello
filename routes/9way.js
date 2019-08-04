var express = require('express');
var router = express.Router();
var checkAuthentication = require("../controllers/AuthController.js").checkAuthentication;
var nineWayController = require("../controllers/9wayController.js");

/* Dashboard */
router.get('/', checkAuthentication, (req,res) => res.render('9way/dashboard', {req: req}));

/* New Game */
router.get('/new', checkAuthentication, (req,res) => res.render('9way/newgame', {req: req}));
router.post('/new/username', (req,res) => nineWayController.searchUsername(req, res));
router.post('/new/email', (req,res) => nineWayController.searchEmail(req, res));

/* Go To Game */
router.get('/:game', checkAuthentication, (req,res) => {
  nineWayController.get9Way(req.params.game, function(err, game){
    if (err) {  // If there was an error in retrieving the game from the params, redirect to 9Way homepage.
      console.log(err);
      res.redirect('/9way');
    } else {
      res.render('9way/gameboard', {req: req, game: game});
    }
  })
});

module.exports = router;
