import React, {Component} from 'react'
import  { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, GridCell } from 'rmwc/Grid';
import axios from 'axios'

class StatusComposedChart extends Component {

  componentDidMount() {
    axios.get(`https://gat-gt.herokuapp.com/api/eqstatus`)
        .then(response => this.setState({
          data: response.data.data
        }))
  }

  state = {
    data: []
  }

	render () {
    console.log(this.state.data)
  	return (
      <Grid>
      <GridCell span = "12">
        <h2 style={{color: '#303F9F'}}>Equipment Status Summary by Hospital</h2>
        <ResponsiveContainer width='100%' height={400}>
      	<ComposedChart data={this.state.data} width={window.screen.width} height={400}
              margin={{top: 20, right: 80, bottom: 20, left: 20}}>
            <XAxis dataKey="name" tick={{ fill: 'white' }}/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <CartesianGrid stroke='#f5f5f5'/>
            <Area isAnimationActive={true} type='monotone' dataKey='NonFunctional' fill='#FF4081' stroke='#8884d8'/>
            <Bar  isAnimationActive={true} dataKey='Recorded' barSize={20} fill='#455A64'/>
            <Line isAnimationActive={true} type='monotone' dataKey='Functional' stroke='#3F51B5'/>
         </ComposedChart>
         </ResponsiveContainer>
      </GridCell>
      </Grid>
    );
  }
}

export default StatusComposedChart;
