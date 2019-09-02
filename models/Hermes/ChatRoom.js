var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('../User');
var Message = require('./Message');
var getter = require('./hermesGetter');
var setter = require('./hermesSetter');

var chatRoom = new mongoose.Schema({
  _id: {type:Number},
  members: [{type:mongoose.Schema.Types.ObjectId, required:true, ref:User}],
  _membersignature: {type:String, unique:true},
  secret: {type: String},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now},
  messages: [{type:mongoose.Schema.Types.ObjectId, ref:Message}]
}, { _id: false });

chatRoom.pre('save', function(next) {
  this.members.sort();
  this._membersignature = this.members.join(',');
  this.updated = Date.now();
  next();
});

module.exports = mongoose.model('ChatRoom', chatRoom);
