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
// POST Route which allows us to create new todos.
// Called Resource Creation
app.post('/todos', (req, res) => {
  // Create new todo and set the text from req.body.text property
  var todo = new Todo({
    text: req.body.text
  });

  //Save the model to the database
  todo.save().then((createdTodo) => {
    // if save is successful then send status 200 and send the document
    res.status(200).send({createdTodo});
  }, (error) => {
    // If error then send back a status of 400 with the error
    res.status(400).send(error);
  });
});
//####################################################################
//####################################################################

//####################################################################
//####################################################################
// GET Route, allows us to read and list found todos Array
app.get('/todos', (req, res) => {
  Todo.find().then((foundTodosArray) => {
    //Send back an object with the todos array
    res.status(200).send({foundTodosArray});
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

//####################################################################
//####################################################################
// DELETE Route, allow us to delete:
// remove all todos with Todo.remove({})
    // Todo.remove({}).then((result) => {
    //   console.log(result);
    // });

// find one and remove the first todo that matches a query
    // Todo.findOneAndRemove({_id: '5c44cbc2ca2bef865258d7cb'}).then((todoRemoved) => {
    //   console.log("Removed: ", todoRemoved);
    // });

// Find by id and findOneAndRemove
    // Todo.findByIdAndRemove('5c44cbc2ca2bef865258d7cb').then((todoRemoved) => {
    //   console.log("Removed: ", todoRemoved);
    // });
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

//####################################################################
//####################################################################
// Listen in the port 3000
app.listen(port, () => {
  console.log(`Started on port: ${port}`);
});
//####################################################################
//####################################################################





//Close the MongoDB connection
