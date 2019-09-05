var mongoose = require("mongoose");
var User = require("../models/User");
var NineWay = require("../models/9Way/9way");
var countController = require('./countController');
var userController = require('./AuthController');

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
    _id: id
  }, function(err, game) {
      if (!game) {  // if no game retrieved, provide error.
        err = "[ERROR] no 9Way game found with _id: "+id;
      }

      next(err, game);
    }).populate('player', 'username');
}

/*
Retrive all 9way games that this user is a player
*/
nineWayController.get9WaysForUser = function(id, next) {
  NineWay.find({
    player: id
  }, function(err, games) {
    if (err) {
      throw err;
    }

    var sortedGames = {
      won: [],
      lost: [],
      yourTurn: [],
      waiting: []
    }

    for (var i=0; i<games.length; i++) {
      /* if game has finished */
      if (games[i].getWinner() != games[i].EMPTY()) {
        if (games[i].getWinner() === -2) {  // no moves are available. It is a draw.
          sortedGames.lost.push(games[i]);
        } else if (games[i].player[games[i].getWinner()]._id.toString() === id.toString()) { // if player won the game`
          sortedGames.won.push(games[i]);
        } else if (games[i].player[games[i].getWinner()]._id.toString() != id.toString()) { // if player did not win the game
          sortedGames.lost.push(games[i]);
        }
      } else if (games[i].player[games[i].playerTurn]._id.toString() === id.toString()) { // if it is player's turn
        sortedGames.yourTurn.push(games[i]);
      } else if (games[i].player[games[i].playerTurn]._id.toString() != id.toString()) { // if it is not player's turn
        sortedGames.waiting.push(games[i]);
      }
    }

    next(sortedGames);
  }).populate('player', 'username');
}


module.exports = nineWayController;
