import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../CoachLive.css';


export default function MapSideBar(props) {


  const brushClick = props.brushClick;
  const eraserClick = props.eraserClick;
  const arrowClick = props.arrowClick;
  const circleClick = props.circleClick;
  const clearClick = props.clearClick;
  const currentTool = props.currentTool;
  return (
    <Container>
      <Row>
        <button
          onClick={brushClick}
          id="brushButton"
          className={currentTool === 'brush' ? 'activeTool' : ''}
        >
          Brush
        </button>
      </Row>
      <Row>
        <button
          onClick={arrowClick}
          id="arrowButton"
          className={currentTool === 'arrow' ? 'activeTool' : ''}
        >
          Arrow
        </button>
      </Row>
      <Row>
        <button
          onClick={eraserClick}
          id="eraserButton"
          className={currentTool === 'eraser' ? 'activeTool' : ''}
        >
          Eraser
        </button>
      </Row>
      <Row>
        <button
          onClick={circleClick}
          id="circleButton"
          className={currentTool === 'circle' ? 'activeTool' : ''}
        >
          Circle
        </button>
      </Row>
      <Row>
        <button
          onClick={clearClick}
          id="clearButton"
        >
          Clear
        </button>
      </Row>

    </Container>
  );
}
