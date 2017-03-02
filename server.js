// require dependencies
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var sessionCookie = require('./session-cookie.js');
var sessionFlashes = require('./session-flashes.js');
var app = express();
var port = 8080;

// set static files (css, images etc) location
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());

app.use(sessionCookie());

app.use(sessionFlashes());

// use ejs and express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// route app
var router = require('./app/routes');
app.use('/', router);

//start server
app.listen(port, function () {
  console.log('app started');
});
