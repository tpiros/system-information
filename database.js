'use strict';
const connection = require('./connection').connection;
const marklogic = require('marklogic');
let connectToDb = () => {
  const db = marklogic.createDatabaseClient(connection);
  return db;
}

let getQueryBuilder = () => {
  const qb = marklogic.queryBuilder;
  return qb;
}

module.exports = {
  db: connectToDb,
  qb: getQueryBuilder
};
