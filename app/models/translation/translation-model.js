// user model for new-user creation in mongoDB

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/nodesite_users'); moved connect to routes file to handle multiple models

var Schema = mongoose.Schema;

var translationSchema = new Schema({
  app: String,
  key: String,
  translationStrings: Object
}, {strict: false}); //should enable dynamic schema

var translationKey = mongoose.model('translationKey', translationSchema);

module.exports = translationKey;
