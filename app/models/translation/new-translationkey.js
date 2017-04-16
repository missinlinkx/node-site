// create a new user on the registration page

var TranslationKey = require('./translation-model.js');

function addTranslation (formData, callback) {
  var errors = [];

  // check user input
  // ADD VERIFICATION FOR APP INPUT?!
  if (!/[A-Z]{2}/.test(formData.language)) {
    errors.push('Please enter a 2-letter language code in uppercase. (XX)');
  }
  if (!/^[a-zA-Z][a-zA-Z]*(-[a-zA-Z]+)*#{2}.+$/.test(formData.key)) {
    errors.push('Please check the translation key formatting. (originComponent##stringToBeTranslated)');
  }
  if (errors.length > 0) {
    return callback(errors);
  }
  // check database for duplicate keys or translation strings
  return TranslationKey.find({$or: [{key: formData.key}, {translation: formData.translation}]}, function (err, translationKeys) {
    if (err) return callback(err);
    if (translationKeys && translationKeys.length) {
      translationKeys.forEach(function (translationKey) {
        if (translationKey.key === formData.key) {
          console.log('found this key',key,'in this language',formData.language,'already');
          errors.push('Key already exists in this language.');
        }

        if (translationKey.translation === formData.translation) {
          console.log('found this translation',translation,'in this language',formData.language,'already');
          errors.push('Tranlation string already exists in this language.');
        }
      });

      return callback(errors);
    }

    // if no conflicts are found, proceed to store form data as per user model
    var newTranslationKey = TranslationKey({
      app: formData.app,
      language: formData.language,
      key: formData.key,
      translation: formData.translation
    });

    // save new user to database
    newTranslationKey.save(function(err, savedTranslationKey) {
      if (err) return callback(err);

      console.log('TranslationKey created!');
      console.log('TranslationKey has been saved as',savedTranslationKey);

      return callback(null, savedTranslationKey);
    });
  });
}

module.exports = addTranslation;
