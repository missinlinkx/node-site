// create a new user on the registration page

var User = require('./user-model.js');


function addUser (formData, callback) {
  var errors = [];

  return User.find({email: formData.email}, function (err, user) {
    if (err) return callback(err);
    if (user && user.length >= 1) {
      console.log('found user with this email:',user);
      errors.push('E-mail address already registered on the site');
    }
    return User.find({username: formData.username}, function (err, user) {
      if (err) return callback(err);
      if (user && user.length >= 1) {
        errors.push('Username already registered on the site');
      }
      if (formData.password !== formData.pwdconf) {
        errors.push('Passwords entered do not match');
      }
      if (errors.length > 0) {
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
  });
}

module.exports = addUser;
