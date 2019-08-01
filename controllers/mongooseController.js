var NineWay = require('../models/9Way/9way');
var User = require('../models/User');

var mongooseController = {};

/*
params: id, unique 24 character string referring to the '_id' of a User in the mongoose database.
*/
mongooseController.getUser = function(id, next) {
  User.findOne({
    '_id': id
  }, function(err, user) {
      if (err) {
        throw err;
      }
      if (!user) {
        throw "[ERROR] no user game found with _id: "+id;
      }
      if (user) {
        next(user);
      }
    });
}

module.exports = mongooseController;
