import React, { Component } from 'react'
import Reach from '../components/reach'
import Title from '../components/title'
import HospitalList from '../components/hospitals'
import ComposedChart from '../components/composed'
import StackedBarChart from '../components/warrantybar'

class Home extends Component {
  render () {
    return (
      <div>
        <Title/>
        <Reach/>
        <ComposedChart/>
        <StackedBarChart/>
        <HospitalList/>
      </div>
    )
  }
}

export default Home;
