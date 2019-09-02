const crypto = require('crypto');
var ChatRoom = require('../models/Hermes/ChatRoom');
var Message = require('../models/Hermes/Message');
var countController = require('./countController');
var authController = require('./AuthController');

var hermesController = {};

hermesController.getChat = function(user1, user2, next) {
  /* If a chat already exists, get Id and call next. Otherwise create new chat and call next */
  ChatRoom.findOne({
    _membersignature: [user1, user2].sort().join(',')
  }, function(err, chatRoom) {
      if (err) { throw err; }
      if (chatRoom) {  // if a chat has already been created, return that chat Id
        next(err, chatRoom);
      } else {  // if a chat hasn't already been made, create a new chatRoom
        createChat(user1, user2, function(id) {
          next(id);
        })
      }
    }).populate('members');
}

/*
Create new chat between user1 and user2.
WARNING: this will create a new chat even if one exists between the two users.
*/
createChat = function(user1, user2, next) {
  countController.incrementCounter('chatRoom', function(count) {

    console.log(user1);
    console.log(user2);

    user1_instance = crypto.createDiffieHellman(768);
    user1_key = user1_instance.generateKeys()

    user2_instance = crypto.createDiffieHellman(user1_instance.getPrime(), user1_instance.getGenerator());
    user2_key = user2_instance.generateKeys();

    secret = user1_instance.computeSecret(user2_key);

    console.log(user1_key.toString('hex'));
    console.log(user2_key.toString('hex'));
    console.log(secret.toString('hex'));

    chatRoom = new ChatRoom({
      _id: count,
      members: [user1, user2],
      user1_key: user1_key.toString('hex'),
      user2_key: user2_key.toString('hex'),
      secret: secret.toString('hex')
    }).populate('members');
    chatRoom.save(function(err) {
      if (err) {
        throw err;
      }
    });

    err = null;

    next(err, chatRoom);
  })
}

module.exports = hermesController;
