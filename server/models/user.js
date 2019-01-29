// load the mongoose library
// mongoose supports callbacks by default
var mongoose = require('mongoose');

// load the validator library
var validator = require('validator');

// Using the JSON Web Token library
// Installation: $ npm install jsonwebtoken --save
const jwt = require('jsonwebtoken');

// Load lodash
var _ = require('lodash');


//Define a Schema
var Schema = mongoose.Schema;

//Create a User model with email - require it, trim it, type string, min-lenght 1
var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    trim: true,
    unique: true,
    validate: {
      validator: (value) => {
        //Check if the email is valid
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

//####################################################################
//####################################################################
// Begin: Create Methods for the UserSchema
//####################################################################
//####################################################################

// Overriding method to only return the _id and email
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};


UserSchema.methods.generateAuthToken = function () {
  // Make user equal to UserSchema
  var user = this;

  var userAccess = 'auth';

// Declare the user data object
  var userData = {
    _id: user._id.toHexString(),
    access: userAccess
  };
  var secretPhrase = 'This is my secret phrase';

  // Create the token with hashing salted
  var userToken = jwt.sign(userData, secretPhrase).toString();
  console.log(`Inside Token: ${userToken}`);

  // Set the token in the user user schema model
  // If there are issues then replace user.tokens.push with user.tokens.concat
  user.tokens.push({
    access: userAccess,
    token: userToken
  });
  console.log(`Inside user: ${user}`);

  // Now return the token and save the user schema model to the database
  return user.save().then(() => {
    return userToken;
  });
};

//####################################################################
//####################################################################
// Begin: Create Methods for the UserSchema
//####################################################################
//####################################################################

// Create a User mongoose data model. This will imply a collection name 'users'
var User = mongoose.model('User', UserSchema);

//Exports
module.exports = {
  User: User
};
