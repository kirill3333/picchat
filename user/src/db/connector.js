const mysql = require('mysql')
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'example.org',
  user: 'bob',
  password: 'secret',
  database: 'my_db'
})

function getData(query) {
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

function setData(query) {
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
  console.log(query);
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