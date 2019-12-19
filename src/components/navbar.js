import React, { Component } from 'react'
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
} from '@rmwc/toolbar';
import {Link} from 'react-router-dom'
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
                <Ripple accent><Link to="/home" style={{textDecoration: 'none', color: '#eee'}}><ToolbarMenuIcon icon="home"/></Link></Ripple>
                  <p style={{marginLeft: '10px'}}>Dashboard</p>
              </ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              {this.state.userLevel > 1 && this.props.register !== "noregister" ?
                  <Button raised
                    style={{backgroundColor: '#f5f5f5', textDecoration: 'none', margin: '22px', color: 'rgb(123, 48, 209)'}} icon="people"
                  >
                    <Link to={{ pathname: '/register'}} className="button_text" style={{color: 'rgb(123, 48, 209)'}}>
                      Register new User
                    </Link>
                  </Button>
                :
                <p></p>
              }
              {this.props.logout === "logout" ?
                  <Button icon="exit_to_app" raised onClick={() => localStorage.removeItem('token')} style={{margin: '22px', marginLeft: '10px', alignSelf: 'center', backgroundColor: '#1e88e5', color: '#ffff00' }}>
                    <Link to='/' className="button_text" style={{color: '#ffff00'}}>
                      Logout
                    </Link>
                  </Button>
                :
                <span></span>
              }
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </div>
    )
  }
}

export default NavBar;
