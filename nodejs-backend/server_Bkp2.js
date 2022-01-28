var express = require('express'); // requre the express framework
var app = express();

var  SqlOps = require('./sqlops');

// Endpoint to Get a list of users
app.get('/getReadings', function(req, res){
    SqlOps.getReadings(function(err, data){
        console.log(data);
        // res.end(data); // you can also use res.send()
        res.send(data)
    });
})

// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})
