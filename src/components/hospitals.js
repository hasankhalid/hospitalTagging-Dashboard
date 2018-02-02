import React, { Component } from 'react'
import { Grid, GridCell } from 'rmwc/Grid'
import {
  Card,
  CardMedia,
  CardMediaItem,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardSupportingText,
  CardActions,
  CardAction,
  CardHorizontalBlock
} from 'rmwc/Card';
import MdLocalHospital from 'react-icons/lib/md/local-hospital'

class HospitalList extends Component {

  hospitals = [
    {
      name: 'Hospital1',
      visited: true,
      equipmentCount: 2
    },
    {
      name: 'Hospital2',
      visited: false,
      equipmentCount: 4
    },
    {
      name: 'Hospital3',
      visited: true,
      equipmentCount: 2
    },
    {
      name: 'Hospital4',
      visited: false,
      equipmentCount: 5
    },
    {
      name: 'Hospital5',
      visited: true,
      equipmentCount: 2
    },
    {
      name: 'Hospital6',
      visited: false,
      equipmentCount: 12
    }
  ]

  render () {
    return (
      <Grid>
        <GridCell span="12">
          <h2>Hospital List</h2>
        </GridCell>
          {this.hospitals.length > 0 && this.hospitals.map((hospital) => (
            <GridCell span="4" key={hospital.name}>
              <Card>
                <CardHorizontalBlock>
                  <CardPrimary>
                    <CardTitle large> {hospital.name}</CardTitle>
                    <CardSubtitle>Visited: {hospital.visited ? 'Yes' : 'No'}</CardSubtitle>
                  </CardPrimary>
                  <CardMediaItem src="https://i2.wp.com/www.oceanviewumc.com/wp-content/uploads/2016/02/sthescope.jpg?fit=356%2C429"/>
                </CardHorizontalBlock>
                <CardSupportingText>
                  <span><strong>Equipment Tagged: {hospital.equipmentCount}</strong></span>
                </CardSupportingText>
                <CardActions>
                  <CardAction unelevated>View All</CardAction>
                  <CardAction unelevated>Browse by Department</CardAction>
                </CardActions>
              </Card>
            </GridCell>
          ))}
      </Grid>
    )
  }
}

export default HospitalList;
