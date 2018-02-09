import React, { Component } from 'react'
import Reach from '../components/reach'
import Title from '../components/title'
import HospitalList from '../components/hospitals'

class Home extends Component {
  render () {
    return (
      <div>
        <Title/>
        <Reach/>
        <HospitalList/>
      </div>
    )
  }
}

export default Home;
