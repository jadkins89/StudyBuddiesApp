import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios';
import Select from 'react-select';

import './css/auth.css'
import AuthService from './AuthService';
import { courseData } from './data/courseData';

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirm_password: "",
      selectedCourses: [],
      error: ""
    }
    this.Auth = new AuthService();
    this.handleChange = this.handleChange.bind(this);
    this.handleMultiChange = this.handleMultiChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && (this.state.password === this.state.confirm_password) && this.state.password.length >= 6;
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value,
                    error: ""});
  }

  handleMultiChange = event => {
    this.setState(state => {
      return {
        selectedCourses: event
      };
    });
  }

  isConfirmedPassword = event => {
  return (event === this.state.password)
  }

  handleSubmit = event => {
    event.preventDefault();

    var parsedCourses = {};
    for (var i = 0; i < this.state.selectedCourses.length; i++) {
      var key = "course_" + (i + 1);
      parsedCourses[key] = "CSCI_" + this.state.selectedCourses[i].value;
    }

    const user = {
      email: this.state.email,
      password: this.state.password,
      courses: parsedCourses
    };

    axios.post(`http://localhost:8000/auth/signup`, user)
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.Auth.login(this.state.email, this.state.password)
          .then(res => {
            this.props.handleLogin();
          })
          .then(res => {
            this.props.history.replace('/home');
          })
          .catch(err => {
              alert(err);
          })
      })
      .catch(err => {
        this.setState({error: err.response.data.message});
      });
}

  render() {
    const imgSrc = "https://i.imgur.com/BEpyK.jpg";
    return (
      <div className="SignUp">
      <img src={imgSrc} className="bg" alt="Boulder Flatirons"/>
        <h1 className="SignUp_Banner">Lets get you signed up!</h1>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl autoFocus type="email"
                defaultValue={this.state.email}
                placeholder="name@example.com"
                onChange={this.handleChange.bind(this)}
                />
            </FormGroup>
            <h6 className="email_error">{this.state.error}</h6>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl autoFocus type="password"
                defaultValue={this.state.password}
                placeholder="Six characters or longer"
                autoComplete="new_password"
                onChange={this.handleChange.bind(this)}
                />
            </FormGroup>
            <FormGroup controlId="confirm_password" bsSize="large">
              <ControlLabel>Confirm password</ControlLabel>
              <FormControl autoFocus type="password"
                defaultValue={this.state.confirm_password}
                placeholder="Re-type password"
                autoComplete="new_password"
                onChange={this.handleChange.bind(this)}
              />
            </FormGroup>
            <ControlLabel>Current courses</ControlLabel>
            <Select
              isMulti
              options={courseData}
              className="basic-multi-select"
              value={ this.state.selectedCourses }
              onChange={this.handleMultiChange}
            />
            <Button
              className="Submit"
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type='submit'
            >
              Sign up!
            </Button>
          </form>
      </div>
    )
  }
}

export default SignUp;
