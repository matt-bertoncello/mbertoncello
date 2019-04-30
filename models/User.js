var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  google: {
    id: String,
    accessToken: String
  },
  facebook_id: String,
  twitter_id: String,
  github_id: String,
  email: String,
  password: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
