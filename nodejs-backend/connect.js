var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// Create connection to database
var config = {
    server: '127.0.0.1',//'127.0.0.1,1401', //'tcp:172.31.112.1,1433'
    authentication: {
        type: 'default',
        options: {
            userName: 'sa', // update me
            password: '!Password' // update me
        }
    },
    options: {
        database: 'TestDB',
        port: 1401,
        trustServerCertificate: true
    }
  }

try
{
    console.log('Before var connection');
    var connection = new Connection(config);
    console.log('After var connection');
}
catch(err)
{
    console.log(err.message)
}

console.log(connection.userName);


// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log('In error..');
    console.log(err);
  } else {
    console.log('Connected');
  }
});

connection.connect();