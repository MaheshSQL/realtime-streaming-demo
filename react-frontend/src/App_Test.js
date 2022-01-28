import './App.css';
import React, { Component } from 'react';
import LineChart from './Components/LineChart/LineChart.js'
import axios from 'axios';

class App extends Component {
state = {
  options1 : {
    chart: {
      id: "abc"//"basic-chart"
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },

 series1 : [
    {
      name: "pqr",//"series-1",
      data: [0, 0, 0, 0, 0, 0, 0, 0]
    }
  ],

  readings : []
}

getxaxisAndSeries(data, sensorID)
{
  let xaxis_new = [];
  let i;
  //Create xaxis
  for(i=0;i<data.length;i++)
  {
    xaxis_new.push(data[i].InsertDateTime.substring(1,19)); //Get Date and Time until seconds
  }
  // console.log(xaxis_new);


  let data_new = [];
  let j;
  //Create series
  for(j=0;j<data.length;j++)
  {
    data_new.push(data[j].Reading); //Get Date and Time until seconds
  }
  // console.log(data_new);

  let new_series = [
    {
      name: "abc",
      data: data_new
    }
  ];

  let new_options = {
    chart: {
      id: "pqr"
    },
    xaxis: {
      categories: xaxis_new
    }
  };
  
  this.setState({options1:new_options});
  this.setState({series1:new_series});
}

getSensorReadings_OLD = (sensorID) => {
  // Simple GET request using fetch
  fetch('http://localhost:8090/api/getReadings?sensorID='+sensorID)      
      .then(response => response.json())
      .then(data => this.setState({ readings: data })); 
  // console.log(this.state.readings);
  this.getxaxisAndSeries();
}

getSensorReadings = async (sensorID) => {
  let response;
  let data;
  let dataEndpointURL = 'http://localhost:8090/api/getReadings?sensorID='+sensorID;
  // console.log(dataEndpointURL);
  response = await axios.get(dataEndpointURL);
  data = response.data;
  // response = response.json();
  // console.log(response);

  this.getxaxisAndSeries(data, sensorID);
}

// componentDidMount()
// {
//   this.timerID = setInterval(
//     () => this.getSensorReadings(),1000
//   );
// }

startMonitoringHandler = () => {
    this.timerID = setInterval(
      () => this.getSensorReadings('S1'),1000
    );
  }

stopMonitoringHandler = () => {
  clearInterval(this.timerID);
}  

componentWillUnmount()
{
  clearInterval(this.timerID);
}


render () {
  return (
  <div className="App">
    <h1>Stream Monitor</h1>
    <LineChart options={this.state.options1} series={this.state.series1}/>  
    
    <button onClick={this.startMonitoringHandler}>Start Monitoring</button>
    <button onClick={this.stopMonitoringHandler}>Stop Monitoring</button>
    
  </div>     
  );
}
}

export default App;
