// require mongoose and establish DB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodesite_users');
// mongoose translation key Schema
var TranslationKey = require('./app/models/translation/translation-model.js');
// module to create and save new translationKeys based on form data
var addTranslation = require('./app/models/translation/new-translationkey.js');

var transJSON = require('./public/locales/cat/translation.json');

console.log(typeof transJSON);

Object.keys(transJSON).forEach(
  (key) => {
    var JSONdata = {
      app: 'default',
      language: 'CT',
      key: key,
      translationString: transJSON[key],
    }
    console.log(JSONdata);
    addTranslation(JSONdata, function (err, savedTranslationKey) {
      if (err) {
        var errorMessage = err;
        if (Array.isArray(err)) {
          errorMessage = err.join('\n');
        }
        console.log(err);
      }
    });
  });
