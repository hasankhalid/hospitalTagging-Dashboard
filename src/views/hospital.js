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

class HospitalView extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.location.pathname === '/hospital' ?
      axios.post(`https://gat-gt.herokuapp.com/api/eqbytype`,{
        id: 0,
        type: 0
      })
        .then(response => this.setState({
          params: response.data.params,
          columns: response.data.columns,
          rows: response.data.rows,
          loading: false
        }))
      :
      axios.get(`https://gat-gt.herokuapp.com/api/departments`).then(response => this.setState({
        departments: response.data.data
      }))
    }

  componentWillMount() {
    this.setTitle();
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
    this.setState({
      currDepartment: name
    })
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
    this.setState({
      currValues: row.original
    })
  }

  returnLabelValue = (label) => {
    return this.state.currValues[label]
  }

  render () {
    console.log(this.state.data.params)
    console.log(this.state.activeTabIndex)
    const changeMe = this.state.params;
    const firstHalf = this.sliceArray(changeMe,0);
    const secondHalf = this.sliceArray(changeMe,1);
    return (
      <Grid>
        <GridCell span = "12">
          <h1 className="title">{this.props.location.state.hospital}</h1>
          <h2 className="title">All Hospital Equipment by {this.state.title}</h2>
          <h2 className="title">{this.state.currDepartment}</h2>

          {this.state.title === "Category" ?
          <TabBarScroller>
          <TabBar
            activeTabIndex={this.state.activeTabIndex}
            onChange={evt => this.setState({'activeTabIndex': evt.target.value})}
            >
              <Tab><TabIcon>local_hospital</TabIcon><TabIconText> Biomedical Equipment</TabIconText></Tab>
              <Tab><TabIcon>local_hotel</TabIcon><TabIconText> Hospital Equipment</TabIconText></Tab>
              <Tab><TabIcon>ac_unit</TabIcon><TabIconText> Air Conditioner</TabIconText></Tab>
              <Tab><TabIcon>build</TabIcon><TabIconText> Generator</TabIconText></Tab>
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
            loading={this.state.loading}
            defaultPageSize={100}
            pageSizeOptions={[20, 50, 100, 200, 300]}
            filterable={true}
            getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e) => {
                this.setCurrValues(rowInfo)
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
                    {firstHalf.length > 0 && firstHalf.map((param) => (
                      <ListItem key={param.label}>
                        <ListItemGraphic>{param.icon}</ListItemGraphic>
                        <ListItemText className="scroll">{param.label + this.returnLabelValue(param.accesor)}</ListItemText>
                      </ListItem>
                    ))}
                    </List>
                  </div>
                  <div className = "list">
                    <List nonInteractive>
                    {secondHalf.length > 0 && secondHalf.map((param) => (
                      <ListItem key={param.label}>
                        <ListItemGraphic>{param.icon}</ListItemGraphic>
                        <ListItemText className="scroll">{param.label + this.returnLabelValue(param.accesor)}</ListItemText>
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
                    <img style={{width: '100%'}} src="http://via.placeholder.com/480x270" alt="equipment snapshot"/>
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
