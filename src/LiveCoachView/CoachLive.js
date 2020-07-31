import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './CoachLive.css';
import Header from './Header.js'
import Body from './LiveCoachBody.js'


export default function LiveCoachView() {
  return(
    <Container fluid="xs">
      <Row>
        <Header />
      </Row>
      <Body />
    </Container>
  );
}
