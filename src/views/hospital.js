import React, { Component } from 'react'
import { Grid, GridCell } from 'rmwc/Grid'
import { TabBar, Tab, TabIcon, TabIconText, TabBarScroller } from 'rmwc/Tabs';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Elevation } from 'rmwc/Elevation';


class HospitalView extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
    const path = this.props.location.pathname;
    {path === '/hospital' ? this.setState({ title: 'Category'
    }) : this.setState({ title: 'Department'
    })}
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
          <TabBar
            activeTabIndex={this.state.activeTabIndex}
            onChange={evt => this.setState({'activeTabIndex': evt.target.value})}
            >
              <Tab><TabIcon>local_hospital</TabIcon><TabIconText> Biomedical Equipment</TabIconText></Tab>
              <Tab><TabIcon>computer</TabIcon><TabIconText> Electrical Equipment</TabIconText></Tab>
              <Tab><TabIcon>local_hotel</TabIcon><TabIconText> Hospital Equipment</TabIconText></Tab>
          </TabBar>
          :
          <TabBar
            activeTabIndex={this.state.activeTabIndex}
            onChange={evt => this.setState({'activeTabIndex': evt.target.value})}
            >
              <Tab><TabIcon>local_hospital</TabIcon><TabIconText> Biomedical Equipment</TabIconText></Tab>
              <Tab><TabIcon>computer</TabIcon><TabIconText> Electrical Equipment</TabIconText></Tab>
          </TabBar>
        }
        </GridCell>
        <GridCell span = "12">
        <Elevation z={5}>
          <ReactTable
          className="highlight"
            data={this.state.rows}
            columns={this.state.columns}
          />
          </Elevation>
        </GridCell>
      </Grid>
    )
  }
}

export default HospitalView;
