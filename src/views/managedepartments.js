import React, { Component } from 'react'
import { Grid, GridCell } from '@rmwc/grid'
import { Elevation } from '@rmwc/elevation';
import { TextField } from '@rmwc/textfield';
import Title from '../components/title'
import axios from 'axios'
import { Button } from '@rmwc/button';
import NavBar from '../components/navbar'
import { Link } from 'react-router-dom'

class ManageDeps extends Component {
   state = {
     deps: [],
     updateError: false,
     loading: false,
     depsUpdated: false,
     options: ['Application (Data Entry)', 'Application (Edit)', 'Application (View)', 'Dashboard (Admin)', 'Dashboard (View Only)']
   }

   componentDidMount() {
     axios.get(`https://gat-gt.herokuapp.com/api/getdepartments`).then(response => this.setState({
       deps: response.data.departments
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
     })
     setTimeout(function(){ this.setState({
       updateError: false,
       loading: false,
       depsUpdated: false,
     }) }, 4000);
   }

   updateValue = (evt, index) => {
     const depts = this.state.deps;
     const updatedArr = [
       ...depts.slice(0, index),
       evt.target.value,
       ...depts.slice(index + 1)
     ]
     this.setState({
       deps: updatedArr
     })
   }


   updateDepartments = () => {
     this.setState({
       loading: true,
       updateError: false
     })

     axios.post(`https://gat-gt.herokuapp.com/api/updatedepartments`,{
       departments : this.state.deps,
     }).then((response) => {
       if (response.status === 200) {
         this.setState({
           loading: false,
           depsUpdated: true,
           updateError: false,
         })
       }
       else {
         this.setState({
           loading: false,
           updateError: true,
           depsUpdated: false
         })
       }
     })
     .catch(error => {
       this.setState({
         updateError: true,
         loading: false,
         depsUpdated: false
       })
     })
   }

   addDepartment = () => {
     const depts = this.state.deps;
     depts.unshift("New Department");
     this.setState({
       deps: depts
     })
   }

  render () {
    return (
      <div>
        <NavBar register="noregister" logout="logout"/>
        <Title/>
        <Grid>
          <GridCell span="12">
            <p style={{fontSize: '14px', fontWeight: '500', color: '#e53935'}}>Note: All changes will be made locally and will have to be pushed to the servers online</p>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Button icon="account_balance" raised style={{backgroundColor: '#7b30d1', marginRight: '20px', color: 'white'}} onClick={() => this.updateDepartments()}>
                  Update All Departments
              </Button>
              {this.state.updateError === false ? this.state.loading === false ? this.state.depsUpdated === true ? <p style={{fontSize: '12px'}}> Departments have been updated online </p> : <p style={{fontSize: '12px'}}> </p> : <p style={{fontSize: '12px', color: 'blue'}}>Updating</p> : <p style={{fontSize: '14px', color: 'red'}}>Updation Failed</p>}
            </div>
            <p style={{fontSize: '12px', fontWeight: '500'}}>Please click the above button after making your desired changes to push them on to the server</p>
            <Button icon="account_balance" raised style={{backgroundColor: '#8bc34a', marginRight: '20px', color: 'white'}} onClick={() => this.addDepartment()}>
                Add Department
            </Button>
            <p style={{fontSize: '12px', fontWeight: '500'}}>Please click the above button to add a new department.</p>
          </GridCell>
          {this.state.deps.length > 0 && this.state.deps.map((dep, index) => (
            <GridCell key={index} span="6">
              <Elevation z={3} style={{padding: '15px 20px', backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <TextField style={{width: '55%'}} value={dep} onChange={(evt) => this.updateValue(evt, index)}/>
                <div style={{display: 'flex', width: '45%', justifyContent: 'flex-end'}}>
                  <Button icon="edit" raised style={{backgroundColor: '#7b30d1', marginRight: '15px', color: 'white' }}>
                      Edit
                  </Button>
                  <Button icon="delete" raised style={{backgroundColor: '#e53935'}} onClick={() => this.setState({ deps: this.state.deps.filter(function(e) { return e !== dep })})}>
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

export default ManageDeps;
