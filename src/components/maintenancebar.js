import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, GridCell } from 'rmwc/Grid';
import axios from 'axios'

class MaintenanceChart extends Component {
  componentDidMount() {
    axios.get(`https://gat-gt.herokuapp.com/api/eqmaintenancestatus`)
        .then(response => this.setState({
          data: response.data.data
        }))
  }

  state = {
    data: []
  }

  render (){
    return (
      <Grid>
      <GridCell span = "12">
        <h2>Equipment Maintenance Status Summary by Hospital</h2>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart width={600} height={300} data={this.state.data}
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
