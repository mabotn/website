// load node-js modules
var express = require('express')
var https = require('https')
var http = require('http')
var fs = require('fs')

// create express.js server instance
var app = express()

// https SSL options
var httpsOptions = {
    cert: fs.readFileSync('./ssl/cert.pem'),
    key : fs.readFileSync('./ssl/key.pem')
}

// set the port for the web app (process.env.PROT for production)
var port = process.env.PORT || 3000

// use public directory for website files (html, css, js ...)
app.use(express.static(__dirname + '/public'));

// to return index.html
app.get('/', function(req, res) {
    res.sendFile('index.html')
})

// Let's Encrypt verification key for SSL certification
app.get('/.well-known/acme-challenge/KdTkjttPdMDHQuHzpj1JBjudKFLn58C07-W87SalmEY', function(req, res) {
    res.send('KdTkjttPdMDHQuHzpj1JBjudKFLn58C07-W87SalmEY.k1vqNLUTVmPEyRVc5XqD4rePpeD6vEYAtwZNrz4g8Ao')
})

// run the web server
if (port == 3000) {
    // if in development mode
    app.listen(port)
} else {
    // if in production mode
    https.createServer(httpsOptions, app).listen(port)
}