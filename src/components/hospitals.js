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
    return (
      <Grid>
        <GridCell span="12">
          <h2 style={{color: '#303F9F'}}>Hospital List</h2>
        </GridCell>
          {this.state.hospitals.length > 0 && this.state.hospitals.map((hospital) => (
            <GridCell span="4" key={hospital.name}>
              <Elevation z={3}>
                <Card>
                  <CardHorizontalBlock>
                    <CardPrimary>
                      <CardTitle large style={{color: '#303F9F'}}><strong>{hospital.name}</strong></CardTitle>
                      <CardSubtitle style={{color: '#303F9F'}}>Visited: {hospital.visited ? 'Yes' : 'No'}</CardSubtitle>
                    </CardPrimary>
                    <CardMediaItem src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwu6E-KW549vbvUTQ5kI1NxunY0U-viT3JM25Mssj1TBhNaw2T4Q"/>
                  </CardHorizontalBlock>
                  <CardSupportingText>
                    <span style={{color: '#303F9F'}}><strong>
                      Equipment Tagged: <br/>
                    </strong>
                      Biomedical Equipment: {hospital.equipmentCount}<br/>
                      Air Conditioners: {hospital.acCount}<br/>
                      Generator Conditioners: {hospital.genCount}<br/>
                      Hospital Equipment: {hospital.wardeqCount}
                  </span>
                  </CardSupportingText>
                  <CardActions>
                    <Link to={{ pathname: '/hospital', state: { hospital: hospital.name, id: hospital.id} }} className="cardButton">
                      <CardAction unelevated style={{backgroundColor: '#FF3F80'}}>View All</CardAction>
                    </Link>
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
