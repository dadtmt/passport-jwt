const express = require('express')
const bodyParser = require('body-parser')

require('./passport-strategy')
const auth = require('./auth')

const app = express()

app.use(bodyParser.json())
app.use('/auth', auth)

const html = `
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <title>NodeJS server</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>
  <body>
    <h1>Simple express server</h1>
  </body>
</html>`

app.get('*', (req, res) => {
  res.send(html)
  res.end()
})

app.listen(8000)
