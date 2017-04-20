// create a new translation key in the registration page

var TranslationKey = require('./translation-model.js');

function addTranslation (formData, callback) {
  var errors = [];

  // check user input
  // ADD VERIFICATION FOR APP INPUT?!
  if (!/^[A-Z]{2}$/.test(formData.language)) {
    errors.push('Please enter a 2-letter language code in uppercase. (XX)');
  }
  if (!/^[a-zA-Z][a-zA-Z]*(-[a-zA-Z]+)*#{2}.+$/.test(formData.key)) {
    errors.push('Please check the translation key formatting. (originComponent##stringToBeTranslated)');
  }
  if (errors.length > 0) {
    return callback(errors);
  }
  // check database for duplicate keys or translation strings (in the same language and for the same app)
  return TranslationKey.find({$or: [{key: formData.key}, {string: formData.translationString}]}, function (err, translationKeys) {
    if (err) return callback(err);
    if (translationKeys && translationKeys.length) {
      translationKeys.forEach(function (translationKey) {
        if (translationKey.language === formData.language && translationKey.app === formData.app) {
          if (translationKey.key === formData.key) {
            console.log('found this key',translationKey.key,'in this language',formData.language,'already');
            errors.push('Key already exists in this language for this app.');
          }
          if (translationKey.translationString === formData.translationString) {
            console.log('found this translation',translationKey.translationString,'in this language',formData.language,'already');
            errors.push('Translation string already exists in this language for this app.');
          }
        }
      });
      if (errors.length) {
        return callback(errors);
      } else {
        // if no conflicts are found, proceed to store form data as per translation key model
        var newTranslationKey = TranslationKey({
          app: formData.app,
          language: formData.language,
          key: formData.key,
          translationString: formData.translationString
        });

        // save new user to database
        newTranslationKey.save(function(err, savedTranslationKey) {
          if (err) return callback(err);

          console.log('TranslationKey created!');
          console.log('TranslationKey has been saved as',savedTranslationKey);

          return callback(null, savedTranslationKey);
        });
      }
    }
  });
}

module.exports = addTranslation;
