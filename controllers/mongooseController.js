var NineWay = require('../models/9Way/9way');
var User = require('../models/User');

var mongooseController = {};

/*
params: id, unique 24 character string referring to the '_id' of a 9Way game in the mongoose database.
*/
mongooseController.get9Way = function(id, next) {
  NineWay.findOne({
    '_id': id
  }, function(err, game) {
      if (err) {
        throw err;
      }
      if (!game) {
        throw "[ERROR] no 9Way game found with _id: "+id;
      }
      if (game) {
        next(game);
      }
    });
}

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
