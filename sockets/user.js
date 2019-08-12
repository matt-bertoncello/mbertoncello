var AuthController = require('../controllers/AuthController');
var passport = require('passport');

socket_router = {}

socket_router.sock = function(socket, io) {
  socket.on('update_username', function(username) {
    AuthController.updateUsername(socket.handshake.session.passport.user._id, username, function(err) {
      if (err && err.code === 11000) {
        socket.emit('err', {id: 'username_error', text: 'This username is already taken.'});
      } else {
        socket.emit('redirect', '/user');
      }
    });
  });
}


module.exports = socket_router;
