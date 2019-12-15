var bwtController = require('../../controllers/bwt/BWTController');

socket_router = {}

socket_router.sock = function(socket, io) {

  // Return the string HTML of a random 9way board to be displayed on the homescreen.
  socket.on('getCompression', function(string) {
    socket.emit('returnCompression', bwtController.compress(string));
  });
}

module.exports = socket_router;
