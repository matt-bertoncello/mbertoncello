var hermesController = require('../controllers/HermesController');
var User = require("../models/User");
var Message = require("../models/Hermes/Message");

socket_router = {}

socket_router.sock = function(socket, io) {
  /*
  When a client loads a game, it will connect to the room corresponding to that chat.
  */
  socket.on('chatroom', function(room) {
    socket.join(room);

    /*
    Handles creating new chats
    */
    socket.on('newchat_user', function(username) {
      User.findOne({
          username: username
        }, function(err, friend) {
          if (err) {console.log(err);}
          if (friend) {
            hermesController.getChat(socket.handshake.session.passport.user._id, friend._id, function(err, chatRoom){
              socket.emit('redirect', '/hermes/'+friend.username);
            });
          }
          if (!friend) {socket.emit('err', {id: 'error_user', text: 'Cannot find user with user: '+username});}
        });
    });

    /*
    Creates new message and allocates it to the chatRoom. Emit new message to all users.
    */
    socket.on('new_message', function(text) {
      message = new Message({
        user: socket.handshake.session.passport.user._id,
        text: text,
      });

      message.save(function(err) {
        if (err) throw err;

        // allocate message to a chatroom and send notication to the chatroom to render message.
        hermesController.alloacteMessage(room, message, function(err) {
          if (err) console.log(err);

          // populate the username of the user who sent the message before emitting it.
          message.populate({path:'user', select:'username'}, function(err, message) {
            io.sockets.in(room).emit('render_message', {message: message, chatRoom: room});
          })
        });
      });
    });
  });
}

module.exports = socket_router;
