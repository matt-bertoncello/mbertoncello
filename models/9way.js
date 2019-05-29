var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require("./User");

var nineWaySchema = new mongoose.Schema({
  matchId: {type:Number, unique:true, required:true},
  winner: {type:mongoose.Types.ObjectId, ref:User},
  player1: {type:mongoose.Types.ObjectId, required:true, ref:User},
  player2: {type:mongoose.Types.ObjectId, required:true, ref:User},
  squares: [Number]*81,
  playerTurn: {type:mongoose.Types.ObjectId, required:true, ref:User}
});

module.exports = mongoose.model('9way', nineWaySchema);
