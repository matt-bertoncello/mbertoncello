var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require("../User");
var getter = require("./9wayGetter");
var setter = require("./9waySetter");
var countController = require('../../controllers/countController');
var userController = require('../../controllers/AuthController');
var EMPTY = -1;

var nineWaySchema = new mongoose.Schema({
  _id: {type: Number},
  winner: {type:mongoose.Types.ObjectId, ref:User},
  player: [{type:mongoose.Schema.Types.ObjectId, required:true, ref:User}],
  square: {type: [[Number]], default: new Array(9).fill(new Array(9).fill(EMPTY))},
  lastMove: {
    square: {type: Number, default: EMPTY},
    cell: {type: Number, default: EMPTY}
  },
  playerTurn: {type: Number, default: 0},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
});

nineWaySchema.pre('save', function(next) {
  this.updated = Date.now();
  next();
});

nineWaySchema.methods.EMPTY = function() {return EMPTY};

/*
Returns the owner (winner) of this square. Check for any 3 in a rows.
Param: squareId: number 0-8 (inclusive) referring to a square.
*/
nineWaySchema.methods.getOwner = function(squareId) {
  return getter.getOwner(this, squareId);
}

/*
Returns the index of all cells that are empty (0). If square is already owned, no indexes will be returned.
Param: squareId: number 0-8 (inclusive) referring to a square.
*/
nineWaySchema.methods.getEmptyCells = function(squareId) {
  return getter.getEmptyCells(this, squareId);
}

/*
Returns 0 if there is no winner yet. Returns the corresponding playerId if there is a winner.
*/
nineWaySchema.methods.getWinner = function() {
  return getter.getWinner(this);
}

/*
Returns 'valid' if the cell can be selected.
Returns 'invalid' if the cell is empty and cannot be selected.
Returns 'player1' if the cell is owned by player 1.
Returns 'player2' if the cell is owned by player 2.
*/
nineWaySchema.methods.getCellCSS = function(squareId, cellId, playerId) {
  return getter.getCellCSS(this, squareId, cellId, playerId);
}

/*
Returns 'player1' if the square is owned by player 1.
Returns 'player2' if the square is owned by player 2.
Returns '' if the square is not owned.
*/
nineWaySchema.methods.getSquareCSS = function(squareId) {
  return getter.getSquareCSS(this, squareId);
}

/*
Returns 'player1' if the game is won by player 1.
Returns 'player2' if the game is won by player 2.
Returns '' if the square is not owned.
*/
nineWaySchema.methods.getWinnerSquareCSS = function() {
  return getter.getWinnerSquareCSS(this);
}

/*
Returns the onclick function of a given call based on the getCellCSS result.
*/
nineWaySchema.methods.getCellEvents = function(squareId, cellId, playerId) {
  return getter.getCellEvents(this, squareId, cellId, playerId);
}

/*
Changes ownership of the cell from empty to owned by the player. The square must not be owned and the cell must be empty.
Param: cellId, the id of a cell to change ownership of. (must be between 0-8 inclusive).
Param: playerId, the id of a cell to change ownership of.
*/
nineWaySchema.methods.selectCell = function(squareId, cellId, playerId, next) {
  setter.selectCell(this, squareId, cellId, playerId, next);
}

/*
Given a player Id, retrieve the other player in the game.
Throw error if playerId is not a player in game.
*/
nineWaySchema.methods.getOpponent = function(playerId) {
  return getter.getOpponent(this, playerId);
}

module.exports = mongoose.model('9way', nineWaySchema);
