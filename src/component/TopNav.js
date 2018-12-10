import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link, withRouter } from "react-router-dom";

import './css/TopNav.css';

class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidUpdate() {
    if (localStorage.getItem("profile") !== null) {
      const profile = JSON.parse(localStorage.getItem("profile"));
      if (this.state.email !== profile.user.email) {
          this.setState({email: profile.user.email})
      }
    }
  }

  handleLogout() {
     this.props.handleLogout();
     this.props.history.replace('/login');
  }

  render () {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Study Buddies</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {(this.props.loggedIn) ?
          <Nav pullRight>
            <NavItem eventKey={1}  onClick = {this.handleLogout}>
              Logout
            </NavItem>
          </Nav>
          : null }
          <Navbar.Link pullRight className="gitLink" href="https://github.com/CSCI-3308-Project" target="_blank" rel="noopener noreferrer">GitHub</Navbar.Link>
          <Nav pullRight>
            {(this.props.loggedIn) ?
            <NavItem eventKey={2} href="#" to="#">
              You: {this.state.email}
            </NavItem>
            : null }
            {(!this.props.loggedIn) ?
            <NavItem eventKey={3} componentClass={Link} href="/login" to="/login">
              Login
            </NavItem>
            : null }
            {(!this.props.loggedIn) ?
            <NavItem eventKey={4} componentClass={Link} href="/register" to="/register">
              Register
            </NavItem>
            : null }
            {(this.props.loggedIn) ?
            <NavItem eventKey={5} componentClass={Link} href="/home" to="/home">
              Home
            </NavItem>
            : null }
            {(this.props.loggedIn) ?
            <NavItem eventKey={6} componentClass={Link} href="/resourcepage" to="/resourcepage">
              Resources
            </NavItem> 
            : null }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
};

export default withRouter(TopNav);
