import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CoachLive.css';


import { Stage, Layer, Rect, Text, Circle, Line, Image, Group, Arrow } from 'react-konva';
import Konva from 'konva';

import NoteView from './MapHelperFunctions/NoteView.js'
import MapSideBar from './MapHelperFunctions/MapSideBar.js'
import Distance from  './MapHelperFunctions/Distance.js'
import IsOnLine from './MapHelperFunctions/IsOnLine.js'
import MapImg from './MapHelperFunctions/MapImg.js'
import RenderArrows from './MapHelperFunctions/RenderArrows.js'
import RenderCircles from './MapHelperFunctions/RenderCircles.js'



export default function LiveCoachMap() {
  return (
    <Container fluid id="mapContainer">
      <NoteView />
      <Row id="mapRow">
        <Map />
      </Row>
    </Container>
  );
}

class Map extends Component {

  state = {
    lines: [],
    circlePoints: [],
    arrowPoints: [],
    currentTool: 'brush',
    eraser: false,
    brush: true,
    circle: false,
    arrow: false,
  };



  makeElement = (elementArray) => {
    const stage = this.stageRef.getStage();
    const point = stage.getPointerPosition();
    const tempArray = elementArray;
    tempArray[tempArray.length - 1][1] = [point.x, point.y];
    this.setState({
      elementArray: tempArray
    })
  }



  handleMouseDown = () => {
    this._drawing = true;

    if(this.state.brush === true){
      this.setState({
        lines: [...this.state.lines, []]
      });
    }
    else if(this.state.eraser === true) {

      //get mouse pointer position
      const stage = this.stageRef.getStage();
      const point = stage.getPointerPosition();


      console.log('ERASING pointX: ' + point.x +' point y ' + point.y)



                      //Check to see if an arrow will be erased instead

      const tempArrows = this.state.arrowPoints;
      //loop through each arrow in tempArrows
      for(let i = 0; i < tempArrows.length; i++) {
        const currentArrow = tempArrows[i];
        const startpoint = currentArrow[0]
        const endpoint = currentArrow[1]
        const slope = (endpoint[1] - startpoint[1]) / (endpoint[0] - startpoint[0])
        //function of line in between each point.
        if (IsOnLine(startpoint, endpoint, [point.x, point.y], slope)) {
          tempArrows.splice(i, 1);
          this.setState({
            arrowPoints: tempArrows
          })
          return;
        }
      }

                    //Check to see if circle will be erased
      const tempCircles = this.state.circlePoints;
      for(let i = 0; i < tempCircles.length; i++) {
        const currentCircle = tempCircles[i];
        const midpoint = currentCircle[0];
        const radius = Distance(currentCircle[0], currentCircle[1]);
        const radiusRange = [radius - 10, radius + 10];
        const pointDistance = Distance([point.x,point.y], midpoint);
        if(pointDistance < radiusRange[1] && pointDistance > radiusRange[0]) {
          tempCircles.splice(i, 1);
          this.setState({
            circlePoints: tempCircles
          });
          return;
        }
      }

                    //Set up ranges for eraser so that user only has to click close to line.
      const xRange = [point.x - 15, point.x + 15]
      const yRange = [point.y - 15, point.y + 15]
      const tempLines = this.state.lines;
      //loop through each line in templines
      for(let i = 0; i < tempLines.length; i++) {
        const currentLine = tempLines[i];
        //loop through each value, the value z will be the index for the x-value of the point, making z + 1 the y value of that point
        for(let z = 0; z < currentLine.length - 1; z = z+2) {
          //Check to see if x value of point lies within the range
          if(currentLine[z] > xRange[0] && currentLine[z] < xRange[1]) {
            //Check to see if y value of point lies within the range
            if(currentLine[z+1] > yRange[0] && currentLine[z+1] < yRange[1]) {
              //deletes a line
              tempLines.splice(i, 1);
              this.setState ({
                lines: tempLines
              });
              return;
            }
          }
        }
      }

    //End of Eraser
    }
    else if (this.state.circle === true) {
      //create new entry in circlePoints
      const stage = this.stageRef.getStage();
      const point = stage.getPointerPosition();
      this.setState({
        circlePoints: [...this.state.circlePoints, [[point.x, point.y], [point.x, point.y]]]
      });
    }
    else if (this.state.arrow === true) {
      //create new entry in arrowPoints
      const stage = this.stageRef.getStage();
      const point = stage.getPointerPosition();

      this.setState({
        arrowPoints: [...this.state.arrowPoints, [[point.x, point.y], [point.x, point.y]]]
      });
    }

  };




  handleMouseMove = e => {
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
      this.makeElement(this.state.circlePoints)
    }
    else if (this.state.arrow === true) {
      this.makeElement(this.state.arrowPoints)
    }
  };


  handleMouseUp = () => {
    this._drawing = false;
  };




  eraserClick = (evt) => {
    this.setState ({
      eraser: true,
      currentTool: 'eraser',
      brush: false,
      circle: false,
      arrow: false,
    })
  }

  brushClick = (evt) => {
    this.setState ({
      eraser: false,
      currentTool: 'brush',
      brush: true,
      circle: false,
      arrow: false,
    })
  }

  clearClick = (evt) => {
    this.setState ({
      lines: [],
      circlePoints: [],
      arrowPoints: [],

    })
  }

  circleClick = (evt) => {
    this.setState ({
      eraser: false,
      currentTool: 'circle',
      brush: false,
      circle: true,
      arrow: false,
    })
  }

  arrowClick = (evt) => {
    this.setState ({
      eraser: false,
      currentTool: 'arrow',
      brush: false,
      circle: false,
      arrow: true,
    })
  }



  render() {
    const stageWidth = window.innerWidth / 2.4;
    const stageHeight = window.innerWidth / 2.4;

    return (
      <div id="MapDiv">
        <MapSideBar
          brushClick={this.brushClick}
          arrowClick={this.arrowClick}
          circleClick={this.circleClick}
          clearClick={this.clearClick}
          eraserClick={this.eraserClick}
          currentTool={this.state.currentTool}
        />
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
              RenderCircles(this.state.circlePoints)
            }
          </Layer>
          <Layer>
            {
              RenderArrows(this.state.arrowPoints)
            }
          </Layer>
          <Layer>
            {
              this.state.lines.map((line, i) => (<Line key={i} points={line} stroke="red" fill={'red'}/>))
            }
          </Layer>
        </Stage>
      </div>
    );
  }
}
