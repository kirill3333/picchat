const express = require('express')
const router = express.Router()
const winston = require('winston')
const userService = require('../service/user')

router.get('/get', (req, res) => {
  const phone = req.query.phone
  userService.getByPhone(phone)
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      winston.log('debug', error)
      res.status(500).send('Error to find user by phone')
    })
})

module.exports = router