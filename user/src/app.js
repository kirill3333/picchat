require('dotenv').config()
const express = require('express')
const winston = require('winston')
const bodyParser = require('body-parser')
const registerRouter = require('./router/register')
const userRouter = require('./router/user')
const app = express()

winston.level = process.env.LOG_LEVEL

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/user', registerRouter)
app.use('/user', userRouter)

app.listen(6001, () => winston.log('info', 'User service started at 6001'))