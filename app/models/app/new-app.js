// create a new app

var App = require('./app-model.js');

function addApp (formData, callback) {
  var errors = [];
  // error checks if app management is added

  // if no conflicts are found, proceed to store form data as per message model
  var newApp = Language({
    name: formData.appName
  });

  // save new app to database

  newApp.save().then(function (savedApp) {

    console.log('app has been saved as',savedApp);
    return callback(null, savedApp);

  }).catch(function (err) {
    console.log('app could not be saved', err);
    return callback(err);
  });
}

module.exports = addApp;
