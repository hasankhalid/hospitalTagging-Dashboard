import React, { Component } from 'react';
import { Grid, GridCell } from 'rmwc/Grid';

class Footer extends Component {
  render () {
    return (
      <footer  className="footer">
        <Grid>
          <GridCell span="12">
            <span>Developed by GAT Consulting. ©</span>
          </GridCell>
        </Grid>
      </footer>
    )
  }
}

export default Footer;
