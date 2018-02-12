import React, { Component } from 'react'
import { Grid, GridCell } from 'rmwc/Grid'
import {
  Card,
  CardMediaItem,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardSupportingText,
  CardActions,
  CardAction,
  CardHorizontalBlock
} from 'rmwc/Card';
import { Elevation } from 'rmwc/Elevation';
import { Link } from 'react-router-dom'

class HospitalList extends Component {

  hospitals = [
    {
      name: 'Hospital1',
      id: '1',
      visited: true,
      equipmentCount: 2,
      wardeqCount: 3,
      electriEqCount: 5
    },
    {
      name: 'Hospital2',
      id: '2',
      visited: false,
      equipmentCount: 4,
      wardeqCount: 6,
      electriEqCount: 4
    },
    {
      name: 'Hospital3',
      id: '3',
      visited: true,
      equipmentCount: 2,
      wardeqCount: 5,
      electriEqCount: 9
    },
    {
      name: 'Hospital4',
      id: '4',
      visited: false,
      equipmentCount: 5,
      wardeqCount: 1,
      electriEqCount: 9
    },
    {
      name: 'Hospital5',
      id: '5',
      visited: true,
      equipmentCount: 2,
      wardeqCount: 2,
      electriEqCount: 4
    },
    {
      name: 'Hospital6',
      id: '6',
      visited: false,
      equipmentCount: 12,
      wardeqCount: 8,
      electriEqCount: 9
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
              <Elevation z={3}>
                <Card>
                  <CardHorizontalBlock>
                    <CardPrimary>
                      <CardTitle large> {hospital.name}</CardTitle>
                      <CardSubtitle>Visited: {hospital.visited ? 'Yes' : 'No'}</CardSubtitle>
                    </CardPrimary>
                    <CardMediaItem src="https://i2.wp.com/www.oceanviewumc.com/wp-content/uploads/2016/02/sthescope.jpg?fit=356%2C429"/>
                  </CardHorizontalBlock>
                  <CardSupportingText>
                    <span><strong>
                      Equipment Tagged: <br/>
                    </strong>
                      Biomedical Equipment: {hospital.equipmentCount}<br/>
                      Electrical Equipment: {hospital.electriEqCount}<br/>
                      Hospital Equipment: {hospital.wardeqCount}
                  </span>
                  </CardSupportingText>
                  <CardActions>
                    <Link to={{ pathname: '/hospital', state: { hospital: hospital.name, id: hospital.id} }} className="cardButton">
                      <CardAction unelevated>View All</CardAction>
                    </Link>
                    <Link className="cardButton" to={{ pathname: '/byDepartment', state: { hospital: hospital.name, id: hospital.id} }} >
                      <CardAction unelevated >Browse by Department</CardAction>
                    </Link>
                  </CardActions>
                </Card>
              </Elevation>
            </GridCell>
          ))}
      </Grid>
    )
  }
}

export default HospitalList;
