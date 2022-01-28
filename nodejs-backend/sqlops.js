//Import the other files
var  config = require('./dbconfig');
const  sql = require('mssql');

async function getReadings(request) {
    try {
      let sensorID = '';
      sensorID = request.query.sensorID;
      let  pool = await  sql.connect(config);
      //Select last/descending 15 records and sort them ascending
      sqlQuery = "SELECT * FROM (SELECT TOP 24 [SensorID],[InsertDateTime],[Reading]  FROM [TestDB].[dbo].[SensorReadings] WHERE [SensorID] = '"+ sensorID +"' ORDER BY [InsertDateTime] DESC) aa ORDER BY [InsertDateTime] ASC";
      // console.log(sqlQuery);

      let  readings = await  pool.request().query(sqlQuery);
      console.log("Data retrieved..");
      // console.log(readings);
      
      return  readings.recordsets;
    }
    catch (error) {
      console.log(error);
    }
  }

  module.exports = { getReadings }