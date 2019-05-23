var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  google: {
    id: String,
    accessToken: String,
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
  email: String,
  password: String,
  updated_at: { type: Date, default: Date.now },
  provider: String
});

module.exports = mongoose.model('User', UserSchema);
