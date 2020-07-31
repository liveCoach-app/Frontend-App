import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CoachLive.css';


export default function Map() {
  return (
    <Container fluid id="mapContainer">
      <Row id="noteRow">
        <NotesButton />
      </Row>
      <Row id="mapRow">
        <MapBody />
      </Row>
    </Container>
  );
}

function NotesButton() {
  return(
      <button id="noteButton"><strong>+</strong> Add Note</button>
  );
}

function MapBody() {
  return(
    <div id="mapBodyDiv">Epic nice</div>
  )
}
