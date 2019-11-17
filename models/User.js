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
      if (err) return next(err, false);
      if (!isMatch) return next("[ERROR] this password and username/email combination is incorrect", false);
      return next(null, isMatch);
  });
};

/*
Updates the saved user password. Will take raw password as input and save hash.
Assume UserController has performed strength checks on newPassword.
*/
UserSchema.methods.updatePassword = function(newPassword, next) {
  user = this;

  if (!newPassword) {
    err = "[ERROR] no password provided.";
    return next(err, false);
  }

  // salt and save password.
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) { // generate a salt
    if (err) return next(err, false);

    // hash the password along with our new salt
    bcrypt.hash(newPassword, salt, function(err, hash) {
        if (err) return next(err, false);
        user.password = hash; // saved the hashed password

        user.save(function(err) {
          if (err) {return next(err, false);}
          else {return next(null, true);}
        });
    });
  });
}

module.exports = mongoose.model('User', UserSchema);
