import React, { Component } from 'react'
import {
  Toolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarTitle,
  ToolbarMenuIcon,
} from 'rmwc/Toolbar';

import {
  Drawer,
  DrawerHeader,
  DrawerContent
} from 'rmwc/Drawer';

import {
  ListItem,
  ListItemText,
  ListItemGraphic
} from 'rmwc/List';

import { Ripple } from 'rmwc/Ripple';
import { Link } from 'react-router-dom'

class NavBar extends Component {
  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection alignStart>
                <Ripple accent>
                    <ToolbarMenuIcon use="dashboard"/>
                </Ripple>
              <ToolbarTitle>DashBoard</ToolbarTitle>
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
