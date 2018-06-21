import React, { Component } from 'react';
import { Grid, GridCell } from 'rmwc/Grid';

class Title extends Component {
  render () {
    return (
      <Grid>
        <GridCell span="12">
          <div className="titleWrapper">
            <div className="imageCenter">
              <img alt="Government of Punjab Logo" className ="govLogo" src="http://xpertnetworks.net/wp-content/uploads/2015/05/PESSI-Logo-260x300.jpg"/>
            </div>
            <div className="textCenter">
              <h1 style={{color: '#303F9F'}}>Tagging of Biomedical Equipment</h1>
              <h4 style={{color: '#303F9F'}}>Punjab Employees Social Security Institution | © 2018 </h4>
            </div>
          </div>
        </GridCell>
      </Grid>
    )
  }
}

export default Title;
