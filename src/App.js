import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar'
import Reach from './components/reach'
import Title from './components/title'
import HospitalList from './components/hospitals'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Title/>
        <Reach/>
        <HospitalList/>
      </div>
    );
  }
}

export default App;
