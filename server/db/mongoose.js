// load the mongoose library
// mongoose supports callbacks by default
var mongoose = require('mongoose');

//Tell mongoose which promises library to use
mongoose.Promise = global.Promise;

// Connect to MongoDB with the URL
mongoose.connect('mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

//Exports
module.exports = {
  mongoose: mongoose
};
