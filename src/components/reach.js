import React, { Component } from 'react';
import { LinearProgress } from '@rmwc/linear-progress';
import { Grid, GridCell } from '@rmwc/grid';
import { Button } from '@rmwc/button'
import axios from 'axios'

class Reach extends Component {
  Scroll = () => {
    window.scroll({
      top: 1800,
      left: 0,
      behavior: 'smooth'
    });
  }

  componentDidMount(){
    axios.get(`https://gat-gt.herokuapp.com/api/hospitalsreached`)
        .then(response => this.setState({
          reach: response.data.reach
        }))
   }

   state = {
     reach: ''
   }

  render () {
    return (
      <Grid>
        <GridCell span="12">
          <h2 style={{color: '#303F9F', fontWeight: '500'}}>Hospitals Reached</h2>
          <LinearProgress progress={this.state.reach}></LinearProgress>
        </GridCell>
        <GridCell span="12">
          <Button style={{backgroundColor: 'rgb(138, 138, 138)'}} onClick={(e) => this.Scroll()} unelevated>View Hospitals</Button>
        </GridCell>
      </Grid>
    )
  }
}

export default Reach;
