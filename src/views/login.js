import React, { Component } from 'react'
import { Grid, GridCell } from '@rmwc/grid'
import { Elevation } from '@rmwc/elevation';
import Title from '../components/title'
import axios from 'axios'
import { TextField} from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import NavBar from '../components/navbar'
import {Redirect} from 'react-router'
import logo from '../components/advance.png';


class Login extends Component {
   state = {
     username: '',
     password: '',
     toHome: false,
     loginError: false,
     loading: false
   }

   submitLogin = () => {
     this.setState({
       loading: true,
       loginError: false
     })
     axios.post(`https://gat-gt.herokuapp.com/api/login`,{
       username : this.state.username,
       password : this.state.password,
       origin: 'Dash'
     }).then((response) => {
       if (!response.data.token) {
         this.setState({
           toHome: false,
         })
       }
       else {
         window.localStorage.token = response.data.token;
         window.level = JSON.parse(window.atob(window.localStorage.token.split('.')[1])).level;

         this.setState({
           toHome: true,
           loading: false
         })
       }
     })
     .catch(error => {
       this.setState({
         loginError: true,
         loading: false,
       })
     });
   }




  render () {
    if(window.localStorage.token) {
      this.setState({
        toHome: true
      })
    }

    if (this.state.toHome === true) {
      return <Redirect to='/home' />
    }
    return (
      <div>
        <NavBar/>
        <Title/>
        <Grid>
          <GridCell span="12" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px'}}>
            <Elevation z={3} style={{width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '15px'}}>
              <img src={logo} className="advanceMain loginadvance"/>
              {}
              <div style={{width: '230px'}}>
                <TextField required onChange={evt => this.setState({'username': evt.target.value})} label="Email."  style={{width: '230px'}}/>
                <TextField required onChange={evt => this.setState({'password': evt.target.value})} type="password" label="Password." style={{width: '230px'}}/>
              </div>
              {this.state.loginError === false ? this.state.loading === false ? <p style={{fontSize: '12px'}}> </p> : <p style={{fontSize: '12px', color: 'blue'}}>Loading</p> : <p style={{fontSize: '14px', color: 'red'}}>Incorrect Email or Password</p>}
              <Button trailingIcon="keyboard_arrow_right" onClick={() => this.submitLogin()} style={{alignSelf: 'flex-start', marginLeft: '10px', marginTop: '5px'}} raised>Sign In</Button>
            </Elevation>
          </GridCell>
        </Grid>
      </div>
    )
  }
}

export default Login;
