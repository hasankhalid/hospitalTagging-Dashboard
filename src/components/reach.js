import React, { Component } from 'react';
import { LinearProgress } from 'rmwc/LinearProgress';
import { Grid, GridCell } from 'rmwc/Grid';
import { Button } from 'rmwc/Button'
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
          <h2>Hospitals Reached</h2>
          <LinearProgress progress={this.state.reach}></LinearProgress>
        </GridCell>
        <GridCell span="12">
          <Button onClick={(e) => this.Scroll()} unelevated>View Hospitals</Button>
        </GridCell>
      </Grid>
    )
  }
}

export default Reach;
