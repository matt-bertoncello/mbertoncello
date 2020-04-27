var ultimateController = require('../../controllers/freelance/UltimateController');

socket_router = {}

socket_router.sock = function(socket, io) {

  // Return the string HTML of a random ultimate board to be displayed on the homescreen.
  socket.on('get-new-ultimate', function() {
    ultimateController.getRandomGame(function(err, game) {
      // if there is an error, send an image of the blue X.
      if (err || !game) {
        console.log(err);
        socket.emit('ultimate-board', "<img src='/images/ultimate/blueX.png' style='width:min(59.4vw, 360px);'>");
      } else {
        // Otherwise, return the gameboard of the random game. 0 indicates this playerId, ie not a real player.
        socket.emit('ultimate-board', game.getBoardHTML(0));
      }
    });
  });
}

module.exports = socket_router;
