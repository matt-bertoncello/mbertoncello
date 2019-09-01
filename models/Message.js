var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var ChatRoom = require('./ChatRoom');

var message = new mongoose.Schema({
  chatRoom: {type:mongoose.Schema.Types.ObjectId, required:true, ref:ChatRoom},
  text: {type:String, required:true},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
})

message.pre('save', function(next) {
  this.updated = Date.now();
  next();
});

module.exports = mongoose.model('Message', message);
