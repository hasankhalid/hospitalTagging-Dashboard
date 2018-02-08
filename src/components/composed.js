import React, {Component} from 'react'
import  { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, GridCell } from 'rmwc/Grid';
const data = [{name: 'Hospital A', Recorded: 1000, Functional: 600, NonFunctional: 400},
              {name: 'Hospital B', Recorded: 1400, Functional: 600, NonFunctional: 800},
              {name: 'Hospital C', Recorded: 1300, Functional: 1000, NonFunctional: 300},
              {name: 'Hospital D', Recorded: 1100, Functional: 900, NonFunctional: 200},
              {name: 'Hospital E', Recorded: 1500, Functional: 1408, NonFunctional: 100},
              {name: 'Hospital F', Recorded: 1400, Functional: 1000, NonFunctional: 400},
              {name: 'Hospital A', Recorded: 900, Functional: 800, NonFunctional: 100},
              {name: 'Hospital B', Recorded: 850, Functional: 800, NonFunctional: 50},
              {name: 'Hospital C', Recorded: 600, Functional: 540, NonFunctional: 60},
              {name: 'Hospital D', Recorded: 600, Functional: 510, NonFunctional: 90},
              {name: 'Hospital E', Recorded: 1520, Functional: 1320, NonFunctional: 200},
              {name: 'Hospital F', Recorded: 1000, Functional: 500, NonFunctional: 500},
              {name: 'Hospital A', Recorded: 1100, Functional: 800, NonFunctional: 300},
              {name: 'Hospital B', Recorded: 700, Functional: 600, NonFunctional: 100},
              {name: 'Hospital C', Recorded: 950, Functional: 750, NonFunctional: 200},
              {name: 'Hospital D', Recorded: 1250, Functional: 1200, NonFunctional: 50},
              {name: 'Hospital E', Recorded: 750, Functional: 700, NonFunctional: 50},
              {name: 'Hospital F', Recorded: 1400, Functional: 1330, NonFunctional: 70},
              {name: 'Hospital A', Recorded: 590, Functional: 470, NonFunctional: 120},
              {name: 'Hospital B', Recorded: 400, Functional: 320, NonFunctional: 80},
              {name: 'Hospital C', Recorded: 1150, Functional: 850, NonFunctional: 300}];

class StatusComposedChart extends Component {
	render () {
  	return (
      <Grid>
      <GridCell span = "12">
        <h2>Equipment Status Summary by Hospital</h2>
        <ResponsiveContainer width='100%' height={400}>
      	<ComposedChart data={data} width={window.screen.width} height={400}
              margin={{top: 20, right: 80, bottom: 20, left: 20}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <CartesianGrid stroke='#f5f5f5'/>
            <Area isAnimationActive={false} type='monotone' dataKey='NonFunctional' fill='#9D2933' stroke='#8884d8'/>
            <Bar  isAnimationActive={false} dataKey='Recorded' barSize={20} fill='#1F4788'/>
            <Line isAnimationActive={false} type='monotone' dataKey='Functional' stroke='#22A7F0'/>
         </ComposedChart>
         </ResponsiveContainer>
      </GridCell>
      </Grid>
    );
  }
}

export default StatusComposedChart;
