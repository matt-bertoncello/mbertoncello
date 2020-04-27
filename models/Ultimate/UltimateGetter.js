var getter = {};

/*
Returns the owner (winner) of ultimate square. Check for any 3 in a rows.
Param: squareId: number 0-8 (inclusive) referring to a square.
*/
getter.getOwner = function(ultimate, squareId) {
  // Check for correct parameters
  if (squareId<0 || squareId >8) {
    throw '[ERROR] squareId must be betwee 0-8 inclusively. squareId provided: '+square;
  }
  if (ultimate.square[squareId][0]!=ultimate.EMPTY()&& ultimate.square[squareId][0]===ultimate.square[squareId][1] && ultimate.square[squareId][0]===ultimate.square[squareId][2]) { // Horizontal top row
    return ultimate.square[squareId][0];
  } else if (ultimate.square[squareId][3]!=ultimate.EMPTY() && ultimate.square[squareId][3]===ultimate.square[squareId][4] && ultimate.square[squareId][3]===ultimate.square[squareId][5]) { // Horizontal middle row
    return ultimate.square[squareId][3];
  } else if (ultimate.square[squareId][6]!=ultimate.EMPTY() && ultimate.square[squareId][6]===ultimate.square[squareId][7] && ultimate.square[squareId][6]===ultimate.square[squareId][8]) { // Horizontal bottom row
    return ultimate.square[squareId][6];
  } else if (ultimate.square[squareId][0]!=ultimate.EMPTY() && ultimate.square[squareId][0]===ultimate.square[squareId][3] && ultimate.square[squareId][0]===ultimate.square[squareId][6]) { // Vertical left row
    return ultimate.square[squareId][0];
  } else if (ultimate.square[squareId][1]!=ultimate.EMPTY() && ultimate.square[squareId][1]===ultimate.square[squareId][4] && ultimate.square[squareId][1]===ultimate.square[squareId][7]) { // Vertical middle row
    return ultimate.square[squareId][1];
  } else if (ultimate.square[squareId][2]!=ultimate.EMPTY() && ultimate.square[squareId][2]===ultimate.square[squareId][5] && ultimate.square[squareId][2]===ultimate.square[squareId][8]) { // Vertical middle row
    return ultimate.square[squareId][2];
  } else if (ultimate.square[squareId][0]!=ultimate.EMPTY() && ultimate.square[squareId][0]===ultimate.square[squareId][4] && ultimate.square[squareId][0]===ultimate.square[squareId][8]) { // Diagonal top-left -> bottom-right
    return ultimate.square[squareId][0];
  } else if (ultimate.square[squareId][6]!=ultimate.EMPTY() && ultimate.square[squareId][6]===ultimate.square[squareId][4] && ultimate.square[squareId][6]===ultimate.square[squareId][2]) { // Diagonal bottom-left -> top-right
    return ultimate.square[squareId][6];
  } else {
    return ultimate.EMPTY();
  }
}

/*
Returns the index of all cells that are empty (0). If square is already owned, no indexes will be returned.
Param: squareId: number 0-8 (inclusive) referring to a square.
*/
getter.getEmptyCells = function(ultimate, squareId) {
  // Check for correct parameters
  if (squareId<0 || squareId >8) {
    throw '[ERROR] squareId must be betwee 0-8 inclusively. squareId provided: '+squareId;
  }
  // if ultimate square is already owned, return no square.
  if (ultimate.getOwner(squareId) != ultimate.EMPTY()) {
    return []
  }
  // else, return the index of all cells that are empty (0).
  var emptyCells= [];
  for (var i=0; i<9; i++) {
    if (ultimate.square[squareId][i] === ultimate.EMPTY()) {
      emptyCells.push(i);
    }
  }
  return emptyCells;
}

