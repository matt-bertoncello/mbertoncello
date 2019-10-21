var authController = require('../controllers/AuthController');
var userController = require('../controllers/UserController');
var passport = require('passport');

socket_router = {}

socket_router.sock = function(socket, io) {

  if (authController.postLoginRedirect) {
    socket.emit('flash', 'A username is required to access '+authController.postLoginRedirect);
  }

  socket.on('update_username', function(username) {
    if (username === "") {  // if there is no username provided, emit error
      socket.emit('err', {id: 'username_error', text: 'Cannot provide an empty username.'});
    } else if (authController.isEmail(username)) { // username cannot be an email
      socket.emit('err', {id: 'username_error', text: 'Username cannot be an email.'});
    } else {
      userController.updateUsername(socket.handshake.session.passport.user._id, username, function(err) {
        if (err && err.code === 11000) {
          socket.emit('err', {id: 'username_error', text: 'This username is already taken.'});
        } else {
          if (authController.postLoginRedirect) { // If the user was sent to to update username. Send back to original page.
            socket.emit('redirect', authController.postLoginRedirect);
            delete authController.postLoginRedirect;  // Delete postLoginRedirect now that user has returned to page.
          } else {
            socket.emit('redirect', '/user');
          }
        }
      });
    }
  });
}

module.exports = socket_router;
