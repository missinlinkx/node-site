// app model for creation in mongoDB

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/nodesite_users'); moved connect to routes file to handle multiple models

var Schema = mongoose.Schema;

var appSchema = new Schema({
  name: String
});

var app = mongoose.model('app', appSchema);

module.exports = app;
