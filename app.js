'use strict';
const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const io      = require('socket.io')(server);
const os      = require('os');
const socket  = require('./socket').connect(io, os);
const hbs     = require('express-handlebars');
const router  = express.Router();

app.set('port', 8080);
app.use('/', router);
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/js', express.static(__dirname + '/js'));
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

let osType = os.type();
let osReleaseVersion = os.release();
let osArch = os.arch();
let osCPUs = os.cpus();
let osHostname = os.hostname();
let osTotalMemory = Number(os.totalmem() / 1073741824).toFixed(0);

if (osType.toLowerCase() === 'darwin') {
  osType = 'Mac OS X';
}

let indexRoute = (req, res) => {
  let dataObject = {
    osType: osType,
    osReleaseVersion: osReleaseVersion,
    osArch: osArch,
    osCPUs: osCPUs,
    osHostname: osHostname,
    osTotalMemory: osTotalMemory
  };

  res.render(__dirname + '/index', { data: dataObject});
};

router.route('/').get(indexRoute);

server.listen(app.get('port'), () => {
  console.log('Magic happens on port ' + app.get('port'));
});
