const os = require('os');
const db = require('./database').db();

var connect = (io, os) => {
  io.on('connection', (socket) => {
    var load = os.loadavg()[0];
    var totalMemory = os.totalmem();
    var freeMemory = os.freemem();
    var usedMemory = Number((totalMemory - freeMemory) / 1073741824).toFixed(4);

    socket.emit('resources', { cpu: load, memory: usedMemory });
    setInterval(() => {
      load = os.loadavg()[0];
      freeMemory = os.freemem();
      usedMemory = Number((totalMemory - freeMemory) / 1073741824).toFixed(4);
      socket.emit('resources', { cpu: load, memory: usedMemory });
      var insertionTime = Date.now();
      db.documents.write({
        uri: '/data/' + insertionTime + '.json',
        contentType: 'application/json',
        content: { cpu: load, memory: usedMemory, recorded: insertionTime }
      }).result().then((response) => {
        console.log(response.documents[0].uri + ' inserted to the database');
      }).catch((error) => {
        console.log(error);
      });
    }, 5000);
  });
}

module.exports.connect = connect;
