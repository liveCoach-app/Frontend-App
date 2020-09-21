import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import '../CoachLive.css';



import { Stage, Layer, Line } from 'react-konva';
import { withRouter } from "react-router-dom";


import MapSideBar from './MapSideBar.js'
import MapImg from './MapImg.js'
import renderArrows from './RenderArrows.js'
import renderCircles from './RenderCircles.js'




export default class Map extends Component {
  render() {
    const stageWidth = window.innerWidth / 2.4;
    const stageHeight = window.innerWidth / 2.4;

    return(
      <Row id="mapRow">
        <div className="MapDiv">
          <MapSideBar
            handleClick={this.props.onClick}
            clearClick={this.props.clearClick}
            currentTool={this.props.currentTool}
          />
          <Stage
            container={'#mapRow'}
            width={stageWidth}
            height={stageHeight}
            onContentMousedown={this.props.handleMouseDown}
            onContentMousemove={this.props.handleMouseMove}
            onContentMouseup={this.props.handleMouseUp}
            ref={node => {
              this.stageRef = node;
            }}
          >
            <Layer>
              <MapImg />
            </Layer>
            <Layer>
              {
                renderCircles(this.props.circlePoints)
              }
            </Layer>
            <Layer>
              {
                renderArrows(this.props.arrowPoints)
              }
            </Layer>
            <Layer>
              {
                this.props.lines.map((line, i) => (<Line key={i} id={i} type="line" points={line} stroke="red" fill={'red'}/>))
              }
            </Layer>
          </Stage>
        </div>
      </Row>
    );

  }
}
