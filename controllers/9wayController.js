var mongoose = require("mongoose");
var User = require("../models/User");
var NineWay = require("../models/9way/9way");
var searchController = require("./searchController");
var countController = require('./countController');

var nineWayController = {};

/*
First, increment the count of 9way games. Use the new count as the game's _id.
Create new 9way game and save to mongoose database.
*/
createGame = function(req, res, player1, player2) {
  countController.incrementCounter('9way', function(count){
    nineWay = new NineWay({
      _id: count,
      player: [player1, player2]
    });
    nineWay.save(function(err) {
      if (err) console.log(err);
    });

    res.redirect('/9Way/'+count); // redirect to newly created game.
  })
}

/*
Create new game based on the user restrieved from 'searchController.searchEmail'
*/
nineWayController.searchEmail = function(req, res) {
  searchController.searchEmail(req, res, function(req,res,opponent){
    createGame(req, res, req.session.passport.user, opponent);
  });
}

/*
Create new game based on the user restrieved from 'searchController.searchUsername'
*/
nineWayController.searchUsername = function(req, res) {
  searchController.searchUsername(req, res, function(req,res,opponent){
    createGame(req, res, req.session.passport.user, opponent);
  });
}

/*
Retrieve the 9Way game with the corresponding gameId.
*/
nineWayController.get9Way = function(id, next) {
  NineWay.findOne({
    '_id': id
  }, function(err, game) {
      if (err) {
        throw err;
      }
      if (!game) {  // if no game retrieved, provide error.
        err = "[ERROR] no 9Way game found with _id: "+id;
      }
      next(err, game)
    });
}

module.exports = nineWayController;
