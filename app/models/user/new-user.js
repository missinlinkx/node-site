// create a new user on the registration page

var User = require('./user-model.js');

function addUser (formData, callback) {
  var errors = [];

  if (typeof formData.username !== 'string') {
    errors.push('Username entered is not a string of characters');
  } else if (!/^[a-zA-Z][a-zA-Z0-9]{2,}$/.test(formData.username)) {
    errors.push('Please verify that your username starts with a letter and has a length of at least 3 characters.');
  }
  if (formData.password !== formData.pwdconf) {
    errors.push('Passwords entered do not match.');
  }
  if (formData.password !== formData.password.trim()) {
    errors.push('Please verify that your password does not begin or end with a blank space.');
  }
  if (!/.{6,}/.test(formData.password)) {
    errors.push('Please verify that your password is at least 6 characters in length.');
  }
  if (errors.length > 0) {
    return callback(errors);
  }

  return User.find({$or: [{email: formData.email}, {username: formData.username}]}, function (err, users) {
    if (err) return callback(err);
    if (users && users.length) {
      users.forEach(function (user) {
        if (user.email === formData.email) {
          console.log('found user with this email:',user);
          errors.push('E-mail address already registered on the site.');
        }

        if (user.username === formData.username) {
          console.log('found user with this username:',user);
          errors.push('Username already registered on the site.');
        }
      });

      return callback(errors);
    }

    // if no coflicts are found, proceed to store form data as per user model
    var newUser = User({
      email: formData.email,
      username: formData.username,
      password: formData.password,
      meta: { age: formData.meta.age,
        favAlg: formData.meta.favAlg
      }
    });

    // save new user to database
    newUser.save(function(err, savedUser) {
      if (err) return callback(err);

      console.log('User created!');
      console.log('user has been saved as',savedUser);

      return callback(null, savedUser);
    });
  });
}

module.exports = addUser;
