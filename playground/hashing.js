// Using Hashing with the NPM module called "crypto-js"
// Installation: $npm install crypto-js --save

const {SHA256} = require('crypto-js');

var message = 'I am user number 3';

// Encript the message into an object with SHA256
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

//This is called the JSON Web Token
var data = {
  id: 4
};

// This toke allows us to send the data with a hash checking mechanism to verify
// if the data is valid
var token = {
  data,
  // The hash can be salted by adding a string as follows
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

// We recompute the salted hash at the receiving end to see if the data is valid
var resultHash = SHA256(JSON.stringify(token.data) + 'somesecre').toString();

// Compare resultHash and token.hash
if (resultHash === token.hash) {
  console.log('Data is valid');
} else {
  console.log('Data was changed. Do not trust it.');
};
