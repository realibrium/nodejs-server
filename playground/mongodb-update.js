
// Installed the mongodb module with npm
// $ npm install mongodb --save

// Using Destructuring this can be written
const {MongoClient, ObjectID} = require('mongodb');

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

 console.log('#####################################################################');
 console.log('#####################################################################');
 // findOneAndUpdate by _id
 db.collection('Todos').findOneAndUpdate(
   { _id: new ObjectID('5c36954c0afff2c0c5452f10')},
   { $set: { completed: true } },
   {returnOriginal: false}
 ).then((result) => {
   console.log('findAndUpdate:', result);
 });
 console.log('#####################################################################');
 console.log('#####################################################################');

 console.log('#####################################################################');
 console.log('#####################################################################');
 // findOneAndUpdate in Users by _id, change name and increment age
 db.collection('Users').findOneAndUpdate(
   { _id: new ObjectID('5c3691170afff2c0c5452e11')},
   { $set: { name: 'Elias'}, $inc: {age: 1} },
   { returnOriginal: false}
 ).then((result) => {
   console.log('findAndUpdate:', result);
 });
 console.log('#####################################################################');
 console.log('#####################################################################');

  //Close connection to MongoDB server
  client.close();
});
