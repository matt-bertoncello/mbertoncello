var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  userid: String,
  updated_at: { type: Date, default: Date.now },
});

//UserSchema.statics.findOrCreate = require("find-or-create");
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
