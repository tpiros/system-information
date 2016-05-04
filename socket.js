const os = require('os');
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
    }, 5000);
  });
}

module.exports.connect = connect;