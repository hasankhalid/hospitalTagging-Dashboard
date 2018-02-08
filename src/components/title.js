import React, { Component } from 'react';
import { Grid, GridCell } from 'rmwc/Grid';

class Title extends Component {
  render () {
    return (
      <Grid>
        <GridCell span="12">
          <div className="titleWrapper">
            <div className="imageCenter">
              <img alt="Government of Punjab Logo" className ="govLogo" src="http://via.placeholder.com/110x110"/>
            </div>
            <div className="textCenter">
              <h1>Tagging of Biomedical Equipment</h1>
              <h4>Punjab Employees Social Security Institution | © 2018 </h4>
            </div>
          </div>
        </GridCell>
      </Grid>
    )
  }
}

export default Title;
