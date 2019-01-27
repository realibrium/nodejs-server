//####################################################################
//####################################################################
// Begin: Load NMP Modules
//####################################################################
//####################################################################

// Load lodash
var _ = require('lodash');

// Load express
var express = require('express');

// Load body-parser
var bodyParser = require('body-parser');

// Load ObjectID from mongodb library
var {ObjectID} = require('mongodb');

//####################################################################
//####################################################################
// End: Load NMP Modules
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// Begin: Load Project Methods
//####################################################################
//####################################################################

// Load the mongoose from exports from ./db/mongoose.js
var {mongosse} = require('./db/mongoose.js');

// Load the Todo model
var {Todo} = require('./models/todo.js');

// Load the User  model
var {User} = require('./models/user.js');

//####################################################################
//####################################################################
// End: Load Project Methods
//####################################################################
//####################################################################

//####################################################################
//####################################################################
//Declare the app
var app = express();

//Declare the port for use in Heroku setup
const port = process.env.PORT || 3000;
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
// Begin: POST Route
// Allows us to create new todos.
// Called Resource Creation
//####################################################################
//####################################################################

app.post('/todos', (req, res) => {
  // Create new todo and set the text from req.body.text property
  var todo = new Todo({
    text: req.body.text
  });

  //Save the model to the database
  todo.save().then((createdTodo) => {
    // if save is successful then send status 200 and send the document
    res.status(200).send({createdTodo: createdTodo});
  }, (error) => {
    // If error then send back a status of 400 with the error
    res.status(400).send(error);
  });
});

//####################################################################
//####################################################################
// End: POST Route
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// Begin: GET Route
// Allows us to read and list found todos Array
//####################################################################
//####################################################################

app.get('/todos', (req, res) => {
  Todo.find().then((foundTodosArray) => {
    //Send back an object with the todos array
    res.status(200).send({foundTodosArray: foundTodosArray});
  }, (error) => {
    res.status(400).send(error);
  });
});

//####################################################################
//####################################################################
// End: GET Route
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// Begin: GET Route with id
// Allow us to read and list a todo with an id variable in the Route
// the /todos/:id creates a paramter with a key-value pair for id
//####################################################################
//####################################################################

app.get('/todos/:id', (req, res) => {
  //Get id parameter passed on http string
  var id = req.params.id;

  //Validate the id using isValid
  if (!ObjectID.isValid(id)) {
    //Respond with a 404 - send an empty body
    return res.status(404).send();
  };

  // findById
  Todo.findById(id).then((foundTodoById) => {
    //success
      //if not todo - send back 404 with empty body
      if (!foundTodoById) {
        return res.status(404).send();
      }
      //if todo - send it back as an object so that other properties such as status can be sent
      res.status(200).send({foundTodoById: foundTodoById});

  }).catch((error) => {
    //Error
      //Send 400 - and send empty body back or the error
      res.status(400).send(error);
  });
});

//####################################################################
//####################################################################
// End: GET Route with id
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// Begin: DELETE Route
// allow us to delete a specific doc by id:
// Find by id and remove
//####################################################################
//####################################################################

app.delete('/todos/:id', (req, res) => {
  //Get id parameter passed on http string
  var id = req.params.id;

  //Validate the id using isValid
  if (!ObjectID.isValid(id)) {
    //Respond with a 404 - send an empty body
    return res.status(404).send();
  };

  // find by Id and Remove
  Todo.findByIdAndRemove(id).then((todoRemoved) => {
    //success
      //If Not todoRemoved send a status 404
      if (!todoRemoved) {
        return res.status(404).send();
      }
      //If todoRemoved send status 200 and send it back as an ObjectID
      res.status(200).send({todoRemoved: todoRemoved});

    //If Error
  }).catch((error) => {
    //Error
      //Send 400 - and send empty body back or the error
      res.status(400).send(error);
  });
});

//####################################################################
//####################################################################
// End: DELETE Route
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// Begin: UPDATE Route
// Allows us to update a specific doc by id:
//####################################################################
//####################################################################

app.patch('/todos/:id', (req, res) => {
  //Get id parameter passed on http string
  var id = req.params.id;

  // Get the body using the pick() method from loadash.
  // This allow us to filter the only properties that the user
  // is allowed to update: 'text' and 'completed'
  var body = _.pick(req.body, ['text', 'completed']);

  //Validate the id using isValid
  if (!ObjectID.isValid(id)) {
    //Respond with a 404 - send an empty body
    return res.status(404).send();
  };

  // Check if todo is completed
  if (_.isBoolean(body.completed) && body.completed) {
    // Use getTime() to set the 'completedAt' field
    // getTime() yields the number of miliseconds since midnight Jan 1, 1970
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null
  };

  //Now find the document by id and update it.
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todoUpdated) => {

    // If todoUpdated does not exist send a 404 and return skipping the remining steps
    if(!todoUpdated) {
      return res.status(404).send();
    }

    //If todoUpdated exist
    res.status(200).send({todoUpdated});
  }).catch((error) => {
    res.status(400).send();
  });

});

//####################################################################
//####################################################################
// End: UPDATE Route
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// Listen in the port 3000
app.listen(port, () => {
  console.log(`Started on port: ${port}`);
});
//####################################################################
//####################################################################





//Close the MongoDB connection
