import React from "react";
import Chart from "react-apexcharts";

//Just a function that returns a JSX
const linechart = (props) => {      

    return (
        <div>            
            <Chart
                    options= {props.options}
                    series={props.series}
                    type="line"
                    width="1200px"
                    height="300px"                    
                    />
                    
            </div>
        );
}

export default linechart;