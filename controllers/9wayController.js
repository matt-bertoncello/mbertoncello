var mongoose = require("mongoose");
var User = require("../models/User");
var NineWay = require("../models/9Way/9way");
var countController = require('./countController');

var nineWayController = {};

/*
First, increment the count of 9way games. Use the new count as the game's _id.
Create new 9way game and save to mongoose database.
*/
nineWayController.createGame = function(player1, player2, next) {
  countController.incrementCounter('9way', function(count){
    nineWay = new NineWay({
      _id: count,
      player: [player1, player2]
    });
    nineWay.save(function(err) {
      if (err) console.log(err);
    });

    next(count);
  })
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
