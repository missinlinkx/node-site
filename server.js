// require dependencies
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
var port = 8080;

var counter = 0;
var session = {};

// set static files (css, images etc) location
app.use(express.static(__dirname + '/public'));

app.use(cookieParser());

app.use(function(req,res,next) {
  var sid = req.cookies.sid;
  if (sid === undefined) {
    sid = counter++;
    res.cookie('sid', ''+sid);
    session[sid] = {};
  }
  req.session = session[sid];
  next();
});

app.use(function (req,res,next) {
  req.flash = req.session.flashes || {};
  req.session.flashes = {};
  next();
});

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
