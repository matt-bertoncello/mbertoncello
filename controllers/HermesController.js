const crypto = require('crypto');
var ChatRoom = require('../models/ChatRoom');
var Message = require('../models/Message');
var countController = require('./countController');

var hermesController = {};

hermesController.getChat = function(user1, user2, next) {

  /* If a chat already exists, get Id and call next */
  ChatRoom.findOne({
    _membersignature: [user1, user2].sort().join(',')
  }, function(err, chat) {
      if (err) { throw err; }
      if (chat) {  // if a chat has already been created, return that chat Id
        next(chat._id);
      } else {  // if a chat hasn't already been made, create a new chat
        hermesController.createChat(user1, user2, function(id) {
          next(id);
        })
      }
    })
}

/*
Create new chat between user1 and user2.
WARNING: this will create a new chat even if one exists between the two users.
*/
hermesController.createChat = function(user1, user2, next) {
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
    });
    chatRoom.save(function(err) {
      if (err) console.log(err);
    });

    next(count);
  })
}

module.exports = hermesController;
