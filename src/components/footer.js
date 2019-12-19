import React, { Component } from 'react';
import { Grid, GridCell } from '@rmwc/grid';
import logo from './advance.png';

class Footer extends Component {
  render () {
    return (
      <footer  className="footer">
        <Grid>
          <GridCell span="12" style={{display: 'flex', justifyContent: 'space-between'}}>
            <img src={logo} className="advance"/>
            <span style={{alignSelf: 'center'}}>Developed by Advance Systems © 2019</span>
          </GridCell>
        </Grid>
      </footer>
    )
  }
}

export default Footer;
