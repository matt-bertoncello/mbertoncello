var nineWay = require('./9way');

var formatter = {};

/*
Returns a string of the board in HTML format.
*/
formatter.getBoardHTML = function(nineWay, playerId) {
  var string = "<table class='"+nineWay.getWinnerSquareCSS()+"'>"
  for (row=0; row<3; row++) {
    string += "<tr class='main-row'>"
    for (col=0; col<3; col++) {
      string += "<td>"
      string += "<table class='square col"+col+" row"+row+" "+nineWay.getSquareCSS(col+3*row)+"''>"
      string += "<tr>"
      string += "<td class='dashboard-cell "+nineWay.getCellCSS(col+3*row, 0, playerId)+"'></td>"
      string += "<td class='dashboard-cell "+nineWay.getCellCSS(col+3*row, 1, playerId)+"'></td>"
      string += "<td class='dashboard-cell "+nineWay.getCellCSS(col+3*row, 2, playerId)+"'></td>"
      string += "</tr>"
      string += "<tr>"
      string += "<td class='dashboard-cell "+nineWay.getCellCSS(col+3*row, 3, playerId)+"'></td>"
      string += "<td class='dashboard-cell "+nineWay.getCellCSS(col+3*row, 4, playerId)+"'></td>"
      string += "<td class='dashboard-cell "+nineWay.getCellCSS(col+3*row, 5, playerId)+"'></td>"
      string += "</tr>"
      string += "<tr>"
      string += "<td class='dashboard-cell "+nineWay.getCellCSS(col+3*row, 6, playerId)+"'></td>"
      string += "<td class='dashboard-cell "+nineWay.getCellCSS(col+3*row, 7, playerId)+"'></td>"
      string += "<td class='dashboard-cell "+nineWay.getCellCSS(col+3*row, 8, playerId)+"'></td>"
      string += "</tr>"
      string += "</table>"
      string += "</td>"
    }
  }
  string += "</table>"
  return string
}

module.exports = formatter;
