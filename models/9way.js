var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var nineWaySchema = new mongoose.Schema({
  matchId: {type:Number, unique:true, required:true},
  winner: mongoose.Types.ObjectId,
  player1: {type:mongoose.Types.ObjectId, required:true},
  player2: {type:mongoose.Types.ObjectId, required:true},
  squares: [Number]*81,
  playerTurn: {type:mongoose.Types.ObjectId, required:true}
});

module.exports = mongoose.model('9way', nineWaySchema);
