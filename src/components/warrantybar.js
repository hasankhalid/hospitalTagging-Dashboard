import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, GridCell } from 'rmwc/Grid';
const data = [{name: 'Hospital A', Warranty: 600, WithoutWarranty: 400},
              {name: 'Hospital B', Warranty: 600, WithoutWarranty: 800},
              {name: 'Hospital C', Warranty: 1000, WithoutWarranty: 300},
              {name: 'Hospital D', Warranty: 900, WithoutWarranty: 200},
              {name: 'Hospital E', Warranty: 1408, WithoutWarranty: 100},
              {name: 'Hospital F', Warranty: 1000, WithoutWarranty: 400},
              {name: 'Hospital A', Warranty: 800, WithoutWarranty: 100},
              {name: 'Hospital B', Warranty: 800, WithoutWarranty: 50},
              {name: 'Hospital C', Warranty: 540, WithoutWarranty: 60},
              {name: 'Hospital D', Warranty: 510, WithoutWarranty: 90},
              {name: 'Hospital E', Warranty: 1320, WithoutWarranty: 200},
              {name: 'Hospital F', Warranty: 500, WithoutWarranty: 500},
              {name: 'Hospital A', Warranty: 800, WithoutWarranty: 300},
              {name: 'Hospital B', Warranty: 600, WithoutWarranty: 100},
              {name: 'Hospital C', Warranty: 750, WithoutWarranty: 200},
              {name: 'Hospital D', Warranty: 1200, WithoutWarranty: 50},
              {name: 'Hospital E', Warranty: 700, WithoutWarranty: 50},
              {name: 'Hospital F', Warranty: 1330, WithoutWarranty: 70},
              {name: 'Hospital A', Warranty: 470, WithoutWarranty: 120},
              {name: 'Hospital B', Warranty: 320, WithoutWarranty: 80},
              {name: 'Hospital C', Warranty: 850, WithoutWarranty: 300}];


class StackedBarChart extends Component {
  render (){
    return (
      <Grid>
      <GridCell span = "12">
        <h2>Equipment Warranty Status Summary by Hospital</h2>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart width={600} height={300} data={data}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar isAnimationActive={false} dataKey="Warranty" stackId="a" fill="#763568" />
            <Bar isAnimationActive={false} dataKey="WithoutWarranty" stackId="a" fill="#D24D57" />
          </BarChart>
        </ResponsiveContainer>
      </GridCell>
    </Grid>
    )
  }
}

export default StackedBarChart;
