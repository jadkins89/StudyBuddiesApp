import React, { Component } from 'react';
import { Button, ControlLabel, FormControl } from "react-bootstrap";
import Select from 'react-select';
import axios from 'axios';

import { locationData } from './data/locationData';

var barAxios = axios.create({
  withCredentials: true,
  crossDomain: true
});

class PostBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          note: "",
          selectedCourse: "",
          location: ""
        }
        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    profile = JSON.parse(localStorage.getItem('profile'));

    handleNoteChange = event => {
      this.setState({ note: event.target.value });
    }

    handleSelectChange = event => {
      this.setState({ selectedCourse: event });
    }

    handleLocationChange = event => {
      this.setState({ location: event });
    }

    handleSubmit = event => {
      event.preventDefault();
      var formatCourse = "CSCI_" + this.state.selectedCourse.value;
      const post = {
        user_id: this.profile.user.user_id,
        course: formatCourse,
        location: this.state.location.label,
        note: this.state.note
      };
      barAxios.post(`https://study-buddies-api.herokuapp.com/data/addpost`, post)
        .then(res => {
          this.props.PersonalQuery() })
        .catch(error => {
          console.error(error);
        });
    }

    userCourses() {
      var profile = JSON.parse(localStorage.getItem('profile'));
      var dropDown = [];
      var courses = profile.user.user_courses;
      Object.keys(courses).forEach(function(key) {
        var val = courses[key].slice(5);
        dropDown.push({ value: val, label: courses[key] });
      });
      dropDown.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));
      return dropDown;
    }

    render() {
      const { selectedCourse, location, note } = this.state;
      return (
        <div className="addPost">
          <ControlLabel id="courseTitle">Course Select</ControlLabel>
          <div className="inlineSelect">
            <Select
              options={ this.userCourses() }
              className="basic-multi-select"
              value={ selectedCourse }
              onChange={ this.handleSelectChange }
            />
          </div>
          <ControlLabel id="locationTitle">Location</ControlLabel>
          <div className="inlineSelect">
            <Select
              options={ locationData }
              className="basic-multi-select"
              value={ location }
              onChange={ this.handleLocationChange }
            />
          </div>
          <form className="submitBtnForm" onSubmit={ this.handleSubmit }>
            <ControlLabel id="noteTitle">Description</ControlLabel>
            <FormControl type="text"
              id="noteField"
              defaultValue={ note }
              placeholder="Enter text"
              onChange={ this.handleNoteChange }
            />
            <Button className = "subBtn" type='submit'>Submit</Button>
          </form>
        </div>
      )};
}
export default PostBar;
