// edit entry in translation collection

var TranslationKey = require('./translation-model.js');

function editTranslation (formData, callback) {
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

  // check database for previous translation string associated with this key (in the same language and for the same app)
  return TranslationKey.find({$and: [{language: formData.language}, {app: formData.app}, {key: formData.key}, {translationString: formData.translationString}]}, function (err, translationKeys) {
    if (err) return callback(err);
    if (translationKeys && translationKeys.length) {
      errors.push('You have not modified the previous translation string.');
    }
    if (errors.length) {
      return callback(errors);
    } else {
      // if no conflicts are found, proceed to update translation key with form data

      TranslationKey.update({$and: [{language: formData.language}, {app: formData.app}, {key: formData.key}]}, {$set: {translationString: formData.translationString}}, function (err, savedTranslationKey) {
        if (err) return callback(err);

        console.log('TranslationKey edited!');
        console.log('TranslationKey has been saved as',savedTranslationKey);

        return callback(null, savedTranslationKey);
      });
    }

  });
}

module.exports = editTranslation;
