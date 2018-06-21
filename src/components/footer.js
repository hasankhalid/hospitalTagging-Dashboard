import React, { Component } from 'react';
import { Grid, GridCell } from 'rmwc/Grid';


class Footer extends Component {
  render () {
    return (
      <footer  className="footer">
        <Grid>
          <GridCell span="12" style={{display: 'flex', justifyContent: 'space-between'}}>
            <span style={{alignSelf: 'center'}}>Developed by Advance Systems. © 2018</span>
          </GridCell>
        </Grid>
      </footer>
    )
  }
}

export default Footer;
