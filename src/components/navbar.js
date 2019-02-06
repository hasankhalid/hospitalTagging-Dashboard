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
              <ToolbarTitle>Dashboard</ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              {this.props.logout === "logout" ?
                <Link to='/'>
                  <Button onClick={() => localStorage.removeItem('token')} style={{marginRight: '10px', backgroundColor: '#E53935'}} raised>Logout</Button>
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
