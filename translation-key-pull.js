// require mongoose and establish DB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodesite_users');
// mongoose translation key Schema
var TranslationKey = require('./app/models/translation/translation-model.js');
// module to create and save new translationKeys based on form data
var addTranslation = require('./app/models/translation/new-translationkey.js');

var transJSON = require('./public/locales/en/translation0.json');

console.log(typeof transJSON);

Object.keys(transJSON).forEach(
  (trKey) => {
    var JSONdata = {
      app: 'sso-web-app',
      language: 'EN',
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
      console.log(translationKeys);
      if (translationKeys && translationKeys.length) {
        var strings = translationKeys[0].translationStrings;
        strings[JSONdata.language] = JSONdata.translationStrings;
        translationKeys[0].translationStrings = strings;

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
