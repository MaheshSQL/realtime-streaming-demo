import './App.css';
import React, { Component } from 'react';
import LineChart from './LineChart/LineChart.js'

class App extends Component {
state = {
  options : {
    chart: {
      id: "basic-chart"
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },

 series : [
    {
      name: "series-1",
      data: [0, 0, 0, 0, 0, 0, 0, 0]
    }
  ],

  readings : []
}

getxaxisAndSeries()
{
  let xaxis_new = [];
  let i;
  //Create xaxis
  for(i=0;i<this.state.readings.length;i++)
  {
    xaxis_new.push(this.state.readings[i].InsertDateTime.substring(1,19)); //Get Date and Time until seconds
  }
  // console.log(xaxis_new);


  let data_new = [];
  let j;
  //Create series
  for(j=0;j<this.state.readings.length;j++)
  {
    data_new.push(this.state.readings[j].Reading); //Get Date and Time until seconds
  }
  // console.log(data_new);

  let new_series = [
    {
      name: "series-1",
      data: data_new
    }
  ];

  let new_options = {
    chart: {
      id: "basic-chart"
    },
    xaxis: {
      categories: xaxis_new
    }
  };
  
  this.setState({options:new_options});
  this.setState({series:new_series});
}

getSensorReadings = (sensorID) => {
  // Simple GET request using fetch
  fetch('http://localhost:8090/api/getReadings?sensorID='+sensorID)      
      .then(response => response.json())
      .then(data => this.setState({ readings: data })); 
  // console.log(this.state.readings);
  this.getxaxisAndSeries();
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
    <LineChart options={this.state.options} series={this.state.series}/>  
    
    <button onClick={this.startMonitoringHandler}>Start Monitoring</button>
    <button onClick={this.stopMonitoringHandler}>Stop Monitoring</button>
    
  </div>     
  );
}
}

export default App;
