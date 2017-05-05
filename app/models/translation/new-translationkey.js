// create a new translation key in the registration page

var TranslationKey = require('./translation-model.js');

function addTranslation (formData, callback) {
  var errors = [];

  // check user input
  // app and language input fed from server

  if (!/^[a-zA-Z][a-zA-Z]*(-[a-zA-Z]+)*#{2}.+$/.test(formData.key)) {
    errors.push('Please check the translation key formatting. (originComponent##stringToBeTranslated)');
  }
  if (errors.length > 0) {
    return callback(errors);
  }
  // check database for duplicate keys or translation strings (in the same language and for the same app)
  return TranslationKey.find({$and: [{app: formData.app}, {key: formData.key}]}, function (err, translationKeys) {
    if (err) return callback(err);

    if (translationKeys && translationKeys.length) {
      console.log('found this key',translationKeys[0].key,'already');
      errors.push('Key already exists for this app.');
    }

    if (errors.length) {
      return callback(errors);
    } else {
      // if no conflicts are found, proceed to store form data as per translation key model
      var newTranslationKey = TranslationKey({
        app: formData.app,
        key: formData.key,
        translationStrings: {[formData.language]: formData.translationStrings}
      });

      // save new user to database
      newTranslationKey.save(function(err, savedTranslationKey) {
        if (err) return callback(err);

        console.log('TranslationKey created!');
        console.log('TranslationKey has been saved as',savedTranslationKey);

        return callback(null, savedTranslationKey);
      });
    }

  });
}

module.exports = addTranslation;
