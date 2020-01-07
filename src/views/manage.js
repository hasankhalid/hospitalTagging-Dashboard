import React, { Component } from 'react'
import { Grid, GridCell } from '@rmwc/grid'
import { Elevation } from '@rmwc/elevation';
import Title from '../components/title'
import axios from 'axios'
import { Button } from '@rmwc/button';
import NavBar from '../components/navbar'
import { Link } from 'react-router-dom'

class Manage extends Component {
   state = {
     users: [],
     options: ['Application (Data Entry)', 'Application (Edit)', 'Application (View)', 'Dashboard (Admin)', 'Dashboard (View Only)']
   }

   componentDidMount() {
     axios.get(`https://gat-gt.herokuapp.com/api/getusers`).then(response => this.setState({
       users: response.data.users
     }))
   }

   deleteUsername = (username) => {
     axios.post(`https://gat-gt.herokuapp.com/api/deleteuser`,{
       username : username,
     }).then((response) => {
       this.setState({
         users: this.state.users.filter((d) => d.username !== username)
       });
       if (response.status === 200) {
         this.setState({
           showModal: true,
           userDeleted: true,
           deletionError: false,
         })
       }
       else {
         this.setState({
           showModal: true,
           deletionError: true,
           userDeleted: false
         })
       }
     });
   }


  render () {
    return (
      <div>
        <NavBar register="noregister" logout="logout"/>
        <Title/>
        <Grid>
          {this.state.users.length > 0 && this.state.users.map((user, index) => (
            <GridCell key={index} span="4">
              <Elevation z={3} style={{padding: '15px 20px', backgroundColor: '#f5f5f5'}}>
                <p><span style={{ fontWeight: '500'}}>Username:</span> {user.username}</p>
                <p><span style={{ fontWeight: '500'}}>Access Level:</span> {this.state.options[user.level]}</p>
                <p><span style={{ fontWeight: '500'}}>Hospital:</span> {user.hospital}</p>
                <div style={{display: 'flex'}}>
                  <Button icon="edit" raised style={{backgroundColor: '#7b30d1', marginRight: '15px' }}>
                    <Link style={{color: 'white', textDecoration: 'none'}} to={{pathname: '/edit', user: user}} className="cardButton">
                      Edit
                    </Link>
                  </Button>
                  <Button icon="delete" raised style={{backgroundColor: '#e53935'}} onClick={() => this.deleteUsername(user.username)}>
                    Delete
                  </Button>
                </div>
              </Elevation>
            </GridCell>
          ))}
        </Grid>
      </div>
    )
  }
}

export default Manage;
