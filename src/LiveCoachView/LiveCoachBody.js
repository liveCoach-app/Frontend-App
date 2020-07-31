import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CoachLive.css';

import Stats from './LiveCoachStats'
import Map from './LiveCoachMap'


export default function LiveCoachBody() {
  return (
    <Row>
      <Col xs={6} id="statsSide"><Stats /></Col>
      <Col xs={6} id="mapSide"><Map /></Col>
    </Row>
  )
}
