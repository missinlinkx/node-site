// require express
var express = require('express');
var path = require('path');

// create router object
var router = express.Router();

// export router

module.exports = router;

// route for homepage
router.get('/', function (req, res) {
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

    //res.write('you posted:\n');
    res.render('pages/contact', {
      fn: req.body.guestbookfirstname,
      ln: req.body.guestbooklastname
    });

});

// route for levs html page
router.get('/levs-html-page', function (req, res) {
  res.render('pages/levs-html-page')
});

// route for palindromes
router.get('/pals-html-page', function (req, res) {
  res.render('pages/pals-html-page');
});

// route for hanoi towers
router.get('/hanois-html-page', function (req, res) {
  res.render('pages/hanois-html-page');
});
