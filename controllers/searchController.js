var mongoose = require("mongoose");
var User = require("../models/User");

var searchController = {};

searchController.searchUsername = function(req, res, next) {
  console.log('searching for '+req.body.username)
  User.findOne({
      'username': req.body.username
    }, function(err, opponent) {
      if (err) {console.log(err);}
      if (opponent) {
        next(req,res,opponent);
      }
      if (!opponent) {console.log("no user found");}
    });
}

searchController.searchEmail = function(req, res, next) {
  console.log('searching for '+req.body.email);
  User.findOne({
      'email': req.body.email
    }, function(err, opponent) {
      if (err) { console.log(err);}
      if (opponent) {
        next(req,res,opponent);
      }
      if (!opponent) {console.log("no user found");}
    });
}

module.exports = searchController;
