// user model for new-user creation in mongoDB

var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/nodesite_users');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  message: String,
  created_at: Date,
});

// on every save, add the date
messageSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  // add current date to that field
  if (!this.created_at)
    this.created_at = currentDate;
  next();
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;
