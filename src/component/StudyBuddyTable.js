import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Button } from "react-bootstrap";
import axios from 'axios';

import PostBar from './PostBar'

var dataAxios = axios.create({
  withCredentials: true,
  crossDomain: true
});

var URL = 'https://study-buddies-api.herokuapp.com'

class StudyBuddyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
          tableData: [],
          selected: []
        }
        this.PersonalQuery = this.PersonalQuery.bind(this);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.handleOnSelectAll = this.handleOnSelectAll.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    profile = JSON.parse(localStorage.getItem('profile'));

    componentDidMount() {
      this.PersonalQuery();
    }

    PersonalQuery = ()  => {
      dataAxios.post(URL + `/data`, this.profile.user.user_courses)
        .then(res => this.setState({tableData: res.data}))
        .catch(error => {
          console.error(error);
        });
    }

    HandleQuery = () => {
      dataAxios.get(URL + `/data`)
        .then(res => this.setState({tableData: res.data }))
        .catch(error => {
          console.error(error);
        });
    }

    colFormatter(cell, row) {
      var loadProfile = JSON.parse(localStorage.getItem('profile'));
      var link = "https://mail.google.com/mail/?view=cm&fs=1&to=" + cell;
      if (loadProfile.user.user_id === row.user_id) {
        return (
          <strong>{cell}</strong>
      )} else {
        return (
          <a href={link} target="_blank" rel="noopener noreferrer">{cell}</a>
      )}
    };

    handleOnSelect = (row, isSelect) => {
      if (isSelect) {
        this.setState({selected: [...this.state.selected, row.post_id]});
      } else {
        this.setState(() => ({
          selected: this.state.selected.filter(x => x !== row.post_id)
        }));
      }
    }

    handleOnSelectAll = (isSelect, rows) => {
      const ids = rows.map(r => r.post_id);
      if (isSelect) {
        this.setState({ selected: ids });
      } else {
        this.setState({ selected: [] });
      }
    }

    handleSubmit = event => {
      event.preventDefault();
      console.log(this.state.selected);
      dataAxios.post(URL + `/data/deletepost`, this.state.selected)
        .then(res => {
          this.PersonalQuery()})
        .catch(error => {
          console.error(error);
        });
    }

    nonSelectable() {
      var arr = [];
      for(var i = 0; i < this.state.tableData.length; i++) {
        var obj = this.state.tableData[i];
        if (obj.user_id !== this.profile.user.user_id) {
          arr.push(obj.post_id)
        }
      }
      return arr;
    }

    render() {
      const columns = [{
          dataField: 'post_id',
          text: 'Post Number',
          hidden: true
        }, {
          dataField: 'course',
          text: 'Course',
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: '100px'};
          }
        }, {
          dataField: 'location',
          text: 'Location',
          sort: true,
          headerStyle: (column, colIndex) => {
            return { width: '100px' };
          }
        }, {
          dataField: 'email',
          text: 'Contact Information',
          formatter: this.colFormatter,
          headerStyle: (column, colIndex) => {
            return { width: '280px' };
          }
        }, {
          dataField: 'note',
          text: 'Message'
        }];

        const defaultSorted = [{
          dataField: 'course',
          order: 'asc'
        }];


        const selectRow = {
          mode: 'checkbox',
          clickToSelect: true,
          classes: 'selection-row',
          style: { backgroundColor: '#c8e6c9' },
          selected: this.state.selected,
          onSelect: this.handleOnSelect,
          onSelectAll: this.handleOnSelectAll,
          nonSelectable: this.nonSelectable()
      };

      return (
        <div className='container'>
          <PostBar PersonalQuery={this.PersonalQuery} />
          <BootstrapTable
          striped
          hover
          keyField='post_id'
          data={ this.state.tableData }
          columns={ columns }
          selectRow={ selectRow }
          defaultSorted={ defaultSorted } />
          <form className="tableForm" onSubmit={ this.handleSubmit }>
            <Button className = "delBtn" type='submit'>Delete Selected</Button>
          </form>
        </div>
      )
    }
}

export default StudyBuddyTable;
