import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import './CoachLive.css';


export default function Header() {
  return (
    <Container fluid id="headerDiv">
      <span id="studentTag">Coaching:</span>
      <img src="logo.png" id="studentHeader" alt="img"/>
      <span id="studentUsername">Student Username </span>
    </Container>
  );
}
