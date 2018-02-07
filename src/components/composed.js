import React, {Component} from 'react'
import  { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const data = [{name: 'Hospital A', Recorded: 590, Functional: 800, NonFunctional: 1400},
              {name: 'Hospital B', Recorded: 868, Functional: 967, NonFunctional: 1506},
              {name: 'Hospital C', Recorded: 1397, Functional: 1098, NonFunctional: 989},
              {name: 'Hospital D', Recorded: 1480, Functional: 1200, NonFunctional: 1228},
              {name: 'Hospital E', Recorded: 1520, Functional: 1108, NonFunctional: 1100},
              {name: 'Hospital F', Recorded: 1400, Functional: 680, NonFunctional: 1700},
              {name: 'Hospital A', Recorded: 590, Functional: 800, NonFunctional: 1400},
              {name: 'Hospital B', Recorded: 868, Functional: 967, NonFunctional: 1506},
              {name: 'Hospital C', Recorded: 1397, Functional: 1098, NonFunctional: 989},
              {name: 'Hospital D', Recorded: 1480, Functional: 1200, NonFunctional: 1228},
              {name: 'Hospital E', Recorded: 1520, Functional: 1108, NonFunctional: 1100},
              {name: 'Hospital F', Recorded: 1400, Functional: 680, NonFunctional: 1700},
              {name: 'Hospital A', Recorded: 590, Functional: 800, NonFunctional: 1400},
              {name: 'Hospital B', Recorded: 868, Functional: 967, NonFunctional: 1506},
              {name: 'Hospital C', Recorded: 1397, Functional: 1098, NonFunctional: 989},
              {name: 'Hospital D', Recorded: 1480, Functional: 1200, NonFunctional: 1228},
              {name: 'Hospital E', Recorded: 1520, Functional: 1108, NonFunctional: 1100},
              {name: 'Hospital F', Recorded: 1400, Functional: 680, NonFunctional: 1700},
              {name: 'Hospital A', Recorded: 590, Functional: 800, NonFunctional: 1400},
              {name: 'Hospital B', Recorded: 868, Functional: 967, NonFunctional: 1506},
              {name: 'Hospital C', Recorded: 1397, Functional: 1098, NonFunctional: 989}];

class StatusComposedChart extends Component {
	render () {
  	return (
    	<ComposedChart width={window.screen.width} height={400} data={data}
            margin={{top: 20, right: 80, bottom: 20, left: 20}}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <CartesianGrid stroke='#f5f5f5'/>
          <Area type='monotone' dataKey='NonFunctional' fill='#8884d8' stroke='#8884d8'/>
          <Bar dataKey='Recorded' barSize={20} fill='#413ea0'/>
          <Line type='monotone' dataKey='Functional' stroke='#ff7300'/>
       </ComposedChart>
    );
  }
}

export default StatusComposedChart;