/*
Returns 0 if there is no winner yet. Returns the corresponding playerId if there is a winner.
*/
getter.getWinner = function(ultimate) {
  if (ultimate.getOwner(0)!=ultimate.EMPTY() && ultimate.getOwner(0)===ultimate.getOwner(1) && ultimate.getOwner(0)===ultimate.getOwner(2)) { // Horizontal top row
    return ultimate.getOwner(0);
  } else if (ultimate.getOwner(3)!=ultimate.EMPTY() && ultimate.getOwner(3)===ultimate.getOwner(4) && ultimate.getOwner(3)===ultimate.getOwner(5)) { // Horizontal middle row
    return ultimate.getOwner(3);
  } else if (ultimate.getOwner(6)!=ultimate.EMPTY() && ultimate.getOwner(6)===ultimate.getOwner(7) && ultimate.getOwner(6)===ultimate.getOwner(8)) { // Horizontal bottom row
    return ultimate.getOwner(6);
  } else if (ultimate.getOwner(0)!=ultimate.EMPTY() && ultimate.getOwner(0)===ultimate.getOwner(3) && ultimate.getOwner(0)===ultimate.getOwner(6)) { // Vertical left row
    return ultimate.getOwner(0);
  } else if (ultimate.getOwner(1)!=ultimate.EMPTY() && ultimate.getOwner(1)===ultimate.getOwner(4) && ultimate.getOwner(1)===ultimate.getOwner(7)) { // Vertical middle row
    return ultimate.getOwner(1);
  } else if (ultimate.getOwner(2)!=ultimate.EMPTY() && ultimate.getOwner(2)===ultimate.getOwner(5) && ultimate.getOwner(2)===ultimate.getOwner(8)) { // Vertical middle row
    return ultimate.getOwner(2);
  } else if (ultimate.getOwner(0)!=ultimate.EMPTY() && ultimate.getOwner(0)===ultimate.getOwner(4) && ultimate.getOwner(0)===ultimate.getOwner(8)) { // Diagonal top-left -> bottom-right
    return ultimate.getOwner(0);
  } else if (ultimate.getOwner(6)!=ultimate.EMPTY() && ultimate.getOwner(6)===ultimate.getOwner(4) && ultimate.getOwner(6)===ultimate.getOwner(2)) { // Diagonal bottom-left -> top-right
    return ultimate.getOwner(6);
  } else if (ultimate.getOwner(0)!=ultimate.EMPTY() &&
    ultimate.getOwner(1)!=ultimate.EMPTY() &&
    ultimate.getOwner(2)!=ultimate.EMPTY() &&
    ultimate.getOwner(3)!=ultimate.EMPTY() &&
    ultimate.getOwner(4)!=ultimate.EMPTY() &&
    ultimate.getOwner(5)!=ultimate.EMPTY() &&
    ultimate.getOwner(6)!=ultimate.EMPTY() &&
    ultimate.getOwner(7)!=ultimate.EMPTY() &&
    ultimate.getOwner(8)!=ultimate.EMPTY()) {
      return -2;  // Draw
  } else {
    return ultimate.EMPTY();
  }
}

/*
Get the CSS class for the winner_square of the gameboard.
*/
getter.getWinnerSquareCSS = function(ultimate) {
  /* Check if square is owned by a player */
  if (ultimate.getWinner() === 0) {
    return "player1";
  } else if (ultimate.getWinner() === 1) {
    return "player2";
  } else if (ultimate.getWinner() === -2) {
    return "draw";
  } else {
    return "";
  }
}

/*
Return css style of each cell. player1, player2, invalid and valid.
*/
getter.getCellCSS = function(ultimate, squareId, cellId, playerId) {
  /* Check if cell is owned by a player */
  if (ultimate.square[squareId][cellId] === 0) { // If cell is owned by player1
    return "player1"
  } else if (ultimate.square[squareId][cellId] === 1) { // If cell is owned by player2
    return "player2"
  }

  /* If cell is not owned, and it is not the player's turn */
  if (ultimate.player[ultimate.playerTurn]._id.toString() != playerId.toString()) {  // It is not this player's turn.
    return "invalid"
  }

  /* If the cell is not owned, and it is the player's turn */
  if (ultimate.getWinner() != ultimate.EMPTY() || ultimate.getOwner(squareId) != ultimate.EMPTY()) {  // If the game is won, or this square is owned, this cell isn't valid.
    return "invalid";
  } else if (ultimate.lastMove.square === ultimate.EMPTY()) {  // If it is the first move of the game, every cell is valid.
    return "valid";
  } else if (ultimate.getOwner(ultimate.lastMove.cell) != ultimate.EMPTY()) {  // if the square relating to the last cell is owned, this cell is valid
    return "valid";
  } else if (ultimate.lastMove.cell === squareId) {  // All cell's are valid in the square relating to the last cell.
    return "valid";
  }
}

/* Return the CSS class for the square */
getter.getSquareCSS = function(ultimate, squareId) {
  /* Check if square is owned by a player */
  if (ultimate.getOwner(squareId) === 0) {
    return "player1";
  } else if (ultimate.getOwner(squareId) === 1) {
    return "player2";
  } else {
    return "";
  }
}

/* HTML text which defines the onclick, onmouseover and onmouseout events when user interacts with this cell */
getter.getCellEvents = function(ultimate, squareId, cellId, playerId) {
  // Events only occur on 'valid' cells.
  if (ultimate.getCellCSS(squareId, cellId, playerId) === "valid") {
    // Determine if user is player 1 or player 2
    if (ultimate.playerTurn === 0 && ultimate.player[0]._id.toString() === playerId.toString()) { // If cell is owned by player1
      var player = "player1";
    } else if (ultimate.playerTurn === 1 && ultimate.player[1]._id.toString() === playerId.toString()) { // If cell is owned by player2
      var player = "player2"
    } else {
      throw "[ERROR] user must be a player in the game";
    }

    return "onclick=POST("+squareId+","+cellId+") onmouseover=this.classList.add('"+player+"') onmouseout=this.classList.remove('"+player+"')";
  } else {
    return "";
  }
}

/*
Get the opponent name.
*/
getter.getOpponent = function(ultimate, playerId) {
  if (ultimate.player[0]._id.toString() == playerId.toString()) {
    return ultimate.player[1];
  } else if (ultimate.player[1]._id.toString() == playerId.toString()) {
    return ultimate.player[0];
  } else {
    throw '[ERROR] User: '+playerId+' is not part of game: '+ultimate._id;
  }
}

module.exports = getter;
