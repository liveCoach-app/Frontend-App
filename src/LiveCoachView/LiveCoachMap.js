import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './CoachLive.css';



import { Stage, Layer, Line } from 'react-konva';
import { withRouter } from "react-router-dom";


import NoteView from './MapHelperFunctions/NoteView.js'
import MapSideBar from './MapHelperFunctions/MapSideBar.js'
import MapImg from './MapHelperFunctions/MapImg.js'
import renderArrows from './MapHelperFunctions/RenderArrows.js'
import renderCircles from './MapHelperFunctions/RenderCircles.js'
import makePoint from './MapHelperFunctions/MakePoint.js'
import makeLine from './MapHelperFunctions/MakeLine.js'
import deletePoint from './MapHelperFunctions/DeletePoint.js'



class Map extends Component {






  state = {
    lines: [],
    /*
      Lines is an array that contains arrays of points. Each array of points is a line
      Ex: [[line1], [line2], [line3]]
      Each individual line is a continueous array of values in which each odd value is an x coordiate and the next even value is it's corresponding y value.
      Ex: line1 might look like: [1, 2, 3, 4, 5, 6]
      The following example would draw a line through the points  (1,2) , (3,4) , and (5,6)
    */


    circlePoints: [],

    /*
      The circlepoints array contains lines.
      Ex: [ line1, line2, line3 ]
      Each lines is different from the previous array as it is and object cointining a startpoint and endpoint value.
      The startpoint and endpoint values are also objects with an x and y value corresponding to each coordinate.
      Ex:
          line 1 might be:
          {
           startpoint: point1,
           endpoint; point2,
          }
          and point 1 might be:
          {
            x: 10,
            y: 15,
          }
    */

    arrowPoints: [],
    // Arrow points is stuctured the exact same way as the circle points.
    currentTool: 'brush',

    //Note view state
    noteTab: false,

    id: "",
    annotations: [],
  };


  componentDidMount() {
    const { history } = this.props;
    const pathname = history.location.pathname.substring(11, 35);
    this.state.id = pathname;
    this.updateAnnotations(pathname);
  }

  updateAnnotations = (sessionId) => {
    (async () => {
      console.log('fetching annotations from id: ' + sessionId);

      const annotateRequest = await this.listAnnotations(sessionId);
      this.setState({
        annotations: annotateRequest.data,
      })
      console.log("annotations" + this.state.annotations);
    })();
  }


  listAnnotations = (sessionId) => {
    const endpoint = "https://lca.devlabs-projects.info/annotations/?session=" + sessionId;

    const asyncFunct = async () => {
      const response = await fetch(endpoint).then(res => res.json()).then((result) => {
        return result;
      });
      return response;
    }
    return asyncFunct();
  }



  createAnnotation = async (thisText, drawings, id) => {
    fetch("https://lca.devlabs-projects.info/annotations", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "text": thisText,
        "session": this.state.id,
        "drawings": drawings,
      }),
    })
      .then( res =>  console.log(res))
      let newAnnotations = this.state.annotations;
      newAnnotations.push({
        "text": thisText,
        "session": this.state.id,
        "drawings": drawings,
      });
      console.log('new annotations ' + newAnnotations);
      this.setState({
        annotations: newAnnotations,
      })
  }




  noteSubmit = async (evt) => {
    evt.preventDefault();
    const text = evt.currentTarget.children[1].value;
    const sampleDrawing = {
      "brush": this.state.lines,
      "circle": this.state.circlePoints,
      "arrow": this.state.arrowpoints,
    }
    this.createAnnotation(text, sampleDrawing, this.state.id)
      .then(
        result => {
          console.log('annotation created');
        }

      )

  }



  noteClick = () => {
    const currentNote = this.state.noteTab;
    this.setState({
      noteTab: !currentNote
    })
  }








  /*
    This function is called inside the mouse move function and it returns an array in which the endpoint of the last line in either circlepoints or arrowpoints is set to the cursors current position
  */
  changeEndpoint = (elementArray) => {
    const stage = this.stageRef.getStage();
    const point = stage.getPointerPosition();
    //make a copy in order to avoid direct mutation of state
    const tempArray = elementArray.slice(0);
    //select the last line and change the endpoint x and y values
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
      const shapeType = stage.targetShape.getAttrs().type;
      const shapeId = stage.targetShape.id();

      if(shapeType === 'line') {
        const tempArr = deletePoint(this.state.lines, shapeId);
        this.setState({
          lines: tempArr
        })
      }
      else if(shapeType === 'arrow') {
        const tempArr = deletePoint(this.state.arrowPoints, shapeId);
        this.setState({
          arrowPoints: tempArr
        })
      }
      if(shapeType === 'circle') {
        const tempArr = deletePoint(this.state.circlePoints, shapeId);
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
      //create new line entry in arrowPoints
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


  //sets currentTool to the id value of the clicked button
  onClick = (evt) => {
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
      <Container fluid className="mapContainer">
        <NoteView noteTab={this.state.noteTab} noteClick={this.noteClick} noteSubmit={this.noteSubmit} annotationList={this.state.annotations}/>
        <Row id="mapRow">
          <div className="MapDiv">
            <MapSideBar
              handleClick={this.onClick}
              clearClick={this.clearClick}
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
                  this.state.lines.map((line, i) => (<Line key={i} id={i} type="line" points={line} stroke="red" fill={'red'}/>))
                }
              </Layer>
            </Stage>
          </div>
        </Row>
      </Container>
    );
  }
}


export default withRouter(Map);
