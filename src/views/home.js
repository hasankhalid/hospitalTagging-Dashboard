import React, { Component } from 'react'
import Reach from '../components/reach'
import Title from '../components/title'
import HospitalList from '../components/hospitals'
import ComposedChart from '../components/composed'
import StackedBarChart from '../components/warrantybar'
import MaintenanceChart from '../components/maintenancebar'

class Home extends Component {

  render () {
    return (
      <div>
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
