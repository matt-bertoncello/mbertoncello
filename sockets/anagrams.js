var anagramController = require('../controllers/anagrams/AnagramController');

socket_router = {}

socket_router.sock = function(socket, io) {

  // Return the string HTML of a random 9way board to be displayed on the homescreen.
  socket.on('getWords', function(string) {
    socket.emit('returnWords', anagramController.getWords(string));
  });
}

module.exports = socket_router;
