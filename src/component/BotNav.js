import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Row, Col } from "mdbreact";

import { Footer } from 'react-materialize';
import './css/botNav.css';

var about_React = "https://reactjs.org/tutorial/tutorial.html";
var about_NodeJS = "https://nodejs.org/en/about/";
var about_PSQL = "https://www.postgresql.org/about/";

export class BotNav extends Component {
  render(){
    return (
      <div>
        <Footer
        className='example'
        links={
          <Row className="navRow">
            <Col className="copyRight">&copy; 2018 Copyright Text</Col>
            <Col className="navItem" ><a className="rowLink" href={about_PSQL} target="_blank" rel="noopener noreferrer">PostgreSQL</a></Col>
            <Col className="navItem" ><a className="rowLink" href={about_NodeJS} target="_blank" rel="noopener noreferrer">Node.js</a></Col>
            <Col className="navItem" ><a className="rowLink" href={about_React} target="_blank" rel="noopener noreferrer">React</a></Col>
          </Row>
        }
        >
        </Footer>
      </div>
      )
  }
}

export default withRouter(BotNav);
