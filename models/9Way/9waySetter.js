var nineWay = require('./9way');

var setter = {};

/*
Changes ownership of the cell from empty to owned by the player. The square must not be owned and the cell must be empty.
Param: cellId, the id of a cell to change ownership of. (must be between 0-8 inclusive).
Param: playerId, the id of a cell to change ownership of.
*/
setter.selectCell = function(nineWay, squareId, cellId, playerId) {
  // Check for correct parameters
  if (nineWay.getOwner(squareId) != nineWay.EMPTY()) {
    throw '[ERROR] no cells can be selected because this square is owned by: '+nineWay.getOwner(squareId)+'. squareId provided: '+squareId+' - cellId provided: '+cellId;
  }
  if (squareId<0 || squareId >8) {
    throw '[ERROR] squareId must be betwee 0-8 inclusively. squareId provided: '+squareId+' - cellId provided: '+cellId;
  }
  if (cellId<0 || cellId >8) {
    throw '[ERROR] cellId must be betwee 0-8 inclusively. squareId provided: '+squareId+' - cellId provided: '+cellId;
  }
  if (nineWay.square[squareId][cellId] != nineWay.EMPTY()) {
    throw '[ERROR] cell must not be owned. squareId provided: '+squareId+' - cellId provided: '+cellId;
  }
  if (nineWay.playerTurn != playerId) {
    throw '[ERROR] it is not this players turn';
  }

  // Set the cell to the playerId.
  nineWay.square[squareId][cellId] = playerId;

  // Update the last move
  nineWay.lastMove = ''+squareId+''+cellId+'';

  // It is now the next players' move
  nineWay.playerTurn = (nineWay.playerTurn + 1) % 2;

  nineWay.markModified('square');

  // save
  nineWay.save(function(err) {
    if (err) console.log(err);
  });
}

module.exports = setter;
