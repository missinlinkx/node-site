// user model for new-user creation in mongoDB

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodesite_users');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  meta: {
    age: Number,
    favAlg: String
  },
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model('User', userSchema);

module.exports = User;
