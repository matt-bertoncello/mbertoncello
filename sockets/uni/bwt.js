var bwtController = require('../../controllers/uni/bwt/BWTController');

socket_router = {}

socket_router.sock = function(socket, io) {

  // Return the BWT compression of the input string.
  socket.on('getCompression', function(string) {
    socket.emit('returnCompression', bwtController.compress(string));
  });

  // Return the decompressed string of the input BWT string.
  socket.on('getDecompression', function(string) {
    socket.emit('returnDecompression', bwtController.decompress(string));
  });
}

module.exports = socket_router;
