var nineWay = require('./9way');

var getter = {};

/*
Returns the owner (winner) of nineWay square. Check for any 3 in a rows.
Param: squareId: number 0-8 (inclusive) referring to a square.
*/
getter.getOwner = function(nineWay, squareId) {
  // Check for correct parameters
  if (squareId<0 || squareId >8) {
    throw '[ERROR] squareId must be betwee 0-8 inclusively. squareId provided: '+square;
  }
  if (nineWay.square[squareId][0]!=nineWay.EMPTY()&& nineWay.square[squareId][0]===nineWay.square[squareId][1] && nineWay.square[squareId][0]===nineWay.square[squareId][2]) { // Horizontal top row
    return nineWay.square[squareId][0];
  } else if (nineWay.square[squareId][3]!=nineWay.EMPTY() && nineWay.square[squareId][3]===nineWay.square[squareId][4] && nineWay.square[squareId][3]===nineWay.square[squareId][5]) { // Horizontal middle row
    return nineWay.square[squareId][3];
  } else if (nineWay.square[squareId][6]!=nineWay.EMPTY() && nineWay.square[squareId][6]===nineWay.square[squareId][7] && nineWay.square[squareId][6]===nineWay.square[squareId][8]) { // Horizontal bottom row
    return nineWay.square[squareId][6];
  } else if (nineWay.square[squareId][0]!=nineWay.EMPTY() && nineWay.square[squareId][0]===nineWay.square[squareId][3] && nineWay.square[squareId][0]===nineWay.square[squareId][6]) { // Vertical left row
    return nineWay.square[squareId][0];
  } else if (nineWay.square[squareId][1]!=nineWay.EMPTY() && nineWay.square[squareId][1]===nineWay.square[squareId][4] && nineWay.square[squareId][1]===nineWay.square[squareId][7]) { // Vertical middle row
    return nineWay.square[squareId][1];
  } else if (nineWay.square[squareId][2]!=nineWay.EMPTY() && nineWay.square[squareId][2]===nineWay.square[squareId][5] && nineWay.square[squareId][2]===nineWay.square[squareId][8]) { // Vertical middle row
    return nineWay.square[squareId][2];
  } else if (nineWay.square[squareId][0]!=nineWay.EMPTY() && nineWay.square[squareId][0]===nineWay.square[squareId][4] && nineWay.square[squareId][0]===nineWay.square[squareId][8]) { // Diagonal top-left -> bottom-right
    return nineWay.square[squareId][0];
  } else if (nineWay.square[squareId][6]!=nineWay.EMPTY() && nineWay.square[squareId][6]===nineWay.square[squareId][4] && nineWay.square[squareId][6]===nineWay.square[squareId][2]) { // Diagonal bottom-left -> top-right
    return nineWay.square[squareId][6];
  } else {
    return nineWay.EMPTY();
  }
}

/*
Returns the index of all cells that are empty (0). If square is already owned, no indexes will be returned.
Param: squareId: number 0-8 (inclusive) referring to a square.
*/
getter.getEmptyCells = function(nineWay, squareId) {
  // Check for correct parameters
  if (squareId<0 || squareId >8) {
    throw '[ERROR] squareId must be betwee 0-8 inclusively. squareId provided: '+squareId;
  }
  // if nineWay square is already owned, return no square.
  if (nineWay.getOwner(squareId) != nineWay.EMPTY()) {
    return []
  }
  // else, return the index of all cells that are empty (0).
  var emptyCells= [];
  for (var i=0; i<9; i++) {
    if (nineWay.square[squareId][i] === nineWay.EMPTY()) {
      emptyCells.push(i);
    }
  }
  return emptyCells;
}

/*
Returns 0 if there is no winner yet. Returns the corresponding playerId if there is a winner.
*/
getter.getWinner = function(nineWay) {
  if (nineWay.getOwner(0)!=nineWay.EMPTY() && nineWay.getOwner(0)===nineWay.getOwner(1) && nineWay.getOwner(0)===nineWay.getOwner(2)) { // Horizontal top row
    return nineWay.getOwner(0);
  } else if (nineWay.getOwner(3)!=nineWay.EMPTY() && nineWay.getOwner(3)===nineWay.getOwner(4) && nineWay.getOwner(3)===nineWay.getOwner(5)) { // Horizontal middle row
    return nineWay.getOwner(3);
  } else if (nineWay.getOwner(6)!=nineWay.EMPTY() && nineWay.getOwner(6)===nineWay.getOwner(7) && nineWay.getOwner(6)===nineWay.getOwner(8)) { // Horizontal bottom row
    return nineWay.getOwner(6);
  } else if (nineWay.getOwner(0)!=nineWay.EMPTY() && nineWay.getOwner(0)===nineWay.getOwner(3) && nineWay.getOwner(0)===nineWay.getOwner(6)) { // Vertical left row
    return nineWay.getOwner(0);
  } else if (nineWay.getOwner(1)!=nineWay.EMPTY() && nineWay.getOwner(1)===nineWay.getOwner(4) && nineWay.getOwner(1)===nineWay.getOwner(7)) { // Vertical middle row
    return nineWay.getOwner(1);
  } else if (nineWay.getOwner(2)!=nineWay.EMPTY() && nineWay.getOwner(2)===nineWay.getOwner(5) && nineWay.getOwner(2)===nineWay.getOwner(8)) { // Vertical middle row
    return nineWay.getOwner(2);
  } else if (nineWay.getOwner(0)!=nineWay.EMPTY() && nineWay.getOwner(0)===nineWay.getOwner(4) && nineWay.getOwner(0)===nineWay.getOwner(8)) { // Diagonal top-left -> bottom-right
    return nineWay.getOwner(0);
  } else if (nineWay.getOwner(6)!=nineWay.EMPTY() && nineWay.getOwner(6)===nineWay.getOwner(4) && nineWay.getOwner(6)===nineWay.getOwner(2)) { // Diagonal bottom-left -> top-right
    return nineWay.getOwner(6);
  } else {
    return nineWay.EMPTY();
  }
}

module.exports = getter;
