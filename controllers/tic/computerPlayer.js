var computerPlayer = {};

var MIN = -10;
var MAX = 10;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

computerPlayer.Player = class Player {
  constructor(id, weights) {
    this.id = id;
    this.weights = weights || {
      two: getRandomInt(MIN, MAX),
      oppTwo: getRandomInt(MIN, MAX),
      center: getRandomInt(MIN, MAX),
      corner: getRandomInt(MIN, MAX),
      side: getRandomInt(MIN, MAX),
      win: 999,
      lose: 999
    };
    this.maxIter =3;
    this.wins = 0;
    this.draws = 0;
    this.lose = 0;
  }

  getBestMove(gameBoard, playerNum) {

    function bestMoveHelper(gameBoad, playerNum, maxIter) {
      var potentialMoves = gameBoard.getValidMoves();

      // if we have seen far enough into the future or there are no more potential moves, return the utility of this board.
      if (iter == this.maxIter || potentialMoves.length === 0) {
        return [this.calcUtility(gameBoad, playerNum)];
      }

      var minTurn = iter % 2;
      var gameBoards = {};
      var utilities = {};

      // If max turn. Calculate this player's utility after each of this player's moves. Choose move with maximum utility.
      if (!minTurn) {
        var maxUtility = Infinite;
        var bestMove = -1
        for (var i=0; i<potentialMoves.length; i++) {
          gameBoards[potentialMoves[i]] = JSON.parse(JSON.stringify(gameBoad))   // create copy of gameboard
          gameBoards[potentialMoves[i]].makeMove(potentialMoves[i], playerNum)  // make move

          // recursively claculate utility for this move
          utilities[potentialMoves[i]] = bestMoveHelper(gameBoards[potentialMoves[i]], playerNum, iter+1)[0]

          if (utilities[potentialMoves[i]] > maxUtility){
              bestMove = potentialMoves[i]
              maxUtility = utilities[potentialMoves[i]]
            }
          }
        // return the maximum utility of all the potential moves after recrusively looking forward
        return [maxUtility, bestMove]
      } else {
        var minUtility = -Infinite;
        var bestMove = -1
        for (var i=0; i<potentialMoves.length; i++) {
          gameBoards[potentialMoves[i]] = JSON.parse(JSON.stringify(gameBoad))   // create copy of gameboard
          gameBoards[potentialMoves[i]].makeMove(potentialMoves[i], playerNum)  // make move

          // recursively claculate utility for this move
          utilities[potentialMoves[i]] = bestMoveHelper(gameBoards[potentialMoves[i]], playerNum, iter+1)[0]

          if (utilities[potentialMoves[i]] < minUtility){
              bestMove = potentialMoves[i]
              minUtility = utilities[potentialMoves[i]]
            }
          }
        // return the maximum utility of all the potential moves after recrusively looking forward
        return [minUtility, bestMove]
      }
    }

    return bestMoveHelper(gameBoard, playerNum, 0)[1]
  }

  // based on the player's weights, calculate the total utility of this game_board.
  calcUtility(gameBoad, playerNum) {
    var utility = self.weights.two * gameBoad.two(playerNum)
    utility += self.weights.oppTwo * gameBoad.oppTwo(playerNum)
    utility += self.weights.corner * gameBoad.corner(playerNum)
    utility += self.weights.center * gameBoad.center(playerNum)
    utility += self.weights.side * gameBoad.side(playerNum)
    utility += self.weights.win * gameBoad.win(playerNum)
    utility += self.weights.lose * gameBoad.lose(playerNum)
    return utility
  }

}

module.exports = computerPlayer;
