import React, { Component } from 'react'
import Reach from '../components/reach'
import Title from '../components/title'
import HospitalList from '../components/hospitals'
import ComposedChart from '../components/composed'
import StackedBarChart from '../components/warrantybar'
import NavBar from '../components/navbar'
import MaintenanceChart from '../components/maintenancebar'
import {Redirect} from 'react-router'

class Home extends Component {
  state = {
    hospital: 'All'
  }

  componentDidMount() {
    this.setState({
      userLevel: JSON.parse(window.atob(window.localStorage.token.split('.')[1])).level,
      hospital: JSON.parse(window.atob(window.localStorage.token.split('.')[1])).hospital
    })
  }

  render () {
    if (!window.localStorage.token) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <NavBar logout='logout'/>
        <Title/>
        {this.state.hospital === 'All' || this.state.hospital === null ?
          <div>
            <Reach/>
            <ComposedChart/>
            <StackedBarChart/>
            <MaintenanceChart/>
          </div>
          :
          <div style={{display: 'none'}}>
            <Reach/>
            <ComposedChart/>
            <StackedBarChart/>
            <MaintenanceChart/>
          </div>
        }
        <HospitalList hospital={this.state.hospital}/>
      </div>
    )
  }
}

export default Home;
