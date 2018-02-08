import React, { Component } from 'react';
import { LinearProgress } from 'rmwc/LinearProgress';
import { Grid, GridCell } from 'rmwc/Grid';
import { Button } from 'rmwc/Button'

class Reach extends Component {
  Scroll = () => {
    window.scroll({
      top: 1800,
      left: 0,
      behavior: 'smooth'
    });
  }

  render () {
    return (
      <Grid>
        <GridCell span="12">
          <h2>Hospitals Reached</h2>
          <LinearProgress progress={0.5}></LinearProgress>
        </GridCell>
        <GridCell span="12">
          <Button onClick={(e) => this.Scroll()} unelevated>View Hospitals</Button>
        </GridCell>
      </Grid>
    )
  }
}

export default Reach;
