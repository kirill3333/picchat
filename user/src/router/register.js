const express = require('express')
const router = express.Router()
const winston = require('winston')
const userService = require('../service/user')

function validateUser(user) {
  return Promise.all([
    userService.checkByName(user.nick),
    userService.checkByPhone(user.mobile)
  ])
    .then((results) => {
      if (results[0] && results[1]) return user
      throw new Error('User is not valid')
    })
}

router.post('/register', (req, res) => {
  const user = {
    password: req.body.password,
    mobile: req.body.mobile,
    nick: req.body.nick
  }
  validateUser(user)
    .then(() => userService.create(user))
    .then(() => res.status(200).send('User created'))
    .catch((error) => {
      winston.log('debug', error)
      res.status(500).send('Error to create user')
    })
})

module.exports = router