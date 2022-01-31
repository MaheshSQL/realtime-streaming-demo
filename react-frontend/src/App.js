import './App.css';
import React, { Component } from 'react';
import Layout from './Components/Layout/Layout'
import LineChart from './Components/LineChart/LineChart.js'
import axios from 'axios';
import sensoricon from './sensor2.png'

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
        },
        colors: ['#FEB019']
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
        },
        colors: ['#00E396']
      },

      lineChartSeriesS2 : [
        {
          name: "lineChartSeriesS2",
          data: [0, 0, 0, 0, 0, 0, 0, 0]
        }
      ],
      
      lineChartOptionsS3 : {
        chart: {
          id: "lineChartOptionsS3"
        },
        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
      },

      lineChartSeriesS3 : [
        {
          name: "lineChartSeriesS3",
          data: [0, 0, 0, 0, 0, 0, 0, 0]
        }
      ]
    
    };
  }
    

  lineCharts = null;

  //Refresh state with new data
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
      // xaxis_new.push(data[i].InsertDateTime.substring(1,19)); //Get Date and Time until seconds
      xaxis_new.push(data[i].InsertDateTime.substring(11,19));    //Get only Time until seconds
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

  //Using axios which allows to get hold of the respone to pass to next method
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
  createLineCharts() 
  {
    this.lineCharts = (
      <div>
      {
        this.state.sensorIDs.map(sensorID =>{    
        
        let line_chart_options_id = "lineChartOptions"+sensorID;
        let line_chart_series_id = "lineChartSeries"+sensorID;     
        

        // Callback
        // this.setState({ [`${line_chart_options_id}`]: options }, () => {
        //   console.log(this.state);
        // });     

        // return <LineChart options={this.state.options[0]} series={this.state.series[0]}/>  
        return (
        <div key={'divCharts'+sensorID}>
          <table>
            <tbody>
              <tr>
                <td><img src={sensoricon} width='70%' width='70%'/> </td>
                <td><b>Sensor: {sensorID} </b></td>
              </tr>
            </tbody>
          </table>        

          <LineChart options={this.state[`${line_chart_options_id}`]} series={this.state[`${line_chart_series_id}`]}  key={sensorID}   />      
        </div>
        );
        
        //key={ Math.random().toString(36).substr(2, 9) }

          })
          }
          </div>
        );

        return this.lineCharts;
    }

    componentDidMount() {
      // this.createLineCharts();
    }

    //To demo chart order change
    changeOrdering = () => {
      let sensorIDsReversed = this.state.sensorIDs.reverse();
      this.setState({sensorIDs:sensorIDsReversed});
      
      this.createLineCharts();
      // this.forceUpdate();
    }


    render () {
      return (
      <div className="App">
        <Layout> 
        
        {/* <h1>Stream Monitor</h1> */}      
        <table className="Table1">
        <tbody>
            <tr>
              <td><button className="Button1" onClick={this.startMonitoringHandler} >Start </button></td>              
              <td><button className="Button2" onClick={this.changeOrdering}>Reorder </button></td>
              <td><button className="Button3" onClick={this.stopMonitoringHandler}>Stop </button></td>
            </tr>
            </tbody>
        </table> 
          
        <table className="Table2">
        <tbody>
            <tr>
              <td className="Td1">{this.createLineCharts()}</td>
              <td></td>
            </tr>             
        </tbody>
        </table>   

        </Layout>
      </div>     
      );
    }
}

export default App;
