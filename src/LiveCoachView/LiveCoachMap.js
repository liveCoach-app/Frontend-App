import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CoachLive.css';


import { Stage, Layer, Rect, Text, Circle, Line, Image, Group } from 'react-konva';
import Konva from 'konva';
import NoteView from './NoteView.js'


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




// const MapImage = () => {
//   const [image] = useImage('./MapImg.png');
//   return <Image image={image} />;
// };

class Drawing extends Component {
  state = {
    lines: [],
    currentTool: 'brush',
    eraser: false,
    brush: true,
  };

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
        console.log('xrange ' + xRange)

        const yRange = [point.y - 15, point.y + 15]
        console.log('yrange ' + yRange)




        console.log('ERASING pointX: ' + point.x +' point y ' + point.y)

        const tempLines = this.state.lines;

        for(let i = 0; i < tempLines.length; i++) {
          const currentLine = tempLines[i];

          for(let z = 0; z < currentLine.length - 1; z = z+2) {
            console.log('z is ' + z)

            if(currentLine[z] > xRange[0] && currentLine[z] < xRange[1]) {
              console.log('FOUND X     FOUND X')
              if(currentLine[z + 1] > yRange[0] && currentLine[z + 1] < yRange[1]) {

                console.log('FOUND Y        FOUND Y');
                tempLines.splice(i, 1);

                this.setState ({
                  lines: tempLines
                });
              }
            }
          }
        }
      }
  };

  handleMouseMove = e => {
    //  no drawing - skipping
    //  alert('drawing ' + !this._drawing + ' erasing ' + this.state.erasing)

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

  };

  handleMouseUp = () => {
    this._drawing = false;
  };

  eraserClick = (evt) => {
    alert('eraser on');
    this.setState ({
      eraser: true,
      currentTool: 'eraser',
      brush: false,
    })
  }
  brushClick = (evt) => {
    alert('brush on');
    this.setState ({
      eraser: false,
      currentTool: 'brush',
      brush: true,
    })
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
              id="eraserButton"
              className={this.state.currentTool === 'brush' ? 'activeTool' : ''}
            >
              Brush
            </button>
          </Row>
          <Row>
            <button
              onClick={this.eraserClick}
              id="brushButton"
              className={this.state.currentTool === 'eraser' ? 'activeTool' : ''}
            >
              Eraser
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
            <Rect
            width={stageWidth}
            height={stageHeight}
            fill={'white'}
            />

            {this.state.lines.map((line, i) => (
              <Line key={i} points={line} stroke="red" />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}
