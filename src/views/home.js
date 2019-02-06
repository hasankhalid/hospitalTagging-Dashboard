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

  render () {
    if (!window.localStorage.token) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <NavBar logout='logout'/>
        <Title/>
        <Reach/>
        <ComposedChart/>
        <StackedBarChart/>
        <MaintenanceChart/>
        <HospitalList/>
      </div>
    )
  }
}

export default Home;
