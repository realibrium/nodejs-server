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

// Create a Todo mongoose data model. This will imply a collection name 'todos'
var Todo = mongoose.model('Todo', todoSchema);

//Exports
module.exports = {
  Todo: Todo
};
