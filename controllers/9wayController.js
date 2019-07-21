var mongoose = require("mongoose");
var User = require("../models/User");
var NineWay = require("../models/9way");
var searchController = require("./searchController");

var nineWayController = {};

/*
Create new 9 way game and save to mongoose database.
*/
createGame = function(req, res, player1, player2) {
  nineWay = new NineWay({
    player1: player1,
    player2: player2,
    playerTurn: player1
  });
  nineWay.save(function(err) {
    if (err) console.log(err);
    return nineWay
  });
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
Check if there is a winner
*/

module.exports = nineWayController;
