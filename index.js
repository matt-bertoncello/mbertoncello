const express = require('express');
const app = express();
var server = require('http').Server(app);
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 5000;
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var io = require('socket.io')(server);
var uuid = require('uuid/v4');
const MongoStore = require('connect-mongo')(session);
var sharedsession = require('express-socket.io-session');
mongoose.Promise = global.Promise;
require('dotenv').config();

/* Define routes */
var auth = require('./routes/auth');
var index = require('./routes/index');
var nineway = require('./routes/9way');
var hermes = require('./routes/hermes');

/* Define sockets */
var freelance_sock = require('./sockets/freelance');
var nineway_sock = require('./sockets/9way');
var user_sock = require('./sockets/user');
var hermes_sock = require('./sockets/hermes');

/* Remove deprecated settings from mongoose */
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
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

/* define how to use session */
var mongooseSession = session({
  genid: function(req) {
    return uuid() // use UUIDs for session IDs
  },
  secret: 'kjlhsdklh28o8712hkq3798w31jbk',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection, stringify: false}),
  cookie: {secure: false}
});

/* define which template to view at each address*/
app.use(express.static(path.join(__dirname, 'public')))
  .use(mongooseSession)
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/', index)
  .use('/auth', auth)
  .use('/freelance/9way', nineway)
  .use('/freelance/hermes', hermes)
  .set('views', path.join(__dirname, 'public/views/pages'))
  .set('view engine', 'ejs');

server.listen(PORT, () => console.log(`Listening on ${ PORT }`));

io.use(sharedsession(mongooseSession)); // can access session from within 'io' with 'socket.handshake.session'
io.on('connection', function(socket){

  // Load socket configuration from external files.
  freelance_sock.sock(socket, io);
  nineway_sock.sock(socket, io);
  user_sock.sock(socket, io);
  hermes_sock.sock(socket, io);

  socket.on('disconnect', function() {
  });
});
