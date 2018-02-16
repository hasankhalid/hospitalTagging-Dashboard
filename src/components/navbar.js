import React, { Component } from 'react'
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
} from 'rmwc/Toolbar';
import {Link} from 'react-router-dom'

import { Ripple } from 'rmwc/Ripple';

class NavBar extends Component {
  render () {
    return (
      <div>
        <Toolbar style={{backgroundColor: '#3F51B5'}}>
          <ToolbarRow>
            <ToolbarSection alignStart>
                <Ripple accent>
                  <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
                    <ToolbarMenuIcon use="home"/>
                  </Link>
                </Ripple>
              <ToolbarTitle>Dashboard</ToolbarTitle>
            </ToolbarSection>
            <ToolbarSection alignEnd>
              <span className="app__version">0.0.1</span>
              <Ripple accent>
                <ToolbarMenuIcon use="save"/>
              </Ripple>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
      </div>
    )
  }
}

export default NavBar;
