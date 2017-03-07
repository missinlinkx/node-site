var User = require('./user-model.js');


function addUser (formData, callback) {
  var errors = [];

  if (formData.password !== formData.pwdconf) {
    errors.push('Passwords entered do not match');
  }

  if (errors.length > 0) {
    return callback(errors);
  }

  var newUser = User({
    username: formData.username,
    password: formData.password,
    meta: { age: formData.age,
      favAlg: formData.favAlg
    }
  });
  console.log(newUser);
  newUser.save(function(err, savedUser) {
    if (err) return callback(err);

    console.log('User created!');

    return callback(null, savedUser);
  });

}

module.exports = addUser;
