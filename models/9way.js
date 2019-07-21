var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require("./User");
var nineWaySquare = require("../classes/9WaySquare");

var nineWaySchema = new mongoose.Schema({
  winner: {type:mongoose.Types.ObjectId, ref:User},
  player1: {type:mongoose.Types.ObjectId, required:true, ref:User},
  player2: {type:mongoose.Types.ObjectId, required:true, ref:User},
  square: {type: [[Number]], default: new Array(9).fill(new Array(9).fill(0))},
  lastMove: {type: Number, default: -1},
  playerTurn: {type:mongoose.Types.ObjectId, required:true, ref:User}
});

/*
Returns the owner (winner) of this square. Check for any 3 in a rows.
Param: squareId: number 0-8 (inclusive) referring to a square.
*/
nineWaySchema.methods.getOwner = function(squareId) {
  // Check for correct parameters
  if (squareId<0 || squareId >8) {
    throw '[ERROR] squareId must be betwee 0-8 inclusively. squareId provided: '+square;
  }
  if (this.square[squareId][0]!=0 && this.square[squareId][0]===this.square[squareId][1] && this.square[squareId][0]===this.square[squareId][2]) { // Horizontal top row
    return this.square[squareId][0];
  } else if (this.square[squareId][3]!=0 && this.square[squareId][3]===this.square[squareId][4] && this.square[squareId][3]===this.square[squareId][5]) { // Horizontal middle row
    return this.square[squareId][3];
  } else if (this.square[squareId][6]!=0 && this.square[squareId][6]===this.square[squareId][7] && this.square[squareId][6]===this.square[squareId][8]) { // Horizontal bottom row
    return this.square[squareId][6];
  } else if (this.square[squareId][0]!=0 && this.square[squareId][0]===this.square[squareId][3] && this.square[squareId][0]===this.square[squareId][6]) { // Vertical left row
    return this.square[squareId][0];
  } else if (this.square[squareId][1]!=0 && this.square[squareId][1]===this.square[squareId][4] && this.square[squareId][1]===this.square[squareId][7]) { // Vertical middle row
    return this.square[squareId][1];
  } else if (this.square[squareId][2]!=0 && this.square[squareId][2]===this.square[squareId][5] && this.square[squareId][2]===this.square[squareId][8]) { // Vertical middle row
    return this.square[squareId][2];
  } else if (this.square[squareId][0]!=0 && this.square[squareId][0]===this.square[squareId][4] && this.square[squareId][0]===this.square[squareId][8]) { // Diagonal top-left -> bottom-right
    return this.square[squareId][0];
  } else if (this.square[squareId][6]!=0 && this.square[squareId][6]===this.square[squareId][4] && this.square[squareId][6]===this.square[squareId][2]) { // Diagonal bottom-left -> top-right
    return this.square[squareId][6];
  } else {
    return 0;
  }
}

/*
Returns the index of all cells that are empty (0). If square is already owned, no indexes will be returned.
Param: squareId: number 0-8 (inclusive) referring to a square.
*/
nineWaySchema.methods.getEmptyCells = function(squareId) {
  // Check for correct parameters
  if (squareId<0 || squareId >8) {
    throw '[ERROR] squareId must be betwee 0-8 inclusively. squareId provided: '+squareId;
  }
  // if this square is already owned, return no square.
  if (this.getOwner(squareId) != 0) {
    return []
  }
  // else, return the index of all cells that are empty (0).
  var emptyCells= [];
  for (var i=0; i<9; i++) {
    if (this.square[squareId][i] === 0) {
      emptyCells.push(i);
    }
  }
  return emptyCells;
}

/*
Returns 0 if there is no winner yet. Returns the corresponding playerId if there is a winner.
*/
nineWaySchema.methods.getWinner = function() {
  if (this.getOwner(0)!=0 && this.getOwner(0)===this.getOwner(1) && this.getOwner(0)===this.getOwner(2)) { // Horizontal top row
    return this.getOwner(0);
  } else if (this.getOwner(3)!=0 && this.getOwner(3)===this.getOwner(4) && this.getOwner(3)===this.getOwner(5)) { // Horizontal middle row
    return this.getOwner(3);
  } else if (this.getOwner(6)!=0 && this.getOwner(6)===this.getOwner(7) && this.getOwner(6)===this.getOwner(8)) { // Horizontal bottom row
    return this.getOwner(6);
  } else if (this.getOwner(0)!=0 && this.getOwner(0)===this.getOwner(3) && this.getOwner(0)===this.getOwner(6)) { // Vertical left row
    return this.getOwner(0);
  } else if (this.getOwner(1)!=0 && this.getOwner(1)===this.getOwner(4) && this.getOwner(1)===this.getOwner(7)) { // Vertical middle row
    return this.getOwner(1);
  } else if (this.getOwner(2)!=0 && this.getOwner(2)===this.getOwner(5) && this.getOwner(2)===this.getOwner(8)) { // Vertical middle row
    return this.getOwner(2);
  } else if (this.getOwner(0)!=0 && this.getOwner(0)===this.getOwner(4) && this.getOwner(0)===this.getOwner(8)) { // Diagonal top-left -> bottom-right
    return this.getOwner(0);
  } else if (this.getOwner(6)!=0 && this.getOwner(6)===this.getOwner(4) && this.getOwner(6)===this.getOwner(2)) { // Diagonal bottom-left -> top-right
    return this.getOwner(6);
  } else {
    return 0;
  }
}

module.exports = mongoose.model('9way', nineWaySchema);
