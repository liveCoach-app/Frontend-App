import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import './CoachLive.css';


import { withRouter } from "react-router-dom";



import Map from './MapHelperFunctions/Map.js'
import AnnotationView from './MapHelperFunctions/AnnotationView.js'
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
    currentAnnotationId: '',
    currentAnnotationNumber: 0,
    text: '',
  };


  componentDidMount(evt) {
    this.setUpAnnotations()
  }


  updateText = async (evt) => {
    const currentText = evt.currentTarget.children[1].value;
    await this.setState({
      text: currentText,
    })
  }


  updateAnnotationList = async () => {
    const annotateRequest = await this.listAnnotations();
    await this.setState({
      annotations: annotateRequest.data,
    })
    if(this.state.annotations.length === 0) {
      await this.createAnnotation()
    }
  }


  listAnnotations = async () => {
    const endpoint = "https://lca.devlabs-projects.info/annotations/?session=" + this.state.id;
    const response = await makeFetchRequest(endpoint, "GET", '');
    return response;
  }



  setUpAnnotations = async () => {
    const { history } = this.props;
    const pathname = history.location.search.substring(1);
    await this.setState({
      id: pathname
    })

    await this.updateAnnotationList()
    this.setState({
      currentAnnotationId: this.state.annotations[this.state.annotations.length - 1]._id
    })
  }


  selectAnnotation = async (evt) => {
    this.updateAnnotation()
    const annotationNumber = evt.currentTarget.children[0].className;
    const currentAnnotation = this.state.annotations[annotationNumber];
    console.log(currentAnnotation)
    await this.setState({
      currentAnnotationId: currentAnnotation._id,
      text: currentAnnotation.text,
      lines: currentAnnotation.drawings.brush,
      arrowPoints: currentAnnotation.drawings.arrow,
      circlePoints: currentAnnotation.drawings.circle,
      currentAnnotationNumber: annotationNumber,
    })
  }


  createAnnotation = async () => {
    const response = await makeFetchRequest(
      "https://lca.devlabs-projects.info/annotations",
      "POST",
      {
        "text": 'New Annotation',
        "session": this.state.id,
        "drawings": 'hello',
      },
    )

    await this.updateAnnotationList()
    await this.setState({
      currentAnnotationId: this.state.annotations[this.state.annotations.length - 1]._id,
      lines: [],
      arrowPoints: [],
      circlePoints: [],
      text: '',
    })

  }

  updateAnnotation = async () => {
    const drawing = {
        "brush": this.state.lines,
        "circle": this.state.circlePoints,
        "arrow": this.state.arrowPoints,
    }

    const endpoint = "https://lca.devlabs-projects.info/annotations/" + this.state.currentAnnotationId

    if(this.state.text === "") {
      await this.setState({
        text: "Unnamed"
      })
    }
    await makeFetchRequest(
      endpoint,
      "PUT",
      {
        "text": this.state.text,
        "session": this.state.id,
        "drawings": drawing,
      }
    );
    console.log("annotation updated!");
    await this.updateAnnotationList();
  }



  submitAnnotation = async (evt) => {
    evt.preventDefault()
    const text = evt.currentTarget.children[1].value;
    await this.updateAnnotation();
    await this.createAnnotation();
    console.log('annotation created');
  }


  deleteAnnotation = async (e) => {
    // DELETE THE ANNOTATION
    const annotationKey = e.currentTarget.children[0].className
    const selectedAnnotation = this.state.annotations[annotationKey]._id;
    const endpoint = 'https://lca.devlabs-projects.info/annotations/' + selectedAnnotation;
    const response = await makeFetchRequest(endpoint, 'DELETE', '')
    this.updateAnnotationList(this.state.id)
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
    this.updateAnnotation('current');
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
        <AnnotationView
          annotationTab={this.state.annotationTab}
          annotationClick={this.annotationClick}
          annotationSubmit={this.submitAnnotation}
          annotationList={this.state.annotations}
          deleteAnnotation={this.deleteAnnotation}
          annotationSelect={this.selectAnnotation}
          updateText={this.updateText}
          text={this.state.text}
          currentAnnotationNumber={this.state.currentAnnotationNumber}
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
