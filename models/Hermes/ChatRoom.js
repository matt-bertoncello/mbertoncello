var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('../User');
var Message = require('./Message');
var getter = require('./hermesGetter');
var setter = require('./hermesSetter');

var chatRoomSchema = new mongoose.Schema({
  _id: {type:Number},
  members: [{type:mongoose.Schema.Types.ObjectId, required:true, ref:User}],
  _membersignature: {type:String, unique:true},
  secret: {type: String},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
  messages: [{type:mongoose.Schema.Types.ObjectId, ref:Message}]
}, { _id: false });

chatRoomSchema.pre('save', function(next) {
  this.members.sort();
  this._membersignature = this.members.join(',');
  this.updated = Date.now();
  next();
});

/*
Returns the name of the chatRoom for this user.
id: user id.
*/
chatRoomSchema.methods.getChatName = function(id) {
  return getter.getChatName(this, id);
}

/*
Returns the most recent message sent to this chatRoom.
*/
chatRoomSchema.methods.getMostRecentMessage = function() {
  return getter.getMostRecentMessage(this);
}

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
