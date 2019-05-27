var mongoose = require("mongoose");
var User = require("../models/User");
var NineWay = require("../models/9way");

var nineWayController = {};

nineWayController.searchUsername = function(req, res) {
  console.log('searching for '+req.body.username)
  User.findOne({
      'username': req.body.username
    }, function(err, user) {
      if (err) { return done(err);}
      if (user) {console.log(user.username); return user._id}
    });
}

nineWayController.searchEmail = function(req, res) {
  console.log('searching for '+req.body.email)
  User.findOne({
      'email': req.body.email
    }, function(err, user) {
      if (err) { return done(err);}
      if (user) {console.log(user.email); return user._id}
    });
}

module.exports = nineWayController;
