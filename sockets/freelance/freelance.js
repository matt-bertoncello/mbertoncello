var nineWayController = require('../../controllers/freelance/9wayController');

socket_router = {}

socket_router.sock = function(socket, io) {

  // Return the string HTML of a random 9way board to be displayed on the homescreen.
  socket.on('getNew9Way', function() {
    nineWayController.getRandomGame(function(err, game) {
      // if there is an error, send an image of the blue X.
      if (err) {
        console.log(err);
        socket.emit('9WayBoard', "<img src='/images/blueX.png' style='width:100%;'>");
      } else {
        // Otherwise, return the gameboard of the random game. 0 indicates this playerId, ie not a real player.
        socket.emit('9WayBoard', game.getBoardHTML(0));
      }
    });
  });
}

module.exports = socket_router;
