import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CoachLive.css';

import Stats from './LiveCoachStats'
import Map from './LiveCoachMap'


export default function LiveCoachBody(props) {
  return (
    <Row>
      <Col xs={6} className="statsSide"><Stats /></Col>
      <Col xs={6} className="mapSide"><Map /></Col>
    </Row>
  )
}
