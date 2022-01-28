var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var async = require('async');

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

console.log('Before var connection');
var connection = new Connection(config);
console.log('After var connection');

function Start(callback) {
    console.log('Starting...');
    callback(null, 'Jake', 'United States');
}

// function Insert(name, location, callback) {
//     console.log("Inserting '" + name + "' into Table...");

//     request = new Request(
//         'INSERT INTO TestSchema.Employees (Name, Location) OUTPUT INSERTED.Id VALUES (@Name, @Location);',
//         function(err, rowCount, rows) {
//         if (err) {
//             callback(err);
//         } else {
//             console.log(rowCount + ' row(s) inserted');
//             callback(null, 'Nikita', 'United States');
//         }
//         });
//     request.addParameter('Name', TYPES.NVarChar, name);
//     request.addParameter('Location', TYPES.NVarChar, location);

//     // Execute SQL statement
//     connection.execSql(request);
// }

// function Update(name, location, callback) {
//     console.log("Updating Location to '" + location + "' for '" + name + "'...");

//     // Update the employee record requested
//     request = new Request(
//     'UPDATE TestSchema.Employees SET Location=@Location WHERE Name = @Name;',
//     function(err, rowCount, rows) {
//         if (err) {
//         callback(err);
//         } else {
//         console.log(rowCount + ' row(s) updated');
//         callback(null, 'Jared');
//         }
//     });
//     request.addParameter('Name', TYPES.NVarChar, name);
//     request.addParameter('Location', TYPES.NVarChar, location);

//     // Execute SQL statement
//     connection.execSql(request);
// }

// function Delete(name, callback) {
//     console.log("Deleting '" + name + "' from Table...");

//     // Delete the employee record requested
//     request = new Request(
//         'DELETE FROM TestSchema.Employees WHERE Name = @Name;',
//         function(err, rowCount, rows) {
//         if (err) {
//             callback(err);
//         } else {
//             console.log(rowCount + ' row(s) deleted');
//             callback(null);
//         }
//         });
//     request.addParameter('Name', TYPES.NVarChar, name);

//     // Execute SQL statement
//     connection.execSql(request);
// }

function Read(callback) {
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
    'SELECT [SensorID],[InsertDateTime],[Reading]   FROM [TestDB].[dbo].[SensorReadings];',
    function(err, rowCount, rows) {
    if (err) {
        callback(err);
    } else {
        console.log(rowCount + ' row(s) returned');
        callback(null);
    }
    });

    // Print the rows read
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });

    // Execute SQL statement
    connection.execSql(request);
}

function Read2(callback) {
    console.log('Reading rows from the Table...');

    // Read all rows from table
    request = new Request(
    'SELECT [SensorID],[InsertDateTime],[Reading]   FROM [TestDB].[dbo].[SensorReadings];',
    function(err, rowCount, rows) {
    if (err) {
        callback(err);
    } else {
        console.log(rowCount + ' row(s) returned');
        callback(null);
    }
    });

    // Print the rows read
    var result = "";
    request.on('row', function(columns) {
        columns.forEach(function(column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                result += column.value + " ";
            }
        });
        console.log(result);
        // result = "";
    });

    // Execute SQL statement
    connection.execSql(request);

    return result; //Added
}

function Complete(err, result) {
    if (err) {
        callback(err);
    } else {
        connection.close();
        console.log("Done!");
    }
}

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
    console.log('IN connection.on()..');
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');

    // Execute all functions in the array serially
    async.waterfall([
        // Start,
        // Insert,
        // Update,
        // Delete,
        //Read,
        Read2
    ], Complete)
  }
});

// connection.connect();

function getReadings()
{    
    connection.connect();    
}

// Expose the function to be called from another file.
module.exports = { getReadings };