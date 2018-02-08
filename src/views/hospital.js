import React, { Component } from 'react'
import { Grid, GridCell } from 'rmwc/Grid'
import { TabBar, Tab, TabIcon, TabIconText, TabBarScroller} from 'rmwc/Tabs';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Elevation } from 'rmwc/Elevation';
import { Button } from 'rmwc/Button';

import { Dialog, DialogSurface, DialogHeader, DialogHeaderTitle, DialogBody,
         DialogFooter, DialogFooterButton, DialogBackdrop, } from 'rmwc/Dialog';

import { List, ListItem, ListItemText, ListItemGraphic } from 'rmwc/List';

import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';

import QRCode from 'qrcode.react';

class HospitalView extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  componentWillMount() {
    this.setTitle();
  }

  setTitle = () => {
    const path = this.props.location.pathname;
    path === '/hospital' ? this.setState({ title: 'Category'})
    : this.setState({ title: 'Department'})
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
      Header: 'Make/Origin',
      accessor: 'make',
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
        make: 'Make'},
      {
        serial: 'biomedical',
        name: 'Equipment',
        model: '2002',
        make: 'Make'}],
    departments: [
    {   label: 'Emergency',
        value: '1' },{
        label: 'Medical',
        value: '2'},{
        label: 'Surgery',
        value: '3' },{
        label: 'TB & Chest',
        value: '4'},{
        label: 'Eye',
        value: '5'},{
        label: 'ICU',
        value: '6' },{
        label: 'Dental',
        value: '7'},{
        label: 'Dialysis',
        value: '8'},{
        label: 'NNN',
        value: '9' },{
        label: 'PCR/Main Lab',
        value: '10'},{
        label: 'Gynae',
        value: '11'},{
        label: 'Dermatology',
        value: '12' },{
        label: 'Gastroscopy',
        value: '13'},{
        label: 'Radiology',
        value: '14'},{
        label: 'Physiotherapy',
        value: '15' },{
        label: 'Blood Bank',
        value: '16'},{
        label: 'Orthopaedic',
        value: '17'},{
        label: 'ENT',
        value: '18' },{
        label: 'PAEDS',
        value: '19'},{
        label: 'Special Treatment',
        value: '20'},{
        label: 'Psychiatry',
        value: '21' }
  ],
    value: '1',
    tempOpen: false
  }

  toggleView = () => {
    const reverse = !this.state.viewDetail;
    this.setState({viewDetail: reverse})
  }

  handleDrawerClick = (name) => {
    this.setState({
      tempOpen: false,
    });
    console.log(name)
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
              <Tab><TabIcon>build</TabIcon><TabIconText> AC/Generator</TabIconText></Tab>
          </TabBar>
          </TabBarScroller>
          :
          <div>
            <Button
              onClick={() => this.setState({tempOpen: !this.state.tempOpen})}
              raised
            >
              Select Department
            </Button>
            <Drawer
              temporary
              open={this.state.tempOpen}
              onClose={() => this.setState({tempOpen: false})}
            >
              <DrawerHeader>
               <ListItemGraphic size={40} style={{color: 'white'}}>business</ListItemGraphic>
                Department List
              </DrawerHeader>
              <DrawerContent>
              {this.state.departments.length > 0 && this.state.departments.map((department) => (
                <ListItem onClick={(e) => this.handleDrawerClick(department.label)} key={department.value}>
                  <ListItemText>{department.label}</ListItemText>
                </ListItem>
              ))}
              </DrawerContent>
            </Drawer>
          </div>
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
                    <img src="http://via.placeholder.com/480x270" alt="equipment snapshot"/>
                  </div>
                  <div>
                    <h3> QR Code </h3>
                    <QRCode
                      value={"1"}
                      size={270}
                      bgColor={"#F2F1EF"}
                      fgColor={"#5B3256"}
                      level={"L"}
                    />
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
