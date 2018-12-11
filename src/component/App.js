import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AuthService from './AuthService';
import './css/general.css';

import SignUp from './SignUp';
import TopNav from './TopNav';
import BotNav from './BotNav';
import Error from './Error';
import Login from './Login';
import Home from './Home';
import Landing from './Landing';
import ResourcePage from './ResourcePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.Auth = new AuthService();
    this.handleLogin = this.handleLogin.bind();
  }

  componentDidMount() {
    if (this.Auth.loggedIn()) {
        this.setState({loggedIn: true});
    }
    else {
        this.setState({loggedIn: false});
    }
  }

  handleLogin = event => {
    localStorage.setItem("profile", JSON.stringify(this.Auth.getProfile()));
    this.setState({loggedIn: true
      });
  }

  handleLogout = event => {
    this.Auth.logout();
    this.setState({loggedIn: false});
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <TopNav loggedIn={this.state.loggedIn} handleLogout={this.handleLogout} />
          <Switch>
            <Route path="/register" render= {(props) => <SignUp {...props} handleLogin={this.handleLogin} />} />
            <Route path="/login" render= {(props) => <Login {...props} handleLogin={this.handleLogin} />} />
            <Route path="/home" render= {(props) => <Home {...props} />} />
            <Route path="/resourcepage" render= {(props) => <ResourcePage {...props} />} />
	          <Route exact path="/" component={Landing} />
            <Route component={Error} />
          </Switch>
		      <BotNav/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
