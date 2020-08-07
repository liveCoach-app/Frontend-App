import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CoachLive.css';


import { Stage, Layer, Rect, Text, Circle, Line, Image, Group } from 'react-konva';
import Konva from 'konva';
import NoteView from './NoteView.js'
import useImage from 'use-image';


export default function Map() {
  return (
    <Container fluid id="mapContainer">
      <NoteView />
      <Row id="mapRow">
        <Drawing />
      </Row>
    </Container>
  );
}


const MapImg = () => {
  const [image] = useImage('http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/map11.png');
  return <Image image={image} width={600} height={600}/>;
};



class Drawing extends Component {

  state = {
    lines: [],
    circlePoints: [],
    currentTool: 'brush',
    eraser: false,
    brush: true,
    circle: false,
    arrow: false,
  };


  makeCircle = () => {
    const stage = this.stageRef.getStage();
    const point = stage.getPointerPosition();
    const tempCircles = this.state.circlePoints;
    tempCircles[tempCircles.length - 1][1] = [point.x, point.y];
    this.setState({
      circlePoints: tempCircles
    })
  }



  handleMouseDown = () => {

    this._drawing = true;

    if(this.state.brush === true){

      // add line
      this.setState({
        lines: [...this.state.lines, []]
      });
    }
    else if(this.state.eraser === true) {
      const stage = this.stageRef.getStage();
      const point = stage.getPointerPosition();
      const xRange = [point.x - 15, point.x + 15]
      const yRange = [point.y - 15, point.y + 15]

      console.log('ERASING pointX: ' + point.x +' point y ' + point.y)

      const tempLines = this.state.lines;

      for(let i = 0; i < tempLines.length; i++) {
        const currentLine = tempLines[i];

        for(let z = 0; z < currentLine.length - 1; z = z+2) {

          if(currentLine[z] > xRange[0] && currentLine[z] < xRange[1]) {
            if(currentLine[z + 1] > yRange[0] && currentLine[z + 1] < yRange[1]) {
              tempLines.splice(i, 1);

              this.setState ({
                lines: tempLines
              });
              return;
            }
          }
        }
      }
    }
    else if (this.state.circle === true) {
      const stage = this.stageRef.getStage();
      const point = stage.getPointerPosition();
      const tempCircles = this.state.circlePoints;
      this.setState({
        circlePoints: [...this.state.circlePoints, [[point.x, point.y], [point.x, point.y]]]
      });
    }
  };

  handleMouseMove = e => {
    // const stage = this.stageRef.getStage();
    // const point = stage.getPointerPosition();
    // console.log('x is ' + point.x + 'y is ' + point.y)

    if (!this._drawing) {
      return;
    }

    if(this.state.brush === true) {
      const stage = this.stageRef.getStage();
      const point = stage.getPointerPosition();
      const { lines } = this.state;

      let lastLine = lines[lines.length - 1];
      // add point
      lastLine = lastLine.concat([point.x, point.y]);

      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      this.setState({
        lines: lines.concat()
      });
    }
    else if (this.state.circle === true) {
      this.makeCircle()
    }
  };

  handleMouseUp = () => {
    this._drawing = false;

    if(this.state.circle === true) {
      this.makeCircle()
    }
  };


  eraserClick = (evt) => {
    alert('eraser on');
    this.setState ({
      eraser: true,
      currentTool: 'eraser',
      brush: false,
      circle: false,
      arrow: false,
    })
  }

  brushClick = (evt) => {
    alert('brush on');
    this.setState ({
      eraser: false,
      currentTool: 'brush',
      brush: true,
      circle: false,
      arrow: false,
    })
  }

  clearClick = (evt) => {
    alert('Cleared All');
    this.setState ({
      lines: [],
      circlePoints: [],
    })
  }

  circleClick = (evt) => {
    alert('circle on');
    this.setState ({
      eraser: false,
      currentTool: 'circle',
      brush: false,
      circle: true,
      arrow: false,
    })
  }

  arrowClick = (evt) => {
    alert('arrow on');
    this.setState ({
      eraser: false,
      currentTool: 'arrow',
      brush: false,
      circle: false,
      arrow: true,
    })
  }


  RenderCircles = () => {

    let circleArray = []
    const circlePoints = this.state.circlePoints;
    for(let i = 0; i < circlePoints.length; i++) {
      const midpoint = circlePoints[i][0]
      const endpoint = circlePoints[i][1]
      console.log('midpoint: ' + midpoint + ' endpoint: ' + endpoint);


      const xsquared = (endpoint[0] - midpoint[0]) * (endpoint[0] - midpoint[0]);
      const ysquared = (endpoint[1] - midpoint[1]) * (endpoint[1] - midpoint[1]);
      const distance = Math.sqrt(xsquared + ysquared);
      circleArray.push(
      <Circle
        key={i}
        x={midpoint[0]}
        y={midpoint[1]}
        width={distance * 2}
        height={distance * 2}
        stroke={'blue'}
      />
    )
    }
    return circleArray;
  }

  render() {
    const stageWidth = 600;
    const stageHeight = 600;

    return (
      <div>
        <Container>
          <Row>
            <button
              onClick={this.brushClick}
              id="brushButton"
              className={this.state.currentTool === 'brush' ? 'activeTool' : ''}
            >
              Brush
            </button>
          </Row>
          <Row>
            <button
              onClick={this.eraserClick}
              id="eraserButton"
              className={this.state.currentTool === 'eraser' ? 'activeTool' : ''}
            >
              Eraser
            </button>
          </Row>
          <Row>
            <button
              onClick={this.circleClick}
              id="circleButton"
              className={this.state.currentTool === 'circle' ? 'activeTool' : ''}
            >
              Circle
            </button>
          </Row>
          <Row>
            <button
              onClick={this.arrowClick}
              id="arrowButton"
              className={this.state.currentTool === 'arrow' ? 'activeTool' : ''}
            >
              arrow
            </button>
          </Row>
          <Row>
            <button
              onClick={this.clearClick}
              id="clearButton"
            >
              Clear
            </button>
          </Row>

        </Container>


        <Stage
          container={'#mapRow'}
          width={stageWidth}
          height={stageHeight}
          onContentMousedown={this.handleMouseDown}
          onContentMousemove={this.handleMouseMove}
          onContentMouseup={this.handleMouseUp}
          ref={node => {
            this.stageRef = node;
          }}
        >
          <Layer>
            <MapImg />
          </Layer>
          <Layer>
            {
              this.RenderCircles()
            }
          </Layer>
          <Layer>
            {
              this.state.lines.map((line, i) => (<Line key={i} points={line} stroke="red" />))
            }
          </Layer>
        </Stage>
      </div>
    );
  }
}
