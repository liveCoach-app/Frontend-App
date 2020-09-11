import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './StartSession.css'

import { withRouter } from "react-router-dom";







 class StartScreen extends React.Component {


  render() {
    const { history } = this.props;

    const handleClick = async (evt) => {
      evt.preventDefault();
      this.props.fetchId()
        .then(result => {
  
          return ('/CoachLive/' + result);
      })
        .then(result => history.push(result))


    }




    return(
      <Container fluid id="startScreenContainer">
        <Row id="headerRow">
          <Col xs={2}><img alt="hello" src="HeaderImg.png" id="headerImg" /></Col>
        </Row>
        <Row id="startScreenRow" xs={12}>
          <form id="startForm" onSubmit={handleClick}>
            <div><label id="startHeader">Start Live Session</label></div>
            <div><label id="startTag">You can begin coaching here</label></div>
            <button id="startSessionButton"><div id="">Start</div></button>
          </form>
        </Row>
        <Row id="footerRow">
        </Row>
      </Container>
    );
  }
}

export default withRouter(StartScreen);
