const express = require('express')
const router = express.Router()
const userService = require('../service/user')

router.post('/register', (req, res) => {
  Promise.all([userService.checkByName(), userService.checkByPhone()])
    .then()
    .catch()
})