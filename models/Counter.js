var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var counter = new mongoose.Schema({
  name: {type:String, unique:true},
  count: {type:Number, default:0}
});

module.exports = mongoose.model('Counter', counter);
