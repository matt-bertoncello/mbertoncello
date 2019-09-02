var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('../User');

var message = new mongoose.Schema({
  user: {type:mongoose.Schema.Types.ObjectId, required:true, ref:User},
  text: {type:String, required:true},
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
})

message.pre('save', function(next) {
  this.updated = Date.now();
  next();
});

module.exports = mongoose.model('Message', message);
