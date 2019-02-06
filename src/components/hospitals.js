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
import axios from 'axios'

class HospitalList extends Component {
  componentDidMount(){
    axios.get(`https://gat-gt.herokuapp.com/api/hospitals`)
        .then(response => this.setState({
          hospitals: response.data.data
        }))
   }
   state = {
     hospitals: []
   }

  render () {
    console.log(this.state.hospitals);
    return (
      <Grid>
        <GridCell span="12">
          <h2 style={{color: '#303F9F'}}>Hospital List</h2>
        </GridCell>
          {this.state.hospitals.length > 0 && this.state.hospitals.map((hospital) => (
            <GridCell span="4" key={hospital.name}>
              <Elevation z={3}>
                <Card style={{backgroundColor: '#757575'}}>
                  <CardHorizontalBlock>
                    <CardPrimary>
                      <CardTitle large style={{color: '#fff'}}><strong>{hospital.name}</strong></CardTitle>
                      <CardSubtitle style={{color: '#fff'}}>Visited: {hospital.visited ? 'Yes' : 'No'}</CardSubtitle>
                    </CardPrimary>
                    <CardMediaItem src="https://futurehealthbiobank.com/ae-en/wp-content/uploads/sites/50/2016/03/stethoscope-icon.png"/>
                  </CardHorizontalBlock>
                  <CardSupportingText>
                    <span style={{color: '#fff'}}><strong>
                      Equipment Tagged: <br/>
                    </strong>
                      Biomedical Equipment: {hospital.equipmentCount}<br/>
                      Air Conditioners: {hospital.acCount}<br/>
                      Generator Conditioners: {hospital.genCount}<br/>
                      Hospital Equipment: {hospital.wardeqCount}
                  </span>
                  </CardSupportingText>
                  <CardActions>
                    {hospital.visited ?
                    <Link to={{ pathname: '/hospital', state: {hospital: hospital.name, id: hospital.hospitalId, serial: hospital.serial, enumId: hospital.enumId}}} className="cardButton">
                        <CardAction elevated="true" style={{backgroundColor: 'white', color: '#9C27B0'}}>View All</CardAction>
                    </Link>
                        :
                        <CardAction elevated="true" style={{backgroundColor: 'white', color: '#9C27B0'}}>View All</CardAction>
                    }
                    <Link className="cardButton" style={{display: 'none'}} to={{ pathname: '/byDepartment', state: { hospital: hospital.name, id: hospital.id} }} >
                      <CardAction unelevated style={{backgroundColor: '#3F51B5'}}>Browse by Department</CardAction>
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
