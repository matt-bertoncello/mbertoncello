var ultimateController = require('../controllers/ultimate/UltimateController');
var User = require("../models/User");

socket_router = {}

socket_router.sock = function(socket, io) {
  /*
  When a client loads a game, it will connect to a room corresponding to that game.
  */
  socket.on('ultimate-room', function (room) {
    socket.join(room);

    // when a socket connected to a specific room emits this message. Perform checks and update the game.
    socket.on('ultimate-game-select-cell', function(squareId, cellId){
      // Update game
      ultimateController.getUltimate(room, function(err, game){
        if (err || !game) {  // If there was an error in retrieving the game, redirect to Ultimate homepage.
          console.log(err);
          socket.emit('redirect', '/ultimate');
        } else {
          game.selectCell(squareId, cellId, socket.handshake.session.passport.user._id, function(err) {
            if (err) {
              console.log(err);
              socket.emit('redirect', '/ultimate');
            }
          });
        }
      })

      // Once game is updated, send new game data.
      io.sockets.in(room).emit('ultimate-game-update');
    });
  });

  /*
  Handles creating new games
  */
  socket.on('ultimate-newgame-user', function(username) {
    User.findOne({
        username: username
      }, function(err, opponent) {
        if (err) {console.log(err);}
        if (opponent) {
          ultimateController.createGame(socket.handshake.session.passport.user._id, opponent, function(gameId){
            socket.emit('redirect', '/ultimate/'+gameId);
          })
        }
        if (!opponent) {socket.emit('err', {id: 'error_user', text: 'Cannot find user with user: '+username});}
      });
  });

  socket.on('ultimate-newgame-email', function(email) {
    User.findOne({
        email: email
      }, function(err, opponent) {
        if (err) {console.log(err);}
        if (opponent) {
          ultimateController.createGame(socket.handshake.session.passport.user._id, opponent, function(gameId){
            socket.emit('redirect', '/ultimate/'+gameId);
          })
        }
        if (!opponent) {socket.emit('err', {id: 'error_email', text: 'Cannot find user with email: '+email});}
      });
  });
}

module.exports = socket_router;
