var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var passportLocalMongoose = require('passport-local-mongoose');
var SALT_WORK_FACTOR = 10;


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
  updated: {type: Date, default: Date.now},
  password: String
});

// On pre-save, update the 'updated' field and check if password needs to be re-hashed.
UserSchema.pre('save', function(next) {
  this.updated = Date.now();

  // If password is modified
  if (this.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) { // generate a salt
      if (err) return next(err);

      // hash the password along with our new salt
      bcrypt.hash(this.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          this.password = hash;
          next();
      });
    });
  }

  next();
});

/*
Comparare the raw text password to the saved hash password.
Return isMatch = True is passwords match.
*/
UserSchema.methods.comparePassword = function(candidatePassword, next) {
  // If there is no password saved:
  if (!this.password) {
    return next('[ERROR] no password saved for this user', false);
  }

  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return next(err);
      return next(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
