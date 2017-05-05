// delete entry in translation collection

var TranslationKey = require('./translation-model.js');

function deleteTranslation (formData, callback) {
  var errors = [];

  // check user input

  // check database for previous translation string associated with this key (in the same language and for the same app)
  return TranslationKey.find({$and: [{app: formData.app}, {key: formData.key}]}, function (err, translationKeys) {
    if (err) return callback(err);
    if (!translationKeys && !translationKeys.length) {
      errors.push('Translation key not found.');
    }
    if (errors.length) {
      return callback(errors);
    } else {
      // if no conflicts are found, proceed to delete translation key from DB
      translationKeys[0].remove(function (err, deletedTranslationKey) {
        if (err) return callback(err);

        console.log('TranslationKey deleted:',deletedTranslationKey);

        return callback(null, deletedTranslationKey);
      });
    }

  });
}

module.exports = deleteTranslation;
