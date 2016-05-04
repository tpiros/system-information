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
      db.documents.write({
        uri: '/data/' + Date.now() + '.json',
        contentType: 'application/json',
        content: { cpu: load, memory: usedMemory }
      }).result().then((response) => {
        console.log(response.documents[0].uri + ' inserted to the database');
      }).catch((error) => {
        console.log(error);
      });
    }, 5000);
  });
}

module.exports.connect = connect;
