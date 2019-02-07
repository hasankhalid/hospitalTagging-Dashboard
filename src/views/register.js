import React, { Component } from 'react'
import { Grid, GridCell } from 'rmwc/Grid'
import { Elevation } from 'rmwc/Elevation';
import { Link } from 'react-router-dom'
import Title from '../components/title'
import axios from 'axios'
import { TextField} from 'rmwc/TextField';
import { Button, ButtonIcon } from 'rmwc/Button';
import NavBar from '../components/navbar'
import {Redirect} from 'react-router'
import logo from '../components/advance.png';


class Register extends Component {
   state = {
     username: '',
     password: '',
     level: '',
     toHome: false,
     loginError: false,
     loading: false,
     userCreated: false
   }

   submitUsername = () => {
     this.setState({
       loading: true,
       loginError: false
     })

     axios.post(`https://gat-gt.herokuapp.com/api/register`,{
       name : this.state.username,
       username : this.state.username,
       password : this.state.password,
       level : this.state.level,
       cnic : '123'
     }).then((response) => {
       if (response.status === 200) {
         this.setState({
           loading: false,
           userCreated: true,
           loginError: false,
         })
       }
       else {
         this.setState({
           loading: false,
           loginError: true,
           userCreated: false
         })
       }
     })
     .catch(error => {
       this.setState({
         loginError: true,
         loading: false,
         userCreated: false
       })
     });
   }

  render () {
    return (
      <div>
        <NavBar register="noregister" logout="logout"/>
        <Title/>
        <Grid>
          <GridCell span="12" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px'}}>
            <Elevation z={3} style={{width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '15px'}}>
              <img src={logo} className="advanceMain loginadvance"/>
              {}
              <TextField required onChange={evt => this.setState({'username': evt.target.value})} label="Username."  style={{width: '230px'}}/>
              <TextField required onChange={evt => this.setState({'password': evt.target.value})} type="password" label="Password." style={{width: '230px'}}/>
              <TextField required onChange={evt => this.setState({'level': evt.target.value})} label="Level." type="number" min="0" max="2"  style={{width: '230px'}}/>
              {this.state.loginError === false ? this.state.loading === false ? this.state.userCreated === true ? <p style={{fontSize: '12px'}}> User created </p> : <p style={{fontSize: '12px'}}> </p> : <p style={{fontSize: '12px', color: 'blue'}}>Loading</p> : <p style={{fontSize: '14px', color: 'red'}}>Registration Failed</p>}
              <Button onClick={() => this.submitUsername()} style={{alignSelf: 'flex-start', marginLeft: '10px', marginTop: '5px'}} raised>Register</Button>
            </Elevation>
          </GridCell>
        </Grid>
      </div>
    )
  }
}

export default Register;
