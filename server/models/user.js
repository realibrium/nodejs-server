// load the mongoose library
// mongoose supports callbacks by default
var mongoose = require('mongoose');

//Define a Schema
var Schema = mongoose.Schema;

//Create a User model with email - require it, trim it, type string, min-lenght 1
var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    trim: true
  }
});

// Create a User mongoose data model. This will imply a collection name 'users'
var User = mongoose.model('User', userSchema);

//Exports
module.exports = {
  User: User
};
