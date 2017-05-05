// edit entry in translation collection

var TranslationKey = require('./translation-model.js');

function editTranslation (formData, callback) {
  var errors = [];

  // check user input

  // check database for previous translation string associated with this key (in the same language and for the same app)
  return TranslationKey.find({$and: [{app: formData.app}, {key: formData.key}, {translationStrings: formData.translationStrings}]}, function (err, translationKeys) {
    if (err) return callback(err);
    if (translationKeys && translationKeys.length) {
      errors.push('You have not modified any translation strings.');
    }
    if (errors.length) {
      return callback(errors);
    } else {
      // if no conflicts are found, proceed to update translation key with form data
      TranslationKey.update({$and: [{app: formData.app}, {key: formData.key}]}, {$set: {translationStrings: formData.translationStrings}}, function (err, savedTranslationKey) {
        if (err) return callback(err);

        console.log('TranslationKey edited!');
        console.log('TranslationKey has been saved as',savedTranslationKey);

        return callback(null, savedTranslationKey);
      });
    }

  });
}

module.exports = editTranslation;
