import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import './CoachLive.css';


export default function Header() {
  return (
    <Container fluid className="headerDiv">
      <span className="studentTag">Coaching:</span>
      <img src="logo.png" className="studentHeader" alt="img"/>
      <span className="studentUsername">Student Username </span>
    </Container>
  );
}
