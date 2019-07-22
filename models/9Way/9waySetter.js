var nineWay = require('./9way');

var setter = {};

/*
Changes ownership of the cell from empty to owned by the player. The square must not be owned and the cell must be empty.
Param: cellId, the id of a cell to change ownership of. (must be between 0-8 inclusive).
Param: playerId, the id of a cell to change ownership of.
*/
setter.selectCell = function(nineWay, squareId, cellId, playerId) {
  // Check for correct parameters
  if (nineWay.getOwner(squareId) != 0) {
    throw '[ERROR] no cells can be selected because this square is owned by: '+nineWay.getOwner(squareId);
  }
  if (squareId<0 || squareId >8) {
    throw '[ERROR] squareId must be betwee 0-8 inclusively. squareId provided: '+cellId;
  }
  if (cellId<0 || cellId >8) {
    throw '[ERROR] cellId must be betwee 0-8 inclusively. cellId provided: '+cellId;
  }
  if (nineWay.square[squareId][cellId] != 0) {
    throw '[ERROR] cell must not be owned. cellId provided: '+cellId;
  }
  if (nineWay.playerTurn != playerId) {
    throw '[ERROR] it is not this players turn';
  }

  // Set the cell to the playerId.
  nineWay.square[squareId][cellId] = playerId;

  // It is now the next players' move
  nineWay.playerTurn = (nineWay.playerTurn + 1) % 2;

  nineWay.save(function(err) {
    if (err) console.log(err);
  });
}

module.exports = setter;
