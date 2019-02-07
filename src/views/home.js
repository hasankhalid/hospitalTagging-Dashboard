import React, { Component } from 'react'
import Reach from '../components/reach'
import Title from '../components/title'
import HospitalList from '../components/hospitals'
import ComposedChart from '../components/composed'
import StackedBarChart from '../components/warrantybar'
import NavBar from '../components/navbar'
import MaintenanceChart from '../components/maintenancebar'
import {Redirect} from 'react-router'
import { Button } from 'rmwc/Button'
import { Link } from 'react-router-dom'


class Home extends Component {
  state = {
  }

  componentDidMount() {
    this.setState({
      userLevel: JSON.parse(window.atob(window.localStorage.token.split('.')[1])).level
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
