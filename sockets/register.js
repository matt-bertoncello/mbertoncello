var authController = require('../controllers/AuthController');
var userController = require('../controllers/UserController');
var passport = require('passport');

socket_router = {}

socket_router.sock = function(socket, io) {

  /*
  Confirm email, username, password1 and password2 exist.
  Confirm password1 and password2 are the same.
  Confirm password is strong enough.
  Create user and allocate email, username, password.
  Login.
  */
  socket.on('create_user', function(data) {
    if (!data.password1 || !data.password2 || !data.email || !data.username) {
      socket.emit('err', {id: 'register_error', text: "[ERROR] Please provide all inputs."});
    } else if (!authController.isEmail(data.email)) {
      socket.emit('err', {id: 'register_error', text: "[ERROR] Please provide valid email address."});
    } else if (authController.isEmail(data.username)) {
      socket.emit('err', {id: 'register_error', text: "[ERROR] Username cannot be an email."});
    } else if (data.password1 != data.password2) {
      socket.emit('err', {id: 'register_error', text: "[ERROR] The two passwords are different."});
    } else {
      userController.createUser(data.password1, function(err, successful) {
        if (err) {socket.emit('err', {id: 'register_error', text: err});}
        
      });
    }

  }

}

module.exports = socket_router;
