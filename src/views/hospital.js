import React, { Component } from 'react'
import { Grid, GridCell } from 'rmwc/Grid'
import { TabBar, Tab, TabIcon, TabIconText, TabBarScroller} from 'rmwc/Tabs';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Elevation } from 'rmwc/Elevation';
import { Button } from 'rmwc/Button';

import {
  Dialog,
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
    viewDetail: false,
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

  toggleView = () => {
    const reverse = !this.state.viewDetail;
    this.setState({viewDetail: reverse})
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
                <Button onClick={(e) =>this.toggleView()} dense>Switch View</Button>
              </DialogHeader>
              {this.state.viewDetail === true ?
              <DialogBody>
                <h4>These are equipment details</h4>
                <div className = "listContain">
                  <div className = "list">
                    <List nonInteractive>
                      <ListItem>
                        <ListItemGraphic>text_fields</ListItemGraphic>
                        <ListItemText>Name: </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemGraphic>credit_card</ListItemGraphic>
                        <ListItemText>Serial No: </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemGraphic>filter_2</ListItemGraphic>
                        <ListItemText>Model: </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemGraphic>event</ListItemGraphic>
                        <ListItemText>Make/Origin: </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemGraphic>date_range</ListItemGraphic>
                        <ListItemText>Year of Manufacture: </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemGraphic>business</ListItemGraphic>
                        <ListItemText>Department: </ListItemText>
                      </ListItem>
                      <ListItem>
                        <ListItemGraphic>location_city</ListItemGraphic>
                        <ListItemText className="scroll">Hospital/Facility: </ListItemText>
                      </ListItem>
                    </List>
                  </div>
                  <div className = "list">
                    <List nonInteractive>
                    <ListItem>
                      <ListItemGraphic>warning</ListItemGraphic>
                      <ListItemText>Functional Status: </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemGraphic>check</ListItemGraphic>
                      <ListItemText>Maintenance Status: </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemGraphic>check</ListItemGraphic>
                      <ListItemText>Warranty Status: </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemGraphic>build</ListItemGraphic>
                      <ListItemText className="scroll">Maintenance Provider: GAT Consulting/MN Export</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemGraphic>local_shipping</ListItemGraphic>
                      <ListItemText className="scroll">Supplier: </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemGraphic>date_range</ListItemGraphic>
                      <ListItemText>Purchase Date: </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemGraphic>date_range</ListItemGraphic>
                      <ListItemText>Installation Date: </ListItemText>
                    </ListItem>
                  </List>
                </div>
              </div>
              </DialogBody>

              :

              <DialogBody>
                <div className = "modalImage">
                  <div>
                    <h3>Equipment Image</h3>
                    <img src="http://via.placeholder.com/350x200" alt="equipment snapshot"/>
                  </div>
                  <div>
                    <h3> QR Code </h3>
                    <img src="http://via.placeholder.com/350x200" alt="QRe"/>
                  </div>
                </div>
                <span className="comments"><strong>Enumerator Comments:</strong> The equipment is functional but requires more maintenance</span><br/>
              </DialogBody>
            }
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
