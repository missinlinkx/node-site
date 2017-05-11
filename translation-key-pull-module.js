// mongoose translation key Schema
var TranslationKey = require('./app/models/translation/translation-model.js');
// module to create and save new translationKeys based on form data
var addTranslation = require('./app/models/translation/new-translationkey.js');


function trKeyPull (transJSON, selectedApp, selectedLanguage) {
Object.keys(transJSON).forEach(
  (trKey) => {
    var JSONdata = {
      app: selectedApp,
      language: selectedLanguage,
      key: trKey,
      translationStrings: transJSON[trKey]
    }
    console.log(JSONdata.key);
    TranslationKey.find({key: JSONdata.key}, function (err, translationKeys) {
      if (err) {
        var errorMessage = err;
        if (Array.isArray(err)) {
          errorMessage = err.join('\n');
        }
        console.log(err);
      }
      if (translationKeys && translationKeys.length) {
        var strings = translationKeys[0].translationStrings;
        strings[JSONdata.language] = JSONdata.translationStrings;
        translationKeys[0].translationStrings = strings;

        // mixed type of translationStrings means mongo needs to be told a modification has been made before saving (see translation model)
        translationKeys[0].markModified('translationStrings');
        translationKeys[0].save(function(err, savedTranslationKey) {
          if (err) throw err;

          console.log('updated:', savedTranslationKey);
        });

      } else {
        addTranslation(JSONdata, function (err, savedTranslationKey) {
          if (err) {
            var errorMessage = err;
            if (Array.isArray(err)) {
              errorMessage = err.join('\n');
            }
            console.log(err);
          }
          console.log('saved:',savedTranslationKey);
        });
      }
    });
  });
}

module.exports = trKeyPull;
