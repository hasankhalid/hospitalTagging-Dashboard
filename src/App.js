import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navbar'
import Home from './views/home'
import { Route } from 'react-router-dom'
import HospitalView from './views/hospital'
import Footer from './components/footer'
import Export from './views/export'
import Login from './views/login'

class App extends Component {
  render() {
    return (
      <div className ="container">
        <div className="App">
          <Route exact path ="/" component={Login}/>
          <Route exact path ="/home" component={Home}/>
          <Route exact path ="/hospital" component={HospitalView}/>
        </div>
      <Footer/>
      </div>
    );
  }
}

export default App;
