import React, { Component } from 'react';
import './App.css';
import Home from './views/home'
import { Route } from 'react-router-dom'
import HospitalView from './views/hospital'
import Footer from './components/footer'
import Login from './views/login'
import Register from './views/register'
import Edit from './views/edit'
import Manage from './views/manage'
import ManageDeps from './views/managedepartments'

class App extends Component {
  render() {
    return (
      <div className ="container mdc-typography">
        <div className="App">
          <Route exact path ="/" component={Login}/>
          <Route exact path ="/home" component={Home}/>
          <Route exact path ="/hospital" component={HospitalView}/>
          <Route exact path ="/register" component={Register}/>
          <Route exact path ="/manage" component={Manage}/>
          <Route exact path ="/departments" component={ManageDeps}/>
          <Route exact path ="/edit" component={Edit}/>
        </div>
      <Footer/>
      </div>
    );
  }
}

export default App;
