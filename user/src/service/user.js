const squel = require('squel')
const uuidv4 = require('uuid/v4')
const passwordHash = require('password-hash')
const connector = require('../db/mysql.connector')

function checkByName(name) {
  if (!name) return Promise.reject('Empty name')

  const query = squel.select()
    .from("user")
    .where('nick = ?', name)
    .toString()

  return connector.query(query)
    .then((results) => !(results && results.length > 0))
    .catch((error) => {
      winston.log('debug', error)
      return false
    })
}

function checkByPhone(mobile) {
  if (!mobile) return Promise.reject('Empty mobile')

  const query = squel.select()
    .from("user")
    .where('mobile = ?', mobile)
    .toString()

  return connector.query(query)
    .then((results) => !(results && results.length > 0))
    .catch((error) => {
      winston.log('debug', error)
      return false
    })
}

function getByPhone(mobile) {
  if (!mobile) return Promise.resolve({})

  const query = squel.select()
    .from("user")
    .where('mobile = ?', mobile)
    .toString()
  return connector.query(query)
    .then((results) => results[0])
}

function createUser(user) {
  const uuid = uuidv4()
  const hashedPassword = passwordHash.generate(user.password)

  const query = squel
    .insert()
    .into('user')
    .setFields({
      uuid: uuid,
      password: hashedPassword,
      mobile: user.mobile,
      nick: user.nick
    })
    .toString()

  return connector.process(query)
}

module.exports = {
  checkByName: checkByName,
  checkByPhone: checkByPhone,
  create: createUser,
  getByPhone
}