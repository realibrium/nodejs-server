// load the mongoose library
// mongoose supports callbacks by default
var mongoose = require('mongoose');

//Define a Schema
var Schema = mongoose.Schema;

var todoSchema = new Schema({
  text: {
    type: String,
    required: true,
    minlength: 5,
    trim: true //Trim spaces at the beginning and end of the string
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

//Tell mongoose which promises library to use
mongoose.Promise = global.Promise;

// Connect to MongoDB with the URL
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

// Create a Todo mongoose data model. This will imply a collection name 'todos'
var Todo = mongoose.model('Todo', todoSchema);

//Test the connection by adding a document
var newTodo = new Todo({
  text: '    Say Hello to Patty 2    ',
  // completed: false,
  // completedAt: 300
});

//Save the document to the mongodb
newTodo.save().then((doc) => {
    console.log('Saved todo: ', JSON.stringify(doc, undefined,2));
}, (error) => {
  console.log('Unable to save todo. Error: ', error);
});

var otherNewTodo = new Todo({
  text: 'Go to the university',
  completed: false,
  completedAt: 1005
});

//Save the document to the mongodb
otherNewTodo.save().then((doc) => {
    console.log('Saved todo: ', JSON.stringify(doc, undefined,2));
}, (error) => {
  console.log('Unable to save todo. Error: ', error);
});


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

var newUser = new User({
  email: '   peter@me.com  '
});

//Save the newUser document to the Users collection in mongodb
newUser.save().then((doc) => {
  console.log('Saved user: ', JSON.stringify(doc, undefined,2));
}, (error) => {
console.log('Unable to save user. Error: ', error);
});



//Close the MongoDB connection
