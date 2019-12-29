import React, { Component } from 'react'
import { Grid, GridCell } from '@rmwc/grid'
import { Elevation } from '@rmwc/elevation';
import Title from '../components/title'
import axios from 'axios'
import { TextField} from '@rmwc/textfield';
import { Button } from '@rmwc/button';
import NavBar from '../components/navbar'
import logo from '../components/advance.png';
import { Select } from '@rmwc/select';


class Register extends Component {
   state = {
     username: '',
     password: '',
     level: '',
     toHome: false,
     loginError: false,
     loading: false,
     userCreated: false,
     hospital: 'All',
     access: 'Dashboard (Admin)',
     accessIndex: 3
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
       hospital: this.state.hospital,
       access: this.state.access,
       level: this.state.accessIndex,
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
              <div style={{width: '230px'}}>
                <TextField required onChange={evt => this.setState({'username': evt.target.value})} label="Username."  style={{width: '230px'}}/>
                <TextField required onChange={evt => this.setState({'password': evt.target.value})} type="password" label="Password." style={{width: '230px'}}/>
                <Select style={{width: '230px'}} required onChange={(e) => this.setState({'access': e.target.value, 'accessIndex': e.target.selectedIndex})} value={this.state.access} label="Access Rights" options={['Application (Data Entry)', 'Application (Edit)', 'Application (View)', 'Dashboard (Admin)', 'Dashboard (View Only)']}/>
                <Select style={{width: '230px'}} required onChange={(e) => this.setState({'hospital': e.target.value})} value={this.state.hospital} label="Hospital" options={['All', 'Nawaz Sharif Social Security Hospital Multan Road Lahore', 'Rehmat-ullil-Alimeen Institute of Cardiology Multan Road Lahore', 'Social Security Hospital Shahdara', 'Social Security Hospital Kot Lakhpat Lahore', 'Social Security Hospital Faisalabad', 'Maternal Newborn and Child Health Centre Faisalabad', 'Social Security Hospital Gujranwala', 'Social Security Hospital Gujrat', 'Social Security Hospital Islamabad', 'Khawaja Fareed Social Security Hospital Multan', 'Social Security Hospital Jauharabad', 'Social Security Hospital Sialkot', 'Social Security Hospital Okara', 'Social Security Hospital Sahiwal', 'Social Security Hospital Sheikhupura', 'Social Security Hospital Jaranwala', 'Social Security Hospital Jang']}/>
              </div>
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
