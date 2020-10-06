import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import '../CoachLive.css';

import Annotations from './Annotations.js'


export default function AnnotationView(props) {
  const annotationSubmit = props.annotationSubmit;
  const annotations = props.annotationList;
  const deleteAnnotation = props.deleteAnnotation;
  const [annotationTab, setAnnotationTab] = React.useState(false)

  const annotationClick = () => {
    const currentAnnotation = annotationTab;
    setAnnotationTab(!currentAnnotation);
  }

  return (
    <Row className="annotationRow">
      <AnnotationsButton clicker={annotationClick} showing={annotationTab}/>
      <AnnotationTab
        show={annotationTab}
        annotationSubmit={annotationSubmit}
        annotations={annotations} deleteAnnotation={deleteAnnotation}
      />
    </Row>
  );
}


function AnnotationsButton(props) {
  const handleClick = props.clicker;
  const isShowing = props.showing;

  let buttonClass = 'annotationButton';
  if(isShowing) {
    buttonClass = 'annotationButton activeAnnotationButton';
  }

  return(
      <button className={buttonClass} onClick={handleClick}>
        <strong>+</strong> Annotate
      </button>
  );
}



function AnnotationTab(props) {
  const isShowing = props.show;
  const annotationSubmit = props.annotationSubmit;
  const annotations = props.annotations;

  const render = () => {
    if(isShowing === false) {
      return(<div></div>);
    }
    else {
      return(
        <div>
          <form className="annotationBox" onSubmit={annotationSubmit}>
            <label className="annotationTime"> Time: 42:35</label>
            <textarea placeholder="enter annotation text" className="annotationContent"/>
            <button>Enter</button>
          </form>
          <ul className="annotationList">
            <Annotations annotations={annotations} deleteAnnotation={props.deleteAnnotation}/>
          </ul>
        </div>
      );
    }
  }

  return (
    <div>
     {render()}
    </div>
  );
}
