import '../CoachLive.css';
import React from 'react'


export default function Annotations(props) {
  const annotations = props.annotations;
  const selectAnnotation = props.selectAnnotation;
  const currentAnnotationNumber = props.currentAnnotationNumber;

  const renderButton = (i) => {
    if(parseInt(currentAnnotationNumber) !== i) {
      return (
        <button className="annotationDeleteButton" onClick={props.deleteAnnotation}>
          <div className={i} />
          <img
            alt="trashLogo"
            src="https://image.shutterstock.com/image-vector/recycle-bin-icon-logo-isolated-260nw-1701277879.jpg"
            className="trashImg"/>
        </button>
      )
    }
    else {
      return <div></div>
    }
  }

  const isClassSelected = (i) => {
    if(parseInt(currentAnnotationNumber) === i) {
      return ("selectedAnnotation")
    }
    else {
      return("annotation")
    }
  }

  if(annotations === void(0)) {
    return (<div>none detected</div>)
  }
  else {
    return (
      annotations.map(
        (annotation, i)=> {
          return (
            <li key={i}>
              <button className={isClassSelected(i)} onClick={selectAnnotation}>
                <div className={i}></div>
                <div className="annotationText">
                  {annotation.text}
                  {renderButton(i)}
                </div>
              </button>
            </li>
          )
        }
      )
    )
  }
}
