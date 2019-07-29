var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require("../User");
var getter = require("./9wayGetter");
var setter = require("./9waySetter");
var countController = require('../../controllers/countController');
var EMPTY = -1;

var nineWaySchema = new mongoose.Schema({
  _id: {type: Number},
  winner: {type:mongoose.Types.ObjectId, ref:User},
  player: [{type:mongoose.Schema.Types.ObjectId, required:true, ref:User}],
  square: {type: [[Number]], default: new Array(9).fill(new Array(9).fill(EMPTY))},
  lastMove: {type: Number, default: -1},
  playerTurn: {type: Number, default: 0}
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
Changes ownership of the cell from empty to owned by the player. The square must not be owned and the cell must be empty.
Param: cellId, the id of a cell to change ownership of. (must be between 0-8 inclusive).
Param: playerId, the id of a cell to change ownership of.
*/
nineWaySchema.methods.selectCell = function(squareId, cellId, playerId) {
  setter.selectCell(this, squareId, cellId, playerId);
}

module.exports = mongoose.model('9way', nineWaySchema);
