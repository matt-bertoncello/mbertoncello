

/*
Class for the mini tic-tac-toe square.
*/
class nineWaySquare {
  constructor(){
    this.map = Array(9).fill(0);
  }

  /*
  Returns the owner (winner) of this square. Check for any 3 in a rows.
  */
  getOwner() {
    if (this.map[0]!=0 && this.map[0]===this.map[1] && this.map[0]===this.map[2]) { // Horizontal top row
      return this.map[0];
    } else if (this.map[3]!=0 && this.map[3]===this.map[4] && this.map[3]===this.map[5]) { // Horizontal middle row
      return this.map[3];
    } else if (this.map[6]!=0 && this.map[6]===this.map[7] && this.map[6]===this.map[8]) { // Horizontal bottom row
      return this.map[6];
    } else if (this.map[0]!=0 && this.map[0]===this.map[3] && this.map[0]===this.map[6]) { // Vertical left row
      return this.map[0];
    } else if (this.map[1]!=0 && this.map[1]===this.map[4] && this.map[1]===this.map[7]) { // Vertical middle row
      return this.map[1];
    } else if (this.map[2]!=0 && this.map[2]===this.map[5] && this.map[2]===this.map[8]) { // Vertical middle row
      return this.map[2];
    } else if (this.map[0]!=0 && this.map[0]===this.map[4] && this.map[0]===this.map[8]) { // Diagonal top-left -> bottom-right
      return this.map[0];
    } else if (this.map[6]!=0 && this.map[6]===this.map[4] && this.map[6]===this.map[2]) { // Diagonal bottom-left -> top-right
      return this.map[6];
    } else {
      return 0;
    }
  }

  /*
  Returns the index of all cells that are empty (0). If square is already owned, no indexes will be returned.
  */
  getEmptyCells(){
    // if this square is already owned, return no squares.
    if (this.getOwner() != 0) {
      return []
    }
    // else, return the index of all cells that are empty (0).
    var emptySquares= [];
    for (var i=0; i<this.map.length; i++) {
      if (this.map[i] === 0) {
        emptySquares.push(i);
      }
    }
    return emptySquares;
  }

  /*
  Changes ownership of the cell from empty to owned by the player. The square must not be owned and the cell must be empty.
  Param: cellId, the id of a cell to change ownership of. (must be between 0-8 inclusive).
  Param: playerId, the id of a cell to change ownership of.
  */
  selectCell(cellId, playerId) {
    // Check for correct parameters
    if (this.getOwner() != 0) {
      throw '[ERROR] no cells can be selected because this square is owned by: '+this.owner;
    }
    if (cellId<0 || cellId >8) {
      throw '[ERROR] cellId must be betwee 0-8 inclusively. cellId provided: '+cellId;
    }
    if (this.map[cellId] != 0) {
      throw '[ERROR] cell must not be owned. cellId provided: '+cellId;
    }

    // Set the cell to the playerId.
    this.map[cellId] = playerId;
  }

}

module.exports = nineWaySquare;
