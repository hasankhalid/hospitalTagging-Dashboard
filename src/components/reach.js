import React, { Component } from 'react';
import { LinearProgress } from 'rmwc/LinearProgress';
import { Grid, GridCell } from 'rmwc/Grid';

class Reach extends Component {
  render () {
    return (
      <Grid>
        <GridCell span="12">
          <h2>Hospitals Reached</h2>
          <LinearProgress progress={0.5}></LinearProgress>
        </GridCell>
      </Grid>
    )
  }
}

export default Reach;
