const mysql = require('mysql')
const winston = require('winston')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

function queryData(query) {
  return getConnection().then((connection) => {
    return executeQuery(query, connection)
  }).then((response) => {
    releaseConnection(response.connection)
    return response.results
  }).catch((response) => {
    releaseConnection(response.connection)
    throw response.error
  })
}

function processData(query) {
  return getConnection().then((connection) => {
    return executeQuery(query, connection)
  }).then((response) => {
    releaseConnection(response.connection)
    return true
  }).catch((response) => {
    releaseConnection(response.connection)
    throw response.error
  })
}

function getConnection() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      resolve(connection)
    })
  })
}

const releaseConnection = (connection) => connection || connection.release()

function executeQuery(query, connection) {
  winston.log('debug', query)
  return new Promise((resolve, reject) => {
    connection.query(query, function (error, results, fields) {
      if (error) {
        let result = { error: error, connection: connection }
        reject(result)
      }

      let result = { results: results, fields: fields, connection: connection };
      resolve(result)
    });
  })
}

module.exports = {
  query: queryData,
  process: processData
}