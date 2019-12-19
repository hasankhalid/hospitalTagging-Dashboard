import React, { Component } from 'react';
import './App.css';
import Home from './views/home'
import { Route } from 'react-router-dom'
import HospitalView from './views/hospital'
import Footer from './components/footer'
import Login from './views/login'
import Register from './views/register'

class App extends Component {
  render() {
    return (
      <div className ="container mdc-typography">
        <div className="App">
          <Route exact path ="/" component={Login}/>
          <Route exact path ="/home" component={Home}/>
          <Route exact path ="/hospital" component={HospitalView}/>
          <Route exact path ="/register" component={Register}/>
        </div>
      <Footer/>
      </div>
    );
  }
}

export default App;
