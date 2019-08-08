var nineWay = require('./9way');

var setter = {};

/*
Changes ownership of the cell from empty to owned by the player. The square must not be owned and the cell must be empty.
Param: cellId, the id of a cell to change ownership of. (must be between 0-8 inclusive).
Param: playerId, the id of a cell to change ownership of.
*/
setter.selectCell = function(nineWay, squareId, cellId, playerId, next) {
  // Check for correct parameters
  if (nineWay.getOwner(squareId) != nineWay.EMPTY()) {
    var err = '[ERROR] no cells can be selected because this square is owned by: '+nineWay.getOwner(squareId)+'. squareId provided: '+squareId+' - cellId provided: '+cellId;
  }
  if (squareId<0 || squareId >8) {
    var err = '[ERROR] squareId must be betwee 0-8 inclusively. squareId provided: '+squareId+' - cellId provided: '+cellId;
  }
  if (cellId<0 || cellId >8) {
    var err = '[ERROR] cellId must be betwee 0-8 inclusively. squareId provided: '+squareId+' - cellId provided: '+cellId;
  }
  if (nineWay.square[squareId][cellId] != nineWay.EMPTY()) {
    var err = '[ERROR] cell must not be owned. squareId provided: '+squareId+' - cellId provided: '+cellId;
  }
  if (nineWay.player[nineWay.playerTurn]._id.toString() != playerId.toString()) {
    var err = '[ERROR] it is not this players turn';
  }

  // Set the cell to the playerId.
  nineWay.square[squareId][cellId] = nineWay.playerTurn;

  // Update the last move
  nineWay.lastMove.square = squareId;
  nineWay.lastMove.cell = cellId;

  // It is now the next players' move
  nineWay.playerTurn = (nineWay.playerTurn + 1) % 2;

  nineWay.markModified('square');

  // save
  nineWay.save(function(err) {
    if (err) console.log(err);
  });

  next(err);
}

module.exports = setter;
