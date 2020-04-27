var mongoose = require("mongoose");
var User = require("../../models/User");
var Ultimate = require("../../models/Ultimate/Ultimate");
var countController = require('../CountController');
var userController = require('../AuthController');

var ultimateController = {};

/*
First, increment the count of 9way games. Use the new count as the game's _id.
Create new 9way game and save to mongoose database.
*/
ultimateController.createGame = function(player1, player2, next) {
  countController.incrementCounter('ultimate', function(count){
    ultimate = new Ultimate({
      _id: count,
      player: [player1, player2]
    });
    ultimate.save(function(err) {
      if (err) console.log(err);
    });

    next(count);
  })
}

/*
Retrieve the Ultimate game with the corresponding gameId.
*/
ultimateController.getUltimate = function(id, next) {
  Ultimate.findOne({
    _id: id
  }, function(err, game) {
      if (!game) {  // if no game retrieved, provide error.
        err = "[ERROR] no Ultimate game found with _id: "+id;
      }

      next(err, game);
    }).populate('player', 'username');
}

/*
Retrive all 9way games that this user is a player
*/
ultimateController.getUltimatesForUser = function(id, next) {
  Ultimate.find({
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

/*
Get random mongoose game
*/
ultimateController.getRandomGame = function(next) {
  // Get the count of all 9ways
  Ultimate.countDocuments().exec(function (err, count) {

    // Get a random entry
    var random = Math.floor(Math.random() * count)

    // Again query all 9ways but only fetch one offset by our random #.
    Ultimate.findOne().skip(random).exec(
      function (err, result) {
        next(err, result)
      })
  })
}


module.exports = ultimateController;
