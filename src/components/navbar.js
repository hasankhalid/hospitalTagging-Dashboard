import React, { Component } from 'react'
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
} from 'rmwc/Toolbar';
import {Link} from 'react-router-dom'
import { Button, ButtonIcon } from 'rmwc/Button';

import { Ripple } from 'rmwc/Ripple';

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
        <Toolbar style={{backgroundColor: '#455A64', color: '#EEEEEE'}}>
          <ToolbarRow>
            <ToolbarSection alignStart>
                <Ripple accent>
                  <Link to="/home" style={{textDecoration: 'none', color: '#eee'}}>
                    <ToolbarMenuIcon use="home"/>
                  </Link>
                </Ripple>
              <ToolbarTitle style={{marginLeft: '15px'}}>Dashboard</ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              {this.state.userLevel > 1 && this.props.register !== "noregister"  ?
                  <Link to={{ pathname: '/register'}}>
                    <Button raised
                      style={{backgroundColor: '#FF3F80', margin: '22px'}}
                    >
                      Register new User
                    </Button>
                  </Link>
                :
                <p></p>
              }
              {this.props.logout === "logout" ?
                <Link to='/'>
                  <Button onClick={() => localStorage.removeItem('token')} style={{margin: '22px', marginLeft: '10px', alignSelf: 'center', backgroundColor: '#E53935'}} raised>Logout</Button>
                </Link>
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
