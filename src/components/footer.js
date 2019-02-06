import React, { Component } from 'react';
import { Grid, GridCell } from 'rmwc/Grid';
import logo from './advance.png';

class Footer extends Component {
  render () {
    return (
      <footer  className="footer">
        <Grid>
          <GridCell span="12" style={{display: 'flex', justifyContent: 'space-between'}}>
            <img src={logo} className="advance"/>
            <span style={{alignSelf: 'center'}}>Advance Systems © 2018</span>
          </GridCell>
        </Grid>
      </footer>
    )
  }
}

export default Footer;
