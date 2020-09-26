import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './CoachLive.css';



import { Stage, Layer, Line } from 'react-konva';
import { withRouter } from "react-router-dom";



import Map from './MapHelperFunctions/Map.js'
import NoteView from './MapHelperFunctions/NoteView.js'
import MapSideBar from './MapHelperFunctions/MapSideBar.js'
import MapImg from './MapHelperFunctions/MapImg.js'
import renderArrows from './MapHelperFunctions/RenderArrows.js'
import renderCircles from './MapHelperFunctions/RenderCircles.js'
import makePoint from './MapHelperFunctions/MakePoint.js'
import makeLine from './MapHelperFunctions/MakeLine.js'
import makeFetchRequest from '../HelperFunctions/MakeFetchRequest.js'
import deletePoint from './MapHelperFunctions/DeletePoint.js'



class LiveCoachMap extends Component {

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

    id: "",
    annotations: [],
  };


  componentDidMount(evt) {
    const { history } = this.props;
    const pathname = history.location.search.substring(1);
    console.log("selected path: " + pathname)
    this.state.id = pathname;
    this.updateAnnotations(pathname);
  }


  updateAnnotations = async (sessionId) => {
    console.log('fetching annotations from id: ' + sessionId);
    const annotateRequest = await this.listAnnotations(sessionId);
    this.setState({
      annotations: annotateRequest.data,
    })
    console.log("annotations" + this.state.annotations);
  }


  listAnnotations = async (sessionId) => {
    const endpoint = "https://lca.devlabs-projects.info/annotations/?session=" + sessionId;
    const response = await makeFetchRequest(endpoint, "GET");
    return response;
  }



  createAnnotation = async (thisText, drawings, id) => {
    const request = await fetch("https://lca.devlabs-projects.info/annotations", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "text": thisText,
        "session": id,
        "drawings": drawings,
      }),
    })
    const jsonResponse = request.json();
    console.log("create annotation response: " + jsonResponse);
    let newAnnotations = this.state.annotations;
    newAnnotations.push({
      "text": thisText,
      "session": id,
      "drawings": drawings,
    });
    console.log('new annotations ' + newAnnotations);
    this.setState({
      annotations: newAnnotations,
    })
  }


  deleteAnnotation = async (e) => {

    // DELETE THE ANNOTATION
    const annotationKey = e.currentTarget.children[0].className
    const selectedAnnotation = this.state.annotations[annotationKey]._id;
    const endpoint = 'https://lca.devlabs-projects.info/annotations/' + selectedAnnotation;
    const response = await makeFetchRequest(endpoint, 'DELETE')
    console.log(response)

    //UPDATE STATE
    let tempAnnotations = this.state.annotations;
    tempAnnotations.splice(annotationKey, 1);
    this.setState({
      annotations: tempAnnotations,
    })


  }



  noteSubmit = async (evt) => {
    evt.preventDefault()
    const text = evt.currentTarget.children[1].value;
    const sampleDrawing = {
      "brush": this.state.lines,
      "circle": this.state.circlePoints,
      "arrow": this.state.arrowpoints,
    }
    const submit = await this.createAnnotation(text, sampleDrawing, this.state.id)
    console.log('annotation created');
  }





  /*
    This function is called inside the mouse move function and it returns an array in which the endpoint of the last line in either circlepoints or arrowpoints is set to the cursors current position
  */
  changeEndpoint = (elementArray, point) => {
    //make a copy in order to avoid direct mutation of state
    const tempArray = elementArray.slice(0);
    //select the last line and change the endpoint x and y values
    tempArray[tempArray.length - 1].endpoint.x = point.x;
    tempArray[tempArray.length - 1].endpoint.y = point.y;
    return tempArray;
  };

  handleMouseDown = (evt) => {
    this._drawing = true


    const stage = evt.currentTarget;
    const point = stage.getPointerPosition();
    if(this.state.currentTool === 'brush'){
      this.setState({
        lines: [...this.state.lines, []]
      });
    }
    else if(this.state.currentTool === 'eraser') {
      //get mouse pointer position
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

      this.setState({
        circlePoints: [...this.state.circlePoints, makeLine(makePoint(point.x, point.y), makePoint(point.x, point.y))]
      });
    }
    else if (this.state.currentTool === 'arrow') {
      //create new line entry in arrowPoints


      this.setState({
        arrowPoints: [...this.state.arrowPoints, makeLine( makePoint(point.x, point.y),  makePoint(point.x, point.y) )]
      });
    };
  };




  handleMouseMove = e => {
    if (!this._drawing) {
      return;
    }

    const stage = e.currentTarget;
    const point = stage.getPointerPosition();

    if(this.state.currentTool === 'brush') {

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
      const tempElement = this.changeEndpoint(this.state.circlePoints, point)
      this.setState({
        circlePoints: tempElement
      })
    }
    else if (this.state.currentTool === 'arrow') {
      const tempElement = this.changeEndpoint(this.state.arrowPoints, point);
      this.setState({
        arrowPoints: tempElement
      })
    }
  };

  handleMouseUp = () => {
    this._drawing = false;
  };


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


  //sets currentTool to the id value of the clicked button


  render() {


    return (
      <Container fluid className="mapContainer">
        <NoteView
          noteTab={this.state.noteTab}
          noteClick={this.noteClick}
            noteSubmit={this.noteSubmit} annotationList={this.state.annotations}
            deleteAnnotation={this.deleteAnnotation}
          />
        <Map
          currentTool={this.state.currentTool} onClick={this.onClick}
          clearClick={this.clearClick}
          circlePoints={this.state.circlePoints}
          arrowPoints={this.state.arrowPoints}
          lines={this.state.lines}
          handleMouseDown={this.handleMouseDown}
          handleMouseMove={this.handleMouseMove}
          handleMouseUp={this.handleMouseUp}

        />
      </Container>
    );
  }
}


export default withRouter(LiveCoachMap);
