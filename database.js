'use strict';
const connection = require('./connection').connection;
const marklogic = require('marklogic');
let connectToDb = () => {
  const db = marklogic.createDatabaseClient(connection);
  return db;
}

module.exports.db = connectToDb;
