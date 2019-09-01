var hermesController = require('../controllers/HermesController');
var User = require("../models/User");

socket_router = {}

socket_router.sock = function(socket, io) {
  /*
  When a client loads a game, it will connect to the room corresponding to that chat.
  */
  socket.on('chatroom', function (room) {
    socket.join(room);
  });

  /*
  Handles creating new chats
  */
  socket.on('newchat_user', function(username) {
    User.findOne({
        username: username
      }, function(err, friend) {
        if (err) {console.log(err);}
        if (friend) {
          hermesController.getChat(socket.handshake.session.passport.user._id, friend._id, function(chatId){
            socket.emit('redirect', '/hermes/'+chatId);
          })
        }
        if (!friend) {socket.emit('err', {id: 'error_user', text: 'Cannot find user with user: '+username});}
      });
  });
}

module.exports = socket_router;
