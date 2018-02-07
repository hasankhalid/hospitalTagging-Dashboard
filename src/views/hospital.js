import React, { Component } from 'react'
import { Grid, GridCell } from 'rmwc/Grid'
import { TabBar, Tab, TabIcon, TabIconText, TabBarScroller} from 'rmwc/Tabs';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Elevation } from 'rmwc/Elevation';

import {
  Dialog,
  DefaultDialogTemplate,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogFooterButton,
  DialogBackdrop,
} from 'rmwc/Dialog';

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryText,
  ListItemGraphic,
} from 'rmwc/List';

class HospitalView extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentWillMount() {
    this.setTitle();
  }

  setTitle = () => {
    const path = this.props.location.pathname;
    path === '/hospital' ? this.setState({ title: 'Category'
    }) : this.setState({ title: 'Department'
    })
  }

  state = {
    activeTabIndex: 0,
    columns: [{
      Header: 'Serial-No',
      accessor: 'serial',
      filterable: true
    }, {
      Header: 'Name',
      accessor: 'name',
      filterable: true
    }, {
      Header: 'Model',
      accessor: 'model',
      Cell: props => <span className='number'>{props.value}</span>,
      filterable: true
    }, {
      Header: 'Department',
      accessor: 'department',
      filterable: true
    }, {
      Header: 'Date of Manufacture',
      accessor: 'manufacturedate',
      filterable: true
    }, {
      Header: 'Purchase Date',
      accessor: 'purchasedate',
      filterable: true
    }, {
      Header: 'Functional Status',
      accessor: 'funcstatus',
      filterable: true
    }],
    tabs: [],
    standardDialogOpen: false,
    rows: [{
        serial: 'biomedical',
        name: 'Equipment',
        model: '2002',
        department: 'Department'},
      {
        serial: 'biomedical',
        name: 'Equipment',
        model: '2002',
        department: 'Department'}],
  }

  render () {
    return (
      <Grid>
        <GridCell span = "12">
          <h2 className="title">All Hospital Equipment by {this.state.title}</h2>
          {this.state.title === "Category" ?
          <TabBarScroller>
          <TabBar
            activeTabIndex={this.state.activeTabIndex}
            onChange={evt => this.setState({'activeTabIndex': evt.target.value})}
            >
              <Tab><TabIcon>local_hospital</TabIcon><TabIconText> Biomedical Equipment</TabIconText></Tab>
              <Tab><TabIcon>computer</TabIcon><TabIconText> Electrical Equipment</TabIconText></Tab>
              <Tab><TabIcon>local_hotel</TabIcon><TabIconText> Hospital Equipment</TabIconText></Tab>
          </TabBar>
          </TabBarScroller>
          :
          <TabBarScroller>
          <TabBar
            activeTabIndex={this.state.activeTabIndex}
            onChange={evt => this.setState({'activeTabIndex': evt.target.value})}
            >
              <Tab><TabIcon>local_hospital</TabIcon><TabIconText> Biomedical Equipment</TabIconText></Tab>
              <Tab><TabIcon>computer</TabIcon><TabIconText> Electrical Equipment</TabIconText></Tab>
          </TabBar>
          </TabBarScroller>
        }
        </GridCell>
        <GridCell span = "12">
        <Elevation z={5}>
          <ReactTable
          className="highlight"
            data={this.state.rows}
            columns={this.state.columns}
            getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e) => {
                this.setState({standardDialogOpen: true})
              }}}}
          />
          </Elevation>
          <Dialog
            open={this.state.standardDialogOpen}
            onClose={evt => this.setState({standardDialogOpen: false})}
          >
            <DialogSurface>
              <DialogHeader>
                <DialogHeaderTitle>Equipment</DialogHeaderTitle>
              </DialogHeader>
              <DialogBody>
                <h4>These are equipment details</h4>
                <div className = "listContain">
                  <div className = "list">
                    <List nonInteractive>
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
                      <ListItem>
                        <ListItemGraphic>favorite_border</ListItemGraphic>
                        <ListItemText>Pizza</ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemGraphic>mood</ListItemGraphic>
                        <ListItemText>Icecream</ListItemText>
                      </ListItem>
                    </List>
                  </div>
                  <div className = "list">
                    <List nonInteractive>
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
                  </List>
                </div>
              </div>
              </DialogBody>
              <DialogFooter>
                  <DialogFooterButton cancel>Close</DialogFooterButton>
              </DialogFooter>
            </DialogSurface>
            <DialogBackdrop />
          </Dialog>
        </GridCell>
      </Grid>
    )
  }
}

export default HospitalView;
