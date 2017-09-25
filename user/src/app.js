const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(6001, function () {
  console.log('user service started at 6001')
})