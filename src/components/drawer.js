import React, { Component } from 'react'
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

class Drawer extends Component {
  render () {
    return (
      <Drawer className="drawer" persistent open={this.state.persistentOpen == undefined ? true : this.state.persistentOpen}>
        <DrawerContent>
          <ListItem>
            <ListItemGraphic>star_border</ListItemGraphic>
            <ListItemText>Cookies</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemGraphic>favorite_border</ListItemGraphic>
            <ListItemText>Pizza</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemGraphic>mood</ListItemGraphic>
            <ListItemText>Icecream</ListItemText>
          </ListItem>
        </DrawerContent>
      </Drawer>
    )
  }
}
