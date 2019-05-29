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

/* Game */
router.get('/:game', checkAuthentication, (req,res) => {
  console.log(req.params.game);
  res.render('9way/gameboard', {req: req});
});

module.exports = router;
