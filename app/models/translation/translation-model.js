// user model for new-user creation in mongoDB

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/nodesite_users'); moved connect to routes file

var Schema = mongoose.Schema;

var translationSchema = new Schema({
  app: String,
  language: String,
  key: String,
  translation: String
});

var translationKey = mongoose.model('translationKey', translationSchema);

module.exports = translationKey;
