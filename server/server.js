//####################################################################
//####################################################################
//
// load express
var express = require('express');

// load body-parser
var bodyParser = require('body-parser');

// load ObjectID from mongodb library
var {ObjectID} = require('mongodb');

// load the mongoose from exports from ./db/mongoose.js
var {mongosse} = require('./db/mongoose.js');

// Load the Todo model
var {Todo} = require('./models/todo.js');

// Load the User  model
var {User} = require('./models/user.js');
//####################################################################
//####################################################################

//####################################################################
//####################################################################
//Declare the app
var app = express();
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// Use middleware to get the body data sent from the client with a POST
// Parse it as JSON and attach it to the request object of "app".
//This will be denoted as "request.body"
app.use(bodyParser.json());
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// POST Route which allows us to create new todos.
// Called Resource Creation
app.post('/todos', (req, res) => {
  // Create new todo and set the text from req.body.text property
  var todo = new Todo({
    text: req.body.text
  });

  //Save the model to the database
  todo.save().then((doc) => {
    // if save is successful then responde with the document
    res.send(doc);
  }, (error) => {
    // If error then send back a status of 400 with the error
    res.status(400).send(error);
  });
});
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// GET Route, allows us to read and list todos
app.get('/todos', (req, res) => {
  Todo.find().then((todosArray) => {
    //Send back an object with the todos array
    res.send({todosArray});
  }, (error) => {
    res.status(400).send(error);
  });
});

//####################################################################
//####################################################################

//####################################################################
//####################################################################
// GET Route, allow us to read and list a todo with an id variable in the Route
// the /todos/:id creates a paramter with a key-value pair for id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  //Validate the id using isValid
  if (!ObjectID.isValid(id)) {
    //Respond with a 404 - send an empty body
    return res.status(404).send();
  }

  // findById
  Todo.findById(id).then((todo) => {
    //success
      //if not todo - send back 404 with empty body
      if (!todo) {
        return res.status(404).send();
      }
      //if todo - send it back as an object so that other properties such as status can be sent
      res.send({todo: todo});

  }).catch((error) => {
    //Error
      //Send 400 - and send empty body back or the error
      res.status(400).send(error);
  });



});


//####################################################################
//####################################################################

//####################################################################
//####################################################################
// Listen in the port 3000
app.listen(3000, () => {
  console.log('Started on port 3000');
});
//####################################################################
//####################################################################





//Close the MongoDB connection
