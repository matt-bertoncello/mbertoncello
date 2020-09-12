// setup  socket connection.
var socket = io.connect('/');

// called to get new random board via socket connection.
function getNewUltimateBoard() {
  socket.emit('get-new-ultimate');
}

// populate 'dynamic_ultimate' id with the board provided by the socket.
socket.on('ultimate-board', function(string) {
  document.getElementById('dynamic_ultimate').innerHTML = string;
});
