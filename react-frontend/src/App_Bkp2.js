import './App.css';
import React, { Component } from 'react';
import LineChart from './LineChart/LineChart.js'
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);

    // this.getxaxisAndSeries=this.getxaxisAndSeries.bind(this);  
   
    this.state = {
  
      options : {
        chart: {
          id: "basic-chart-1"
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 10]
        }
      },

    series : [
        {
          name: "series-1",
          data: [0, 0, 0, 0, 0, 0, 0, 1,0]
        }
      ],

      readings : [],

      sensorIDs : ['S1','S2'],

      timerIDs : [],

      lineChartOptionsS1 : {
        chart: {
          id: "lineChartOptionsS1"
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
      },

      lineChartSeriesS1 : [
        {
          name: "lineChartSeriesS1",
          data: [0, 0, 0, 0, 0, 0, 0, 0]
        }
      ],

      lineChartOptionsS2 : {
        chart: {
          id: "lineChartOptionsS2"
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
      },

      lineChartSeriesS2 : [
        {
          name: "lineChartSeriesS2",
          data: [0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]     
    
    };
  }
    

  lineCharts = null;


  getxaxisAndSeries = (data, sensorID) =>
  {
    // console.log(sensorID);
    let line_chart_options_id = "lineChartOptions"+sensorID;
    let line_chart_series_id = "lineChartSeries"+sensorID;

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
        name: line_chart_series_id,
        data: data_new
      }
    ];

    let new_options = {
      chart: {
        id:  line_chart_options_id
      },
      xaxis: {
        categories: xaxis_new
      }
    };
    
    //Update state  
    this.setState({[`${line_chart_options_id}`]:new_options});
    this.setState({[`${line_chart_series_id}`]:new_series});
    // if (sensorID==='S1'){
    //   console.log('Updating S1 state');
    //   this.setState({lineChartOptionsS1:new_options});
    //   this.setState({lineChartSeriesS1:new_series});
    // }
    // else if (sensorID==='S2'){
    //   console.log('Updating S2 state');
    //   this.setState({lineChartOptionsS2:new_options});
    //   this.setState({lineChartSeriesS2:new_series});
    // }

    // console.log(this.state);
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
    let timerIDs_List = [];
    let s = 0;

    for(s=0;s<this.state.sensorIDs.length;s++)
    {
      // console.log(this.state.sensorIDs[s]);
      let sensorID = this.state.sensorIDs[s];
      this.timerID = setInterval(
        () => this.getSensorReadings(sensorID),1000);

      timerIDs_List.push(this.timerID);
    }
    //Update state
    this.setState({timerIDs:timerIDs_List});
    }

  stopMonitoringHandler = () => {
    let s1= 0;

    for(s1=0;s1<this.state.timerIDs.length;s1++)
    {
      clearInterval(this.state.timerIDs[s1]);
    }
    
    //Update state
    this.setState({timerIDs:[]});
  }  

  componentWillUnmount()
  {
    clearInterval(this.timerID);
  }

  //Create charts by looping use map function
  createLineCharts() //Note: Not using as charts do not refresh when create dynamically
  {

  this.lineCharts = (
    <div>
    {
      this.state.sensorIDs.map(sensorID =>{    
      
      let line_chart_options_id = "lineChartOptions"+sensorID;
      let line_chart_series_id = "lineChartSeries"+sensorID;

      // //Initial values
      // let options = {
      //   chart: {
      //     id: line_chart_options_id
      //   },
      //   xaxis: {
      //     categories: [1, 2, 3, 4, 5, 6, 7, 8, 99]
      //   }
      // };

      // //Initial values
      // let series = [
      //   {
      //     name: line_chart_series_id,
      //     data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
      //   }
      // ];

      //Set the options and series in state object
      // this.setState({line_chart_options_id:options});
      // this.setState({line_chart_series_id:series}); 
      // this.setState({ [`${line_chart_options_id}`]: options });
      // this.setState({ [`${line_chart_series_id}`]: series });

      // this.setState({lineChartOptionsS1:options});
      // this.setState({ [`${line_chart_options_id}`]: options });
      // this.setState({ this.state.line_chart_options_id: options });
      
      // console.log(options);
      // console.log(this.state);
      // console.log(line_chart_options_id);
      // console.log(this.state[`${line_chart_options_id}`]);
      

      // this.setState({ [`${line_chart_options_id}`]: options }, () => {
      //   console.log(this.state);
      // });


      // return <LineChart options={this.state.options[0]} series={this.state.series[0]}/>  
      return <LineChart options={this.state[`${line_chart_options_id}`]} series={this.state[`${line_chart_series_id}`]}  key={sensorID}   />      //key={ Math.random().toString(36).substr(2, 9) }

      // if(sensorID==='S1'){
      //   return <LineChart options={this.state.lineChartOptionsS1} series={this.state.lineChartSeriesS1}  key={sensorID}   />
      // } else if(sensorID==='S2'){
      //   return <LineChart options={this.state.lineChartOptionsS2} series={this.state.lineChartSeriesS2}  key= {sensorID}   />
      // }      

        })
        }
        </div>
      );

      return this.lineCharts;
    }

    componentDidMount() {
      // this.createLineCharts();
    }

    render () {
      return (
      <div className="App">
        <h1>Stream Monitor</h1>
        
        {this.createLineCharts()}
        
        <button onClick={this.startMonitoringHandler}>Start Monitoring</button>
        <button onClick={this.stopMonitoringHandler}>Stop Monitoring</button>
        
      </div>     
      );
    }
}

export default App;