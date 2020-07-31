import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CoachLive.css';


export default function Header() {
  return (
    <Container fluid id="headerDiv">
      <span id="studentTag">Coaching:</span>
      <img src="logo.png" id="studentHeader" />
      <span id="studentUsername">Student Username </span>
    </Container>
  );
}
