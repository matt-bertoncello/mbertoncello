
socket_router = {}

socket_router.sock = function(socket, io) {
  // When a client loads a game, it will connect to a room corresponding to that game.
  socket.on('9wayroom', function (room) {
    socket.join(room);

    // when a socket connected to a specific room emits this message. Perform checks and update the game.
    socket.on('selectcell', function(squareId, cellId){
      console.log('game: '+room);
      console.log('square: '+squareId);
      console.log('cell: '+cellId);
      console.log('user: '+socket.handshake.session.passport.user._id);

      // Once game is updated, send new game data.
      io.sockets.in(room).emit('updategame', 'game');
    });

  });
}

module.exports = socket_router;
