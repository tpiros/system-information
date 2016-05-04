#Performance monitoring using Node.js, socket.io and MarkLogic

This is a sample application to showcase sockets. The application collects various system data and metrics using the `os` Node.js package and saves them to a MarkLogic database.

##Setup instructions

- Clone the repository
- `npm install`
- `npm install -b bower` (if you don't have bower already installed)
- `bower install`
- Edit `connection.js` to reflect your MarkLogic database connection parameters
- `node app.js`

##More information

- [Performance monitoring using Node.js, socket.io and MarkLogic - blog post](http://www.tamas.io/performance-monitoring-using-node-js-socket-io-and-marklogic/)
- [MarkLogic and Node.js Client API - blog post](http://www.tamas.io/marklogic-and-node-js/)
