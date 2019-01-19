// load the mongoose library
// mongoose supports callbacks by default
var mongoose = require('mongoose');

//Tell mongoose which promises library to use
mongoose.Promise = global.Promise;

// Connect to MongoDB with the URL
const MONGODB_URI =  process.env.MONGODB_URI
mongoose.connect(MONGODB_URI || 'mongodb://localhost:27017/TodoApp', {useNewUrlParser: true});

//Exports
module.exports = {
  mongoose: mongoose
};
