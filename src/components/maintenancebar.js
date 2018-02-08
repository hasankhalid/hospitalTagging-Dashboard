import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, GridCell } from 'rmwc/Grid';
const data = [{name: 'Hospital A', Maintained: 600, NotMaintained: 400},
              {name: 'Hospital B', Maintained: 600, NotMaintained: 800},
              {name: 'Hospital C', Maintained: 1000, NotMaintained: 300},
              {name: 'Hospital D', Maintained: 900, NotMaintained: 200},
              {name: 'Hospital E', Maintained: 1408, NotMaintained: 100},
              {name: 'Hospital F', Maintained: 1000, NotMaintained: 400},
              {name: 'Hospital A', Maintained: 800, NotMaintained: 100},
              {name: 'Hospital B', Maintained: 800, NotMaintained: 50},
              {name: 'Hospital C', Maintained: 540, NotMaintained: 60},
              {name: 'Hospital D', Maintained: 510, NotMaintained: 90},
              {name: 'Hospital E', Maintained: 1320, NotMaintained: 200},
              {name: 'Hospital F', Maintained: 500, NotMaintained: 500},
              {name: 'Hospital A', Maintained: 800, NotMaintained: 300},
              {name: 'Hospital B', Maintained: 600, NotMaintained: 100},
              {name: 'Hospital C', Maintained: 750, NotMaintained: 200},
              {name: 'Hospital D', Maintained: 1200, NotMaintained: 50},
              {name: 'Hospital E', Maintained: 700, NotMaintained: 50}];


class MaintenanceChart extends Component {
  render (){
    return (
      <Grid>
      <GridCell span = "12">
        <h2>Equipment Maintenance Status Summary by Hospital</h2>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart width={600} height={300} data={data}
                margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar isAnimationActive={false} barSize={30} dataKey="Maintained" stackId="a" fill="#1F4788" />
            <Bar isAnimationActive={false} barSize={30} dataKey="NotMaintained" stackId="a" fill="#D24D57" />
          </BarChart>
        </ResponsiveContainer>
      </GridCell>
    </Grid>
    )
  }
}

export default MaintenanceChart;
