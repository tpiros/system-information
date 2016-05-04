'use strict';
const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const io      = require('socket.io')(server);
const os      = require('os');
const socket  = require('./socket').connect(io, os);
const hbs     = require('express-handlebars');
const router  = express.Router();
const db      = require('./database').db();

app.set('port', 8080);
app.use('/', router);
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/js', express.static(__dirname + '/js'));
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

let dataObject = {
  osType: (os.type().toLowerCase() === 'darwin') ? 'Mac OS X' : os.type(),
  osReleaseVersion: os.release(),
  osArch: os.arch(),
  osCPUs: os.cpus(),
  osHostname: os.hostname(),
  osTotalMemory: Number(os.totalmem() / 1073741824).toFixed(0)
};

db.documents.write({
  uri: '/data/host.json',
  contentType: 'application/json',
  content: dataObject
}).result().then((response) => {
  console.log(response.documents[0].uri + ' inserted to the database.');
}).catch((error) => {
  console.log(error);
});

let indexRoute = (req, res) => {
  res.render(__dirname + '/index', { data: dataObject});
};

router.route('/').get(indexRoute);

server.listen(app.get('port'), () => {
  console.log('Magic happens on port ' + app.get('port'));
});
