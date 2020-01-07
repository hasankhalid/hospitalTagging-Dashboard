import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, GridCell } from '@rmwc/grid';
import axios from 'axios'

class StackedBarChart extends Component {
  componentDidMount() {
    axios.get(`https://gat-gt.herokuapp.com/api/warrantystatus`)
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
          <h2 style={{color: '#303F9F', fontWeight: '500'}}>Equipment Warranty Status Summary by Hospital</h2>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart width={600} height={300} data={this.state.data}
                  margin={{top: 20, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name" tick={{ fill: 'white' }}/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <Bar isAnimationActive={false} barSize={20} dataKey="Warranty" fill="#2e7d32" />
              <Bar isAnimationActive={false} barSize={20} dataKey="WithoutWarranty" stackId="a" fill="#f44336" />
            </BarChart>
          </ResponsiveContainer>
        </GridCell>
      </Grid>
    )
  }
}

export default StackedBarChart;
