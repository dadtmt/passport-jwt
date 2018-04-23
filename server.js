const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const html = `
<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <title>NodeJS server</title>
    <link rel="stylesheet" href="/bootstrap.min.css" />
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
