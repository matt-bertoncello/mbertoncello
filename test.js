var mongoose = require('mongoose');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
mongoose.Promise = global.Promise;
require('dotenv').config();
var mongooseController = require('./controllers/mongooseController');
var nineWayController = require('./controllers/9WayController');
var countController = require('./controllers/countController');

/* Remove deprecated settings from mongoose */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

/* Define mongoDB details*/
const mongoDetails = {
  dbName: process.env.MONGO_DB,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  cluster: process.env.MONGO_CLUSTER
}
const uri = 'mongodb+srv://'+mongoDetails.user+':'+mongoDetails.password+'@'+mongoDetails.cluster+'-clgtv.gcp.mongodb.net/'+mongoDetails.dbName+'?authSource=admin&retryWrites=true';

/* Connect to mongoDB*/
mongoose.connect(uri)
  .then(() =>  console.log('[INFO] MongoDB connected successfully'))
  .catch((err) => console.error(err));

nineWayController.get9WayForUser('5d344de009397d1fc8bd2b62');
