const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var mongodb = require('mongodb')

require('dotenv').config();

const mongoDetails = {
  dbName: process.env.MONGO_DB,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  cluster: process.env.MONGO_CLUSTER
}

const uri = 'mongodb+srv://'+mongoDetails.user+':'+mongoDetails.password+'@'+mongoDetails.cluster+'-clgtv.gcp.mongodb.net/'+mongoDetails.dbName+'?authSource=admin&retryWrites=true';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Use connect method to connect to the server
MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(mongoDetails.dbName);

  client.close();
});


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
