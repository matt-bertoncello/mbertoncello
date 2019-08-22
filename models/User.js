var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  username:  {type:String, unique:true, sparse:true},
  google: {
    id: String,
    displayName: String
  },
  facebook: {
    id: String,
    displayName: String
  },
  twitter: {
    id: String,
    username: String,
    displayName: String
  },
  github: {
    id: String,
    username: String,
    displayName: String
  },
  email: {type:String, unique:true, required:true},
  updated_at: { type: Date, default: Date.now },
  provider: String,
  created: {type: Date, default: Date.now},
  updated: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next) {
  this.updated = Date.now();
  next();
});

module.exports = mongoose.model('User', UserSchema);
