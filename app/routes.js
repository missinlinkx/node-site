// require express
var express = require('express');
var path = require('path');
var authGuardModule = require('../auth-guard.js');
var palindrome = require('../palindr-serv.js');
var levenshtein = require('../lev-serv.js');
var hanoi = require('../hanoi-serv.js');

// create router object
var router = express.Router();

var authGuard = authGuardModule({
  redirectUrl: '/login'
});

// export router
module.exports = router;

// // save username
// var saveU = function () {
//   var username = req.session.username;
//   if (username) {
//     res.locals.username = username;
//   }
//   next();
// }
// saveU();

// route for homepage
router.get('/', function (req, res) {
  res.cookie('your_name', 'value');

  var model = {
    lev: req.session.visitLev,
    alert: req.flash.loginStatus
  };
  req.session.visitLev = false;

  res.render('pages/home', model);
});

// route for about page
router.get('/about', function (req, res) {
  res.render('pages/about');
});

// route for contact page
router.get('/contact', function (req, res) {
  res.render('pages/contact');
});

router.post('/contact', function (req, res) {
    res.render('pages/contact', {
      fn: req.body.guestbookfirstname,
      ln: req.body.guestbooklastname
    });

});

// route for levs html page
router.get('/levs-html-page', authGuard,
function (req, res) {
  if (req.cookies.your_name === 'value') {
    req.session.visitLev = true;
    return res.render('pages/levs-html-page');
  }
  res.redirect('/');
});
router.post('/levs-html-page', function (req,res) {
  var value = levenshtein(req.body.str1, req.body.str2);
  res.render('pages/levs-html-page', {
    result: value
  });
});

// route for palindromes
router.get('/pals-html-page', function (req, res) {
  req.session.flashes['message'] = 'were the palindromes any fun?';
  model = {
    result: req.flash.result
  }
  res.render('pages/pals-html-page', model);
});
router.post('/pals-html-page', function (req, res) {
  var value = palindrome(req.body.word);
  req.session.flashes['result'] = value;
  res.redirect('/pals-html-page');
});

// route for hanoi towers
router.get('/hanois-html-page', function (req, res) {
  var model = {
    message: req.flash.message,
    result: req.flash.result
  }
  res.render('pages/hanois-html-page', model);
});
router.post('/hanois-html-page', function (req,res) {
  var value = hanoi(req.body.n);
  req.session.flashes['result'] = value;
  res.redirect('/hanois-html-page');
});

// route for login
router.get('/login', function (req, res) {
  var model = {
    warning: req.flash.loginStatus
  }
  res.render('pages/login', model);
});
router.post('/login', function (req,res) {
  var user = {
    username: req.body.username,
    password: req.body.password
  }
  if (user.username === 'jeanluc' && user.password === 'earlgr3y') {
    req.session['username'] = user.username;
    req.session.flashes['successMessage'] = 'You were successfully logged in!';
    req.session['loggedIn'] = true;
    req.session['username'] = user.username;
    return res.redirect('/');
  }
  req.session.flashes['errorMessage'] = 'Login unsuccessful, please try again';
  res.redirect('/login');
});

// route for logout
router.get('/logout', function (req, res) {
  delete req.session['username'];
  delete res.locals['username'];
  req.session['loggedIn'] = false;
  res.locals['loggedIn'] = false;
  res.render('pages/logout');
});
