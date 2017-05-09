// language model for creation in mongoDB

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/nodesite_users'); moved connect to routes file to handle multiple models

var Schema = mongoose.Schema;

var languageSchema = new Schema({
  name: String,
  code: String
});

var language = mongoose.model('language', languageSchema);

module.exports = language;
