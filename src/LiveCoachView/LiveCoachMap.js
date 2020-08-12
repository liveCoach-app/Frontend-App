import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './CoachLive.css';


import { Stage, Layer, Line } from 'react-konva';


import NoteView from './MapHelperFunctions/NoteView.js'
import MapSideBar from './MapHelperFunctions/MapSideBar.js'
import MapImg from './MapHelperFunctions/MapImg.js'
import renderArrows from './MapHelperFunctions/RenderArrows.js'
import renderCircles from './MapHelperFunctions/RenderCircles.js'
import makePoint from './MapHelperFunctions/MakePoint.js'
import makeLine from './MapHelperFunctions/MakeLine.js'
import deletePoint from './MapHelperFunctions/DeletePoint.js'



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
  };



  changeEndpoint = (elementArray) => {
    const stage = this.stageRef.getStage();
    const point = stage.getPointerPosition();
    //make a copy in order to avoid direct mutation of state
    const tempArray = elementArray.slice(0);
    tempArray[tempArray.length - 1].endpoint.x = point.x;
    tempArray[tempArray.length - 1].endpoint.y = point.y;
    return tempArray;
  };

  handleMouseDown = () => {

    this._drawing = true;

    if(this.state.currentTool === 'brush'){
      this.setState({
        lines: [...this.state.lines, []]
      });
    }
    else if(this.state.currentTool === 'eraser') {
      //get mouse pointer position
      const stage = this.stageRef.getStage();
      const shapeId = stage.targetShape.id();
      if(shapeId.charAt(1) === 'l') {
        const tempArr = deletePoint(this.state.lines, shapeId.charAt(0));
        this.setState({
          lines: tempArr
        })
      }
      else if(shapeId.charAt(1) === 'a') {
        const tempArr = deletePoint(this.state.arrowPoints, shapeId.charAt(0));
        this.setState({
          arrowPoints: tempArr
        })
      }
      if(shapeId.charAt(1) === 'c') {
        const tempArr = deletePoint(this.state.circlePoints, shapeId.charAt(0));
        this.setState({
          circlePoints: tempArr
        })
      }

    }
    else if (this.state.currentTool === 'circle') {
      //create new line entry in circlePoints
      const stage = this.stageRef.getStage();
      const point = stage.getPointerPosition();
      this.setState({
        circlePoints: [...this.state.circlePoints, makeLine(makePoint(point.x, point.y), makePoint(point.x, point.y))]
      });
    }
    else if (this.state.currentTool === 'arrow') {
      //create new entry in arrowPoints
      const stage = this.stageRef.getStage();
      const point = stage.getPointerPosition();

      this.setState({
        arrowPoints: [...this.state.arrowPoints, makeLine( makePoint(point.x, point.y),  makePoint(point.x, point.y) )]
      });
    };
  };




  handleMouseMove = e => {
    if (!this._drawing) {
      return;
    }

    if(this.state.currentTool === 'brush') {
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
    else if (this.state.currentTool === 'circle') {
      const tempElement = this.changeEndpoint(this.state.circlePoints)
      this.setState({
        circlePoints: tempElement
      })
    }
    else if (this.state.currentTool === 'arrow') {
      const tempElement = this.changeEndpoint(this.state.arrowPoints);
      this.setState({
        arrowPoints: tempElement
      })
    }
  };


  handleMouseUp = () => {
    this._drawing = false;
  };




  toolClick = (evt) => {
    const target = evt.currentTarget
    this.setState({
      currentTool: target.id
    })
  }

  clearClick = (evt) => {
    this.setState({
      circlePoints: [],
      lines: [],
      arrowPoints: [],
    })
  }



  render() {
    const stageWidth = window.innerWidth / 2.4;
    const stageHeight = window.innerWidth / 2.4;

    return (
      <div id="MapDiv">
        <MapSideBar
          brushClick={this.toolClick}
          arrowClick={this.toolClick}
          circleClick={this.toolClick}
          clearClick={this.clearClick}
          eraserClick={this.toolClick}
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
              renderCircles(this.state.circlePoints)
            }
          </Layer>
          <Layer>
            {
              renderArrows(this.state.arrowPoints)
            }
          </Layer>
          <Layer>
            {
              this.state.lines.map((line, i) => (<Line key={i} id={i + 'l'} points={line} stroke="red" fill={'red'}/>))
            }
          </Layer>
        </Stage>
      </div>
    );
  }
}
