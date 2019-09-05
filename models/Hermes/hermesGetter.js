var ChatRoom = require('./ChatRoom');
var Message = require('./Message');

var getter = {};

/*
If this user is member 1, return username of member 2.
If this user is member 2, return username of member 1.
Throw error if user is not member 1 or 2.
*/
getter.getChatName = function(chatRoom, id) {
  if (chatRoom.members[0]._id.toString() == id.toString()) {
    return chatRoom.members[1].username;
  } else if (chatRoom.members[1]._id.toString() == id.toString()) {
    return chatRoom.members[0].username;
  } else {
    throw "[ERROR] User is not part of this chatRoom. User: "+id+". ChatRoom: "+chatRoom._id;
  }
}

module.exports = getter;
