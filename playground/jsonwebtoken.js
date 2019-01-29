// Using Hashing with the NPM library called "crypto-js"
// Installation: $ npm install crypto-js --save

const {SHA256} = require('crypto-js');

// Using the JSON Web Token library
// Installation: $ npm install jsonwebtoken --save
const jwt = require('jsonwebtoken');

//Methods from JSON Web Token library
// jwt.sign takes the data with the user id and signs it.
// It creates the hash and returns the token value

var data = {
  id: 10
};

// Create the token with hashing salted
var token = jwt.sign(data, 'this is the secret');
console.log(`Token: ${token}`);

// jwt.verify does the oposite. It takes the token and verifies that the data was
// not manipulated

var decoded = jwt.verify(token, 'this is the secret');
console.log(`Decoded: ${JSON.stringify(decoded, undefined, 2)}`);
