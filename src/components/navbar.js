import React, { Component } from 'react'
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
} from '@rmwc/toolbar';
import {Link} from 'react-router-dom';
import { Button } from '@rmwc/button';

import { Ripple } from '@rmwc/ripple';

class NavBar extends Component {
  state = {
  }

  componentDidMount() {
    if (window.localStorage.token) {
      this.setState({
        userLevel: JSON.parse(window.atob(window.localStorage.token.split('.')[1])).level
      })
    }
  }
  render () {
    return (
      <div>
        <Toolbar style={{ backgroundImage: 'linear-gradient(to right bottom,#492e9c,#5830ae,#6931c0,#7b30d1,#8e2de2)' }}>
          <ToolbarRow style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <ToolbarSection alignStart>
              <ToolbarTitle style={{marginLeft: '15px', display: 'flex', alignItems: 'center', color: 'white'}}>
                <Link to='/home' style={{textDecoration: 'none', color: '#eee'}}><ToolbarMenuIcon icon="home"/></Link>
                  <p style={{marginLeft: '10px'}}>Dashboard</p>
              </ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <div style={{display: 'flex'}}>
                {this.state.userLevel === 3 && this.props.register !== "noregister" ?
                  <div>
                    <Link to={{ pathname: '/departments'}} style={{color: 'rgb(123, 48, 209)', textDecoration: 'none'}}>
                      <Button raised
                        style={{backgroundColor: '#f5f5f5', textDecoration: 'none', margin: '10px', color: 'rgb(123, 48, 209)'}} icon="account_balance"
                      >
                        <div className="button_text" style={{color: 'rgb(123, 48, 209)', textDecoration: 'none'}}>
                          Manage Departments
                        </div>
                      </Button>
                    </Link>
                    <Link to={{ pathname: '/manage'}} style={{color: 'rgb(123, 48, 209)', textDecoration: 'none'}}>
                      <Button raised
                        style={{backgroundColor: '#f5f5f5', textDecoration: 'none', margin: '10px', color: 'rgb(123, 48, 209)'}} icon="people"
                      >
                        <div className="button_text" style={{color: 'rgb(123, 48, 209)', textDecoration: 'none'}}>
                          Manage Users
                        </div>
                      </Button>
                    </Link>
                    <Link to={{ pathname: '/register'}} style={{color: 'rgb(123, 48, 209)', textDecoration: 'none'}}>
                      <Button raised
                        style={{backgroundColor: '#f5f5f5', textDecoration: 'none', margin: '22px', color: 'rgb(123, 48, 209)'}} icon="people"
                      >
                        <div className="button_text" style={{color: 'rgb(123, 48, 209)'}}>
                          Register new User
                        </div>
                      </Button>
                    </Link>
                  </div>
                  :
                  <p></p>
                }
                {this.props.logout === "logout" ?
                    <Link to='/' className="button_text" style={{color: '#ffff00', textDecoration: 'none'}}>
                      <Button icon="exit_to_app" raised onClick={() => localStorage.removeItem('token')} style={{margin: '22px', marginLeft: '10px', alignSelf: 'center', backgroundColor: '#1e88e5', color: '#ffff00' }}>
                        Logout
                      </Button>
                    </Link>

                  :
                  <span></span>
                }
              </div>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </div>
    )
  }
}

export default NavBar;
