import React, { Component } from 'react'
import { Grid, GridCell } from '@rmwc/grid'
import { Typography } from '@rmwc/typography';
import {
  Card,
} from '@rmwc/card';
import { Button } from '@rmwc/button';
import { Link } from 'react-router-dom'
import axios from 'axios';

class HospitalList extends Component {
  componentDidMount(){
    axios.get(`https://gat-gt.herokuapp.com/api/hospitals`)
        .then(response => this.setState({
          hospitals: response.data.data.filter(
            (d)=>{
              return this.props.hospital === 'All' || this.props.hospital === null || d.name === this.props.hospital
            }
          ),
        }))
   }
   state = {
     hospitals: []
   }

  render () {
    return (
      <Grid>
        <GridCell span="12">
          <h2 style={{color: '#303F9F', fontWeight: '500'}}>Hospital List</h2>
        </GridCell>
          {this.state.hospitals.length > 0 && this.state.hospitals.map((hospital) => (
            <GridCell span="4" key={hospital.name}>
                <Card style={{backgroundColor: '#f5f5f5'}}>
                  <div style={{ padding: '0 1rem 1rem 1rem' }}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: '20px'}}>
                      <div style={{width: '80%'}}>
                        <Typography use="headline6" tag="h2">{hospital.name}</Typography>
                      </div>
                      <img style={{width: '18%'}} src="https://futurehealthbiobank.com/ae-en/wp-content/uploads/sites/50/2016/03/stethoscope-icon.png"/>
                    </div>
                    <div>
                      <span style={{color: '#757575', marginBottom: '10px'}}><strong style={{marginBottom: '10px', fontWeight: '500'}}>
                        Equipment Tagged: <br/>
                      </strong></span>
                      <span style={{color: '#757575'}}>
                        Biomedical Equipment: {hospital.equipmentCount}<br/>
                        Air Conditioners: {hospital.acCount}<br/>
                        Generator Conditioners: {hospital.genCount}<br/>
                        Hospital Equipment: {hospital.wardeqCount}
                      </span>
                    </div>
                      {hospital.visited ?
                          <Button raised style={{backgroundColor: '#7b30d1', marginTop: '20px' }}>
                            <Link style={{color: 'white', textDecoration: 'none'}} to={{ pathname: '/hospital', state: {hospital: hospital.name, id: hospital.hospitalId, serial: hospital.serial, enumId: hospital.enumId}}} className="cardButton">
                              View All
                            </Link>
                          </Button>
                          :
                          <Button raised style={{backgroundColor: '#1e88e5', marginTop: '20px' }}>View All</Button>
                      }
                  </div>
                </Card>
            </GridCell>
          ))}
      </Grid>
    )
  }
}

export default HospitalList;
