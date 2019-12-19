import React, { Component } from 'react';
import { Grid, GridCell } from '@rmwc/grid';

class Title extends Component {
  render () {
    return (
      <Grid>
        <GridCell span="12">
          <div className="titleWrapper">
            <div className="imageCenter">
              <img alt="Government of Punjab Logo" className ="govLogo" src="https://paperads.com/uploads/co_img/1523344571.jpg"/>
            </div>
            <div className="textCenter">
              <h1 style={{color: '#616161', fontWeight: '400', marginBottom: '15px'}}>Tagging of Biomedical Equipment</h1>
              <p style={{color: '#303F9F'}}>Punjab Employees Social Security Institution | © 2019</p>
            </div>
          </div>
        </GridCell>
      </Grid>
    )
  }
}

export default Title;
