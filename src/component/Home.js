import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import AuthService from './AuthService';
import StudyBuddyTable from './StudyBuddyTable'

import './css/home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.Auth = new AuthService();
  }

  profile = JSON.parse(localStorage.getItem('profile'));

  render() {
    const imgSrc = "https://images.unsplash.com/photo-1506783323968-e8dad28ae1de?ixlib=rb-1.2.1&auto=format&fit=crop&w=2690&q=80";

    if (!this.Auth.loggedIn()) {
        return <Redirect to='/login' />
    }
    return (
        <div className="container">
        <img src={imgSrc} className="bg" alt="Dark Blue Beach"/>
          <div className="table" style={{ marginTop: 30 }}>
            <StudyBuddyTable />
          </div>
        </div>
    );
  }
}

export default Home;
