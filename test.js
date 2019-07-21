var nineWaySquare = require('./classes/9WaySquare.js');

test = new nineWaySquare();

test.selectCell(6, 1)
test.selectCell(7, 1)
test.selectCell(8, 1)
console.log(test.getEmptySquares());
console.log(test.getOwner());
