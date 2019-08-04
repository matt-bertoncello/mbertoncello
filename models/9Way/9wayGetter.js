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

/*
Return css style of each cell. pleyer1, player2, invalid and valid.
*/
getter.getCellCSS = function(nineWay, squareId, cellId, playerId) {
  /* Check if cell is owned by a player */
  if (nineWay.square[squareId][cellId] == 0) { // If cell is owned by player1
    return "player1"
  } else if (nineWay.square[squareId][cellId] == 1) { // If cell is owned by player2
    return "player2"
  }

  /* If cell is not owned, and it is not the player's turn */
  if (nineWay.player[nineWay.playerTurn].toString() != playerId) {  // It is not this player's turn.
    return "invalid"
  }

  /* If the cell is not owned, and it is the player's turn */
  if (nineWay.getWinner() != nineWay.EMPTY() || nineWay.getOwner(squareId) != nineWay.EMPTY()) {  // If the game is won, or this square is owned, this cell isn't valid.
    return "invalid";
  } else if (nineWay.lastMove.square == nineWay.EMPTY()) {  // If it is the first move of the game, every cell is valid.
    return "valid";
  } else if (nineWay.getOwner(nineWay.lastMove.cell) != nineWay.EMPTY()) {  // if the square relating to the last cell is owned, this cell is valid
    return "valid";
  } else if (nineWay.lastMove.cell == squareId) {  // All cell's are valid in the square relating to the last cell.
    return "valid";
  }
}

/* HTML text which defines the onclick, onmouseover and onmouseout events when user interacts with this cell */
getter.getCellEvents = function(nineWay, squareId, cellId, playerId) {
  // Events only occur on 'valid' cells.
  if (nineWay.getCellCSS(squareId, cellId, playerId) === "valid") {
    // Determine if user is player 1 or player 2
    if (nineWay.playerTurn === 0 && nineWay.player[0].toString() === playerId.toString()) { // If cell is owned by player1
      var player = "player1";
    } else if (nineWay.playerTurn === 1 && nineWay.player[1].toString() === playerId.toString()) { // If cell is owned by player2
      var player = "player2"
    } else {
      throw "[ERROR] user must be a player in the game";
    }

    return "onclick=POST("+squareId+","+cellId+") onmouseover=this.classList.add('"+player+"') onmouseout=this.classList.remove('"+player+"')";
  } else {
    return "";
  }
}

module.exports = getter;
