// load express.js module into app
var express = require('express')
var app = express()

// set the port for the web app (process.env.PROT for production)
var port = process.env.PORT || 3000

// use public directory for website files (html, css, js ...)
app.use(express.static(__dirname + '/public'));

// to return index.html 
app.get('/', function(req, res) {
    res.sendFile('index.html')
})

app.get('/.well-known/acme-challenge/KdTkjttPdMDHQuHzpj1JBjudKFLn58C07-W87SalmEY', function(req, res) {
    res.send('KdTkjttPdMDHQuHzpj1JBjudKFLn58C07-W87SalmEY.k1vqNLUTVmPEyRVc5XqD4rePpeD6vEYAtwZNrz4g8Ao')
})

// run the NodeJs application
app.listen(port)