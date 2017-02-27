// require express
var express = require('express');
var path = require('path');

var palindrome = require('../palindr-serv.js');
var levenshtein = require('../lev-serv.js');
var hanoi = require('../hanoi-serv.js');

// create router object
var router = express.Router();

// export router
module.exports = router;

// route for homepage
router.get('/', function (req, res) {
  res.cookie('your_name', 'value');
  res.render('pages/home');
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
router.get('/levs-html-page', function (req, res) {
  if (req.cookies.your_name === 'value') {
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
  res.render('pages/pals-html-page');
});
router.post('/pals-html-page', function (req, res) {
  var value = palindrome(req.body.word);
  res.render('pages/pals-html-page', {
    result: value
  });
});

// route for hanoi towers
router.get('/hanois-html-page', function (req, res) {
  res.render('pages/hanois-html-page');
});
router.post('/hanois-html-page', function (req,res) {
  var value = hanoi(req.body.n);
  res.render('pages/hanois-html-page', {
    result: value
  });
});
