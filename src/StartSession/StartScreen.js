import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './StartSession.css'

import { useHistory } from "react-router-dom";







 export default function StartScreen(props) {


  const history = useHistory();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const id = await props.createSession();

    const liveUrl = '/CoachLive/';
    history.push({
      pathname: liveUrl,
      search: id,
    });
  }


  return(
    <Container fluid id="startScreenContainer">
      <Row id="headerRow">
        <Col xs={2}><img alt="hello" src="HeaderImg.png" id="headerImg" /></Col>
      </Row>
      <Row id="startScreenRow" xs={12}>
        <form id="startForm" onSubmit={handleSubmit}>
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
