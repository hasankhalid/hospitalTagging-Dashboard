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
import axios from 'axios'

import NavBar from '../components/navbar';
import {Redirect} from 'react-router'

class HospitalView extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
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

  componentWillMount() {
    this.setTitle();
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
            <h1 className="title" style={{color: '#303F9F'}}>{this.props.location.state.hospital}</h1>
            <h2 className="title" style={{color: '#303F9F'}}>All Hospital Equipment by {this.state.title}</h2>
            <h2 className="title" style={{color: '#303F9F'}}>{this.state.currDepartment}</h2>

            {this.state.title === "Category" ?
            <div>
            <TabBarScroller>
            <TabBar
              activeTabIndex={this.state.activeTabIndex}
              onChange={evt => this.setState({'activeTabIndex': evt.target.value})}
              >
                <Tab onClick={() => this.updateValues(0)} style={{color: '#311B92'}}><TabIcon style={{color: '#311B92'}}>local_hospital</TabIcon><TabIconText> Biomedical Equipment</TabIconText></Tab>
                <Tab onClick={() => this.updateValues(1)} style={{color: '#311B92'}}><TabIcon style={{color: '#311B92'}}>local_hotel</TabIcon><TabIconText> Hospital Equipment</TabIconText></Tab>
                <Tab onClick={() => this.updateValues(2)} style={{color: '#311B92'}}><TabIcon style={{color: '#311B92'}}>ac_unit</TabIcon><TabIconText> Air Conditioner</TabIconText></Tab>
                <Tab onClick={() => this.updateValues(3)} style={{color: '#311B92'}}><TabIcon style={{color: '#311B92'}}>build</TabIcon><TabIconText> Generator</TabIconText></Tab>
            </TabBar>
            </TabBarScroller>
            <Button
              onClick={() => this.csvFunction()}
              raised
              style={{backgroundColor: '#FF3F80', marginTop: '10px'}}
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
                temporary
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
              <DialogSurface>
                <DialogHeader>
                  <DialogHeaderTitle>Bad News</DialogHeaderTitle>
                </DialogHeader>
                <DialogBody>This is a dead end. This row is empty. Please go back and select a valid row</DialogBody>
                <DialogFooter>
                    <DialogFooterButton accept>Close</DialogFooterButton>
                </DialogFooter>
              </DialogSurface>
              <DialogBackdrop />
            </Dialog>
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
                      {firstHalf.length > 0 && firstHalf.map((param) => (
                        <ListItem key={param.label}>
                          <ListItemGraphic>{param.icon}</ListItemGraphic>
                          <ListItemText className="scroll">{param.label + ": " + this.returnLabelValue(param.accessor)}</ListItemText>
                        </ListItem>
                      ))}
                      </List>
                    </div>
                    <div className = "list">
                      <List nonInteractive>
                      {secondHalf.length > 0 && secondHalf.map((param) => (
                        <ListItem key={param.label}>
                          <ListItemGraphic>{param.icon}</ListItemGraphic>
                          <ListItemText className="scroll">{param.label + ": " + this.returnLabelValue(param.accessor)}</ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </div>
                  </div>
                </DialogBody>
                :
                <DialogBody>
                  <div className = "modalImage">
                    <div>
                      <h3>Equipment Image</h3>
                      <div style={{height: '280px'}}>
                        <img style={{maxWidth: '100%', maxHeight: '100%'}} src={this.state.currValues.picUrl} alt="equipment snapshot"/>
                      </div>
                    </div>
                    <div>
                      <h3> QR Code </h3>
                      <QRCode
                        value={this.state.qrValue === false ? 'N/A' : this.state.currValues[this.state.columns[0].accessor]}
                        size={270}
                        bgColor={"#F2F1EF"}
                        fgColor={"#5B3256"}
                        level={"L"}
                      />
                    </div>
                  </div>
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
      </div>
    )
  }
}

export default HospitalView;
