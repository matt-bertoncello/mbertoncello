var setter = {};

/*
Changes ownership of the cell from empty to owned by the player. The square must not be owned and the cell must be empty.
Param: cellId, the id of a cell to change ownership of. (must be between 0-8 inclusive).
Param: playerId, the id of a cell to change ownership of.
*/
setter.selectCell = function(ultimate, squareId, cellId, playerId, next) {
  // Check for correct parameters
  if (ultimate.getOwner(squareId) != ultimate.EMPTY()) {
    var err = '[ERROR] no cells can be selected because this square is owned by: '+ultimate.getOwner(squareId)+'. squareId provided: '+squareId+' - cellId provided: '+cellId;
  }
  if (squareId<0 || squareId >8) {
    var err = '[ERROR] squareId must be betwee 0-8 inclusively. squareId provided: '+squareId+' - cellId provided: '+cellId;
  }
  if (cellId<0 || cellId >8) {
    var err = '[ERROR] cellId must be betwee 0-8 inclusively. squareId provided: '+squareId+' - cellId provided: '+cellId;
  }
  if (ultimate.square[squareId][cellId] != ultimate.EMPTY()) {
    var err = '[ERROR] cell must not be owned. squareId provided: '+squareId+' - cellId provided: '+cellId;
  }
  if (ultimate.player[ultimate.playerTurn]._id.toString() != playerId.toString()) {
    var err = '[ERROR] it is not this players turn';
  }

  // Set the cell to the playerId.
  ultimate.square[squareId][cellId] = ultimate.playerTurn;

  // Update the last move
  ultimate.lastMove.square = squareId;
  ultimate.lastMove.cell = cellId;

  // It is now the next players' move
  ultimate.playerTurn = (ultimate.playerTurn + 1) % 2;

  ultimate.markModified('square');

  // save
  ultimate.save(function(err) {
    if (err) console.log(err);
  });

  next(err);
}

module.exports = setter;
