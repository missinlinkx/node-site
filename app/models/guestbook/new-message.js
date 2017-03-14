// create a new message on the contact page

var Message = require('./message-model.js');

function addMessage (formData, callback) {
  var errors = [];

  // check user input
  if (typeof formData.email !== 'string') {
    errors.push('Email entered is not a string of characters');
  } else if (!/^[a-zA-Z0-9].*@{1}.+\.{1}.+/.test(formData.email)) {
    errors.push('Please verify that you have entered a valid email address.');
  }

  if (errors.length > 0) {
    return callback(errors);
  }

  // if no conflicts are found, proceed to store form data as per message model
  var newMessage = Message({
    firstname: formData.firstname,
    lastname: formData.lastname,
    email: formData.email,
    message: formData.message,
  }); //29

  // save new message to database
  newMessage.save(function(err, savedMessage) {
    if (err) return callback(err);

    console.log('message has been saved as',savedMessage);

    return callback(null, savedMessage);
  });//37
}

module.exports = addMessage;
