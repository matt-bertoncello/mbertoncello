const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var mongoose = require('mongoose')
var passport = require('passport');
var session = require('express-session');
var auth = require('./routes/auth');
var user = require('./routes/user');
mongoose.Promise = global.Promise;
require('dotenv').config();

/* Define mongoDB details*/
const mongoDetails = {
  dbName: process.env.MONGO_DB,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  cluster: process.env.MONGO_CLUSTER
}
const uri = 'mongodb+srv://'+mongoDetails.user+':'+mongoDetails.password+'@'+mongoDetails.cluster+'-clgtv.gcp.mongodb.net/'+mongoDetails.dbName+'?authSource=admin&retryWrites=true';

/* Connect to mongoDB*/
mongoose.connect(uri, { useNewUrlParser: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

/* define when to use passport */

/* define which template to view at each address*/
express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(session({
    secret: 's3cr3t',
    resave: true,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use('/auth', auth)
  .use('/user', user)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/login', (req, res, next) => res.render('pages/login', { title: 'Please Sign In with:' }))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
