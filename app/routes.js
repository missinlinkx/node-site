// require express and modules
var express = require('express');
var path = require('path');

// verify if user is logged in and redirect if not
var authGuardModule = require('../auth-guard.js');

// require mongoose and establish DB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodesite_users');

// mongoose user schema
var User = require('./models/user/user-model.js');
// module to create and save new user based on registration form data
var addUser = require('./models/user/new-user.js');

// mongoose message Schema
var Message = require('./models/guestbook/message-model.js');
// module to create and save new message based on contact form data
var addMessage = require('./models/guestbook/new-message.js');

// algorithm modules
var palindrome = require('../palindr-serv.js');
var levenshtein = require('../lev-serv.js');
var hanoi = require('../hanoi-serv.js');

// create router object
var router = express.Router();

// redirect user to login page if not logged in
var authGuard = authGuardModule({
  redirectUrl: '/login'
});

// export router
module.exports = router;

// route for homepage
router.get('/', function (req, res) {
  // set cookie
  res.cookie('your_name', 'value');

  var model = {
    lev: req.session.visitLev,
    alert: req.flash.loginStatus,
    pagetitle: 'title-home'
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
  if (req.session.username) {
    User.find({username: req.session.username}, function(err, user){
      res.locals.email = user[0].email;
      return res.render('pages/contact');
    });
  }

  return res.render('pages/contact');

});

router.post('/contact', function (req, res) {
  var formData = {
    firstname: req.body.guestbookfirstname,
    lastname: req.body.guestbooklastname,
    email: req.body.guestbookemail,
    message: req.body.guestbookmsg,
  }

  addMessage(formData, function (err, savedMessage) {
    if (err) {
      var errorMessage = err;
      if (Array.isArray(err)) {
        errorMessage = err.join('\n');
      }
      req.session.flashes['errorMessage'] = errorMessage;
      req.session.flashes['prevReq'] = req.body;
      console.log('prev contact req',req.session.flashes.prevReq);

      return res.redirect('/contact');
    }

    req.session.flashes['successMessage'] = 'Your message was posted successfully!';
    return res.redirect('/contact');
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
  var formData = {
    username: req.body.username,
    password: req.body.password
  }
  User.find({username: formData.username}, function(err, user){
    if(err) throw error;
    console.log('formData', formData);
    console.log('DBuser', user);
    if (user && user.length === 1 && user[0].password === formData.password) {
      req.session['username'] = formData.username;
      req.session.flashes['successMessage'] = 'You were successfully logged in!';
      req.session['loggedIn'] = true;
      req.session['username'] = formData.username;
      return res.redirect('/');
    } else {
      req.session.flashes['errorMessage'] = 'Login unsuccessful, please try again';
      res.redirect('/login');
    }
  });

});

// route for logout
router.get('/logout', function (req, res) {
  delete req.session['username'];
  delete req.session['email'];
  delete res.locals['username'];
  delete res.locals['email'];
  req.session['loggedIn'] = false;
  res.locals['loggedIn'] = false;
  res.render('pages/logout');
});

// route for registration
router.get('/register', function (req, res) {
  res.render('pages/register');
});
router.post('/register', function (req, res) {
  var formData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    pwdconf: req.body.pwdconf,
    meta: { age: req.body.age,
      favAlg: req.body.algorithmRadios
    }
  }

  addUser(formData, function (err, savedUser) {
    if (err) {
      var errorMessage = err;
      if (Array.isArray(err)) {
        errorMessage = err.join('\n');
      }
      req.session.flashes['errorMessage'] = errorMessage;
      req.session.flashes['prevReq'] = req.body;

      return res.redirect('/register')
    }

    req.session.flashes['successMessage'] = 'You were successfully registered!';
    req.session['username'] = req.body.username;
    req.session['loggedIn'] = true;
    return res.redirect('/');
  });
});
