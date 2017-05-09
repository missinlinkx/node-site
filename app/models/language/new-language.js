// create a new language

var Language = require('./language-model.js');

function addLanguage (formData, callback) {
  var errors = [];
  // error checks if language management is added

  // if no conflicts are found, proceed to store form data as per message model
  var newLanguage = Language({
    name: formData.languageName,
    code: formData.languageCode,
  });

  // save new language to database

  newLanguage.save().then(function (savedLanguage) {

    console.log('language has been saved as',savedLanguage);
    return callback(null, savedLanguage);

  }).catch(function (err) {
    console.log('language could not be saved', err);
    return callback(err);
  });
}

module.exports = addLanguage;
