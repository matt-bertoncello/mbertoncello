var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var counter = new mongoose.Schema({
  _id: {type:String},
  count: {type:Number, default:0}
}, { _id: false });

module.exports = mongoose.model('Counter', counter);
