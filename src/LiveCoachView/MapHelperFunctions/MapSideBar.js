import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
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
          id="brush"
          className={currentTool === 'brush' ? 'activeTool' : ''}
        >
          Brush
        </button>
      </Row>
      <Row>
        <button
          onClick={arrowClick}
          id="arrow"
          className={currentTool === 'arrow' ? 'activeTool' : ''}
        >
          Arrow
        </button>
      </Row>
      <Row>
        <button
          onClick={eraserClick}
          id="eraser"
          className={currentTool === 'eraser' ? 'activeTool' : ''}
        >
          Eraser
        </button>
      </Row>
      <Row>
        <button
          onClick={circleClick}
          id="circle"
          className={currentTool === 'circle' ? 'activeTool' : ''}
        >
          Circle
        </button>
      </Row>
      <Row>
        <button
          onClick={clearClick}
          id="clear"
        >
          Clear
        </button>
      </Row>

    </Container>
  );
}
