// load node-js modules
var express = require('express')

// create express.js server instance
var app = express()

// set the port for the web app (process.env.PROT for production)
var port = process.env.PORT || 3000

// use public directory for website files (html, css, js ...)
app.use(express.static(__dirname + '/public'))

// to return index.html
app.get('/', function(req, res) {
    res.sendFile('index.html')
})

// API for quotes
app.get('/api/v1/quotes', function(req, res) {
    // require fs nodule
    var fs = require('fs')
    // read quotes/quotes.json file
    var content = fs.readFileSync('quotes/quotes.json')
    // parse JSON into JS Object
    var jsonContent = JSON.parse(content)
    // get a random index
    var random = Math.floor(Math.random() * jsonContent.length)
    // return json response of a random quote
    res.json(jsonContent[random])
})

// Let's Encrypt verification key for SSL certification
app.get('/.well-known/acme-challenge/KdTkjttPdMDHQuHzpj1JBjudKFLn58C07-W87SalmEY', function(req, res) {
    res.send('KdTkjttPdMDHQuHzpj1JBjudKFLn58C07-W87SalmEY.k1vqNLUTVmPEyRVc5XqD4rePpeD6vEYAtwZNrz4g8Ao')
})

// run the web server
app.listen(port)