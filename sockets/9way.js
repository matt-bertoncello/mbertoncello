var nineWayController = require('../controllers/9wayController');
var User = require("../models/User");

socket_router = {}

socket_router.sock = function(socket, io) {
  /*
  When a client loads a game, it will connect to a room corresponding to that game.
  */
  socket.on('9wayroom', function (room) {
    socket.join(room);

    // when a socket connected to a specific room emits this message. Perform checks and update the game.
    socket.on('selectcell', function(squareId, cellId){

      // Update game
      nineWayController.get9Way(room, function(err, game){
        if (err) {  // If there was an error in retrieving the game, redirect to 9Way homepage.
          console.log(err);
          socket.emit('redirect', '/9way');
        } else {
          game.selectCell(squareId, cellId, socket.handshake.session.passport.user._id);
        }
      })

      // Once game is updated, send new game data.
      io.sockets.in(room).emit('updategame');
    });
  });

  /*
  Handles creating new games
  */
  socket.on('newgame_user', function(username) {
    User.findOne({
        'username': username
      }, function(err, opponent) {
        if (err) {console.log(err);}
        if (opponent) {
          nineWayController.createGame(socket.handshake.session.passport.user._id, opponent, function(gameId){
            socket.emit('redirect', '/9way/'+gameId);
          })
        }
        if (!opponent) {socket.emit('error_user', 'Cannot find user with username: '+username);}
      });
  });

  socket.on('newgame_email', function(email) {
    User.findOne({
        'email': email
      }, function(err, opponent) {
        if (err) {console.log(err);}
        if (opponent) {
          nineWayController.createGame(socket.handshake.session.passport.user._id, opponent, function(gameId){
            socket.emit('redirect', '/9way/'+gameId);
          })
        }
        if (!opponent) {socket.emit('error_email', 'Cannot find user with email: '+email);}
      });
  });
}

module.exports = socket_router;
