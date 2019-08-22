var AuthController = require('../controllers/AuthController');
var passport = require('passport');

socket_router = {}

socket_router.sock = function(socket, io) {

  if (AuthController.postLoginRedirect) {
    socket.emit('flash', 'A username is required to access '+AuthController.postLoginRedirect);
  }

  socket.on('update_username', function(username) {
    if (username === "") {  // if there is no username provided, emit error
      socket.emit('err', {id: 'username_error', text: 'Cannot provide an empty username.'});
    } else {
      AuthController.updateUsername(socket.handshake.session.passport.user._id, username, function(err) {
        if (err && err.code === 11000) {
          socket.emit('err', {id: 'username_error', text: 'This username is already taken.'});
        } else {
          if (AuthController.postLoginRedirect) { // If the user was sent to to update username. Send back to original page.
            socket.emit('redirect', AuthController.postLoginRedirect);
            delete AuthController.postLoginRedirect;  // Delete postLoginRedirect now that user has returned to page.
          } else {
            socket.emit('redirect', '/user');
          }
        }
      });
    }
  });
}

module.exports = socket_router;
