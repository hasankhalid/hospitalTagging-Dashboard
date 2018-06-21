import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar'
import Home from './views/home'
import { Route } from 'react-router-dom'
import HospitalView from './views/hospital'
import Footer from './components/footer'
import Export from './views/export'

class App extends Component {
  render() {
    return (
      <div className ="container">
        <div className="App">
          <NavBar/>
          <Route exact path ="/" component={Home}/>
          <Route exact path ="/hospital" component={HospitalView}/>
          <Route exact path ="/byDepartment" component={HospitalView}/>
          <Route exact path ="/export" component={Export}/>
        </div>
      <Footer/>
      </div>
    );
  }
}

export default App;
