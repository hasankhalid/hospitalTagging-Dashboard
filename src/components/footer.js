import React, { Component } from 'react';
import { Grid, GridCell } from 'rmwc/Grid';
import logo from '../resources/Logoinvert.svg';


class Footer extends Component {
  render () {
    return (
      <footer  className="footer">
        <Grid>
          <GridCell span="12" style={{display: 'flex', justifyContent: 'space-between'}}>
            <img src={logo} alt="GAT-Logo" style={{height: '35px'}}/>
            <span style={{alignSelf: 'center'}}>Developed by GAT Consulting. © 2018</span>
          </GridCell>
        </Grid>
      </footer>
    )
  }
}

export default Footer;
