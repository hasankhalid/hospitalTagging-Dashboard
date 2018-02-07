import React, { Component } from 'react'
import Reach from '../components/reach'
import Title from '../components/title'
import HospitalList from '../components/hospitals'
import ComposedChart from '../components/composed'

class Home extends Component {
  render () {
    return (
      <div>
        <Title/>
        <Reach/>
        <div className="charContain">
          <ComposedChart/>
        </div>
        <HospitalList/>
      </div>
    )
  }
}

export default Home;
