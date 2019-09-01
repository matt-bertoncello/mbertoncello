var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./User');

var chatRoom = new mongoose.Schema({
  _id: {type:Number},
  members: [{type:mongoose.Schema.Types.ObjectId, required:true, ref:User}],
  _membersignature: {type:String, unique:true},
  secret: {type: String},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
}, { _id: false });

chatRoom.pre('save', function(next) {
  this.members.sort();
  this._membersignature = this.members.join(',');
  this.updated = Date.now();
  next();
});

module.exports = mongoose.model('ChatRoom', chatRoom);
