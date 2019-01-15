
// Installed the mongodb module with npm
// $ npm install mongodb --save
//Declare the mongo client in order to connect to mongodb
const MongoClient = require('mongodb').MongoClient;

// Using Destructuring this can be written
// const {MongoClient} = require('mongodb');

// Database connection URL where database server is located
const url = 'mongodb://localhost:27017/';

// Database Name
const dbName = 'TodoApp';

// Basic connection to MongoDB server DB
// Use connect method to connect to the Server
MongoClient.connect(`${url}${dbName}`, function(err, client) {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //Define reference to the TodoApp
  const db = client.db(dbName);

  //Insert one object to the 'Todos' Collection

  //Define singleTodo object
  var singleTodo = {
    text: 'Something to do',
    completed: false
  };
  //Insert object
  db.collection('Todos').insertOne(singleTodo, function(err, result) {
    if (err) {
      return console.log('Unable to insert Todo', err);
    }
    //If successful show the object that was inserted in mongodb
    //The result.ops attribute stores all of the documents that were stored
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  //Insert a new document into the Users collection with
  //attributes name, age, location

  var userData = {
    name: 'Elias',
    age: 45,
    location: 'Miami Beach'
  };

  //Insert userData object into the Users Collection
  db.collection('Users').insertOne(userData, function(err, result) {
    if (err) {
      return console.log('Unable to insert userData', err);
    }
    //If successful show the userData that was inserted in mongodb
    //The result.ops attribute stores all of the documents that were stored
    console.log(JSON.stringify(result.ops, undefined, 2));
    console.log('The _id of this document is:', result.ops[0]._id);
    console.log('The data when this document was inserted was :', result.ops[0]._id.getTimestamp());
  });

  //Close connection to MongoDB server
  client.close();
});
