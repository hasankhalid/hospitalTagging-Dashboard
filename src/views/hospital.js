import React, { Component } from 'react'
import { Grid, GridCell } from '@rmwc/grid'
import { TabBar, Tab} from '@rmwc/tabs';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Elevation } from '@rmwc/elevation';
import { Button } from '@rmwc/button';

import { Dialog, DialogTitle, DialogContent,
         DialogActions, DialogButton} from '@rmwc/dialog';

import { List, ListItem, ListItemText, ListItemPrimaryText, ListItemSecondaryText, ListItemGraphic } from '@rmwc/list';

import { Drawer, DrawerHeader, DrawerContent } from '@rmwc/drawer';

import QRCode from 'qrcode.react';
import axios from 'axios'

import NavBar from '../components/navbar';
import {Redirect} from 'react-router'

class HospitalView extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
    this.setTitle();
    this.props.location.pathname === '/hospital' ?
      axios.post(`https://gat-gt.herokuapp.com/api/eqbytype`,{
        name: this.props.location.state.hospital,
        type: 0
      })
        .then(response => this.setState({
          params: response.data.params,
          columns: response.data.columns,
          rows: response.data.rows,
          equipmentCount: response.data.rows.length,
          filteredCount: response.data.rows.length,
          loading: false
        })
      )
      :
      axios.get(`https://gat-gt.herokuapp.com/api/departments`).then(response => this.setState({
        departments: response.data.data
      }))
    }

  csvFunction = () => {
    window.open('https://gat-gt.herokuapp.com/api/getcsv/' + window.escape(this.props.location.state.hospital) + '/' + this.state.activeTabIndex);
  }

   downloadFile = (fileName, urlData) => {
    var aLink = document.createElement('a');
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("click");
    aLink.download = fileName;
    aLink.href = urlData;
    aLink.dispatchEvent(evt);
  }

  setTitle = () => {
    const path = this.props.location.pathname;
    path === '/hospital' ? this.setState({ title: 'Category'})
    : this.setState({ title: 'Department'})
  }

  sliceArray = (array, half) => {
    var half_length = Math.ceil(array.length / 2);

    if (half === 0) {
      return array.slice(0,half_length)
    }
    else {
      return array.slice(half_length,array.length)
    }
  }

  state = {
    activeTabIndex: 0,
    data: '',
    emptyDialogOpen: false,

    columns: [],

    tabs: [],
    standardDialogOpen: false,
    viewDetail: false,

    rows: [],
    loading: true,

    departments: [],

    params: [],

    currValues: {},

    currDepartment: '',
    value: '1',
    tempOpen: false,
    qrValue: false,
    filteredCount: 0,
    equipmentCount: 0
  }

  toggleView = () => {
    const reverse = !this.state.viewDetail;
    this.setState({viewDetail: reverse})
  }

  handleDrawerClick = (name, value) => {
    this.setState({
      tempOpen: false,
    });
    this.setState({
      currDepartment: name
    })
    console.log(value);
    axios.post(`https://gat-gt.herokuapp.com/api/eqbydepartment`,{
      id: 0,
      department:0
    }).then(response => this.setState({
      params: response.data.params,
      columns: response.data.columns,
      rows: response.data.rows,
      loading: false
    }))
    console.log(this.state.currDepartment)
  }

  setCurrValues = (row) => {
    row === undefined ?
    this.setState({
      emptyDialogOpen: true
    })
    :
    this.setState({
      currValues: row.original,
      standardDialogOpen: true,
      qrValue: true
    })
  }

  returnLabelValue = (label) => {
    if(this.state.currValues[label] === null || this.state.currValues[label] ===  undefined) {
      return 'not entered'
    }
    else {
      return this.state.currValues[label]
    }
  }

  filterMethod = (filter, row, column) => {
   const id = filter.pivotId || filter.id
   return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
  }

  countFiltered = () => {
    this.setState({filteredCount: this.selectTable.getResolvedState().sortedData.length})
  }


  updateValues = (typeID) => {
      this.setState({
        loading: true,
        qrValue: false
      })
      axios.post(`https://gat-gt.herokuapp.com/api/eqbytype`,{
        name: this.props.location.state.hospital,
        type: typeID
      })
        .then(response => this.setState({
          params: response.data.params,
          columns: response.data.columns,
          rows: response.data.rows,
          equipmentCount: response.data.rows.length,
          filteredCount: response.data.rows.length,
          loading: false
        })
      )
  }

  render () {
    const changeMe = this.state.params;
    const firstHalf = this.sliceArray(changeMe,0);
    const secondHalf = this.sliceArray(changeMe,1);

    if (!window.localStorage.token) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <NavBar logout='logout'/>
        <Grid>
          <GridCell span = "12">
            <h1 className="title" style={{color: '#616161', fontWeight: '500'}}>{this.props.location.state.hospital}</h1>
            <h2 className="title" style={{color: '#303F9F', fontWeight: '400'}}>All Hospital Equipment by {this.state.title}</h2>

            {this.state.title === "Category" ?
            <div>
              <TabBar>
                <Tab onClick={() => this.updateValues(0)} style={{color: '#311B92'}} icon="local_hospital" label="Biomedical Equipment"/>
                <Tab onClick={() => this.updateValues(1)} style={{color: '#311B92'}} icon="local_hotel" label="Hospital Equipment"/>
                <Tab onClick={() => this.updateValues(2)} style={{color: '#311B92'}} icon="ac_unit" label="Air Conditioner"/>
                <Tab onClick={() => this.updateValues(3)} style={{color: '#311B92'}} icon="build" label="Generator"/>
              </TabBar>
            <Button
              onClick={() => this.csvFunction()}
              raised
              style={{backgroundColor: 'rgb(138, 138, 138)', margin: '25px 0px 10px 0px'}}
            >
              Export Selected Data
            </Button>
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
              <p style={{marginLeft: '5px'}}>Total Count: {this.state.equipmentCount}</p>
              <p style={{marginLeft: '5px'}}>Filtered Count: {this.state.filteredCount}</p>
            </div>
            </div>
            :
            <div>
              <Button
                onClick={() => this.setState({tempOpen: !this.state.tempOpen})}
                raised
                style={{backgroundColor: '#FF3F80'}}
              >
                Select Department
              </Button>
              <Drawer
                temporary = "true"
                open={this.state.tempOpen}
                onClose={() => this.setState({tempOpen: false})}
              >
                <DrawerHeader style={{backgroundColor: '#3F51B5'}}>
                 <ListItemGraphic size={40} style={{color: 'white'}}>business</ListItemGraphic>
                  Department List
                </DrawerHeader>
                <DrawerContent>
                {this.state.departments.length > 0 && this.state.departments.map((department) => (
                  <ListItem onClick={(e) => this.handleDrawerClick(department.label, department.value)} key={department.value}>
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
              ref={(r) => {
                this.selectTable = r;
              }}
              data={this.state.rows}
              columns={this.state.columns}
              loading={this.state.loading}
              defaultFilterMethod={this.filterMethod}
              onFilteredChange={this.countFiltered}
              defaultPageSize={100}
              pageSizeOptions={[20, 50, 100, 200, 300]}
              filterable={true}
              getTdProps={(state, rowInfo, column, instance) => {
              return {
                onClick: (e) => {
                  this.setCurrValues(rowInfo)
                }}}}
            />
            </Elevation>

            <Dialog
              open={this.state.emptyDialogOpen}
              onClose={evt => this.setState({emptyDialogOpen: false})}
            >
              <DialogTitle>Bad News</DialogTitle>
              <DialogContent>This is a dead end. This row is empty. Please go back and select a valid row</DialogContent>
              <DialogActions>
                <DialogButton action="close">Close</DialogButton>
              </DialogActions>
            </Dialog>

            <Dialog
              open={this.state.standardDialogOpen}
              onClose={evt => this.setState({standardDialogOpen: false})}
            >
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <DialogTitle>Equipment</DialogTitle>
                  <Button style={{marginRight: '24px'}} onClick={(e) =>this.toggleView()} dense>Switch View</Button>
                </div>
                {this.state.viewDetail === true ?
                <DialogContent>
                  <h4>These are equipment details</h4>
                  <div className = "listContain">
                    <div className = "list">
                      <List nonInteractive twoLine>
                      {firstHalf.length > 0 && firstHalf.map((param, index) => (
                        <ListItem key={param.label + index}>
                          <ListItemGraphic icon={param.icon}></ListItemGraphic>
                          <ListItemText>
                            <ListItemPrimaryText>{param.label}</ListItemPrimaryText>
                            <ListItemSecondaryText>{this.returnLabelValue(param.accessor)}</ListItemSecondaryText>
                          </ListItemText>
                        </ListItem>
                      ))}
                      </List>
                    </div>
                    <div className = "list">
                      <List nonInteractive twoLine>
                      {secondHalf.length > 0 && secondHalf.map((param, index) => (
                        <ListItem key={param.label + index}>
                          <ListItemGraphic icon={param.icon}></ListItemGraphic>
                          <ListItemText>
                            <ListItemPrimaryText>{param.label}</ListItemPrimaryText>
                            <ListItemSecondaryText>{this.returnLabelValue(param.accessor)}</ListItemSecondaryText>
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </div>
                  </div>
                </DialogContent>
                :
                <DialogContent>
                  <div className = "modalImage">
                    <div className="modalImage_first_child">
                      <h3 style={{fontWeight: '500', marginTop: '0px', marginBottom: '15px'}}>Equipment Image</h3>
                      <div>
                        <img style={{maxWidth: '100%', maxHeight: '100%', borderRadius: '10px'}} src={this.state.currValues.picUrl} alt="equipment snapshot"/>
                      </div>
                    </div>
                    <div className="modalImage_second_child">
                      <h3 style={{fontWeight: '500', marginTop: '0px', marginBottom: '15px'}}>QR Code</h3>
                      <div style={{border: '1px solid', borderColor: '#e0e0e0', padding: '6px 6px 0px 6px', borderRadius: '8px'}}>
                        <QRCode
                          value={this.state.qrValue === false ? 'N/A' : this.state.currValues[this.state.columns[0].accessor]}
                          size={170}
                          bgColor={"#424242"}
                          fgColor={"#e0e0e0"}
                          level={"L"}
                        />
                      </div>
                    </div>
                  </div>
                </DialogContent>
              }
              <DialogActions>
                <DialogButton action="close">Close</DialogButton>
              </DialogActions>
            </Dialog>
          </GridCell>
        </Grid>
      </div>
    )
  }
}

export default HospitalView;
