const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000
var mongoose = require('mongoose')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var uuid = require('uuid/v4');
var auth_controller = require("./controllers/AuthController.js");
const MongoStore = require('connect-mongo')(session);
mongoose.Promise = global.Promise;
require('dotenv').config();

/* Define routes */
var auth = require('./routes/auth');
var user = require('./routes/user');
var index = require('./routes/index');

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

/* define which template to view at each address*/
express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(session({
    genid: function(req) {
      return uuid() // use UUIDs for session IDs
    },
    secret: 'kjlhsdklh28o8712hkq3798w31jbk',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection, stringify: false}),
    cookie: {secure: false}
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.json())
  .use('/auth', auth)
  .use('/user', user)
  .use('/', index)
  .set('views', path.join(__dirname, 'views/pages'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
