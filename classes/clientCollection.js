var MultiHash = require('./multiHash');

/*
- Collection of sockets.
- Defines easy broadcasting of data.
*/
class ClientCollection {
  constructor(){
    this.clients = new MultiHash();
  }

  /*
  Add a socket to this collection.
  */
  add(socket) {
    //this.client.add(socket.handshake.session)
  }
}

module.exports = ClientCollection;
