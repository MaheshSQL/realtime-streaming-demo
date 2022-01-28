var express = require('express'); // requre the express framework
var app = express();

var  SqlOps = require('./sqlops');
var  router = express.Router();

var  bodyParser = require('body-parser');
var  cors = require('cors');

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


var  port = process.env.PORT || 8090;
app.listen(port);
console.log('API is runnning at ' + port);

router.use((request, response, next) => {
    console.log('middleware');
    next();
  });

  router.route('/getReadings').get((request, response) => {
    SqlOps.getReadings(request).then((data) => {
      response.json(data[0]);
    })
  })

