import React from 'react';
import  { Redirect } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import AuthService from './AuthService';
import './css/auth.css'


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Auth = new AuthService();
  }

  validateForm() {
    return this.state.email.length > 0;
  }

  handleChange = event => {
    this.setState({ [event.target.type]: event.target.value,
                    error: ""});
  }

  handleSubmit = event => {
    event.preventDefault();

    this.Auth.login(this.state.email, this.state.password)
      .then(res => {
        this.props.handleLogin();
      })
      .then(res => {
        this.props.history.replace('/home');
      })
      .catch(err => {
          this.setState({error: err.response.data.message});
      })
  }


  render() {
    const imgSrc = "https://images.pexels.com/photos/67517/pexels-photo-67517.jpeg?cs=srgb&dl=road-landscape-mountains-67517.jpg&fm=jpg";

    if(this.Auth.loggedIn()) {
      return <Redirect to='/home' />
    }
    return (
      <div className="Login">
        <img src={imgSrc} className="bg" alt="Mountains with road"/>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl autoFocus type="email"
                defaultValue={this.state.email}
                placeholder="name@example.com"
                onChange={this.handleChange}
                />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl autoFocus type="password"
                autoComplete="current_password"
                defaultValue={this.state.password}
                placeholder="type password"
                onChange={this.handleChange}
                />
            </FormGroup>
            <h6 className="login_error">{this.state.error}</h6>
            <Button className = "loginBtn"
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type='submit'
            >
              Login!
            </Button>
          </form>
        <div className = "LoginBody">
          <h2> “Two roads diverged in a wood, and I – I took the one less traveled by.” -Robert Frost </h2>
        </div>
      </div>

    )
  }
}

export default Login;
