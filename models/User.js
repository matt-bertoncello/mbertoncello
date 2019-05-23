var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  google: {
    id: String,
    accessToken: String
  },
  facebook: {
    id: String,
    accessToken: String
  },
  twitter: {
    id: String,
    accessToken: String
  },
  github: {
    id: String,
    accessToken: String
  },
  email: String,
  password: String,
  updated_at: { type: Date, default: Date.now },
  provider: String
});

module.exports = mongoose.model('User', UserSchema);
