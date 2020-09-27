import '../CoachLive.css';
import React from 'react'


export default function Annotations(props) {
  const annotations = props.annotations;

  const renderButton = (arr, i) => {
    if(i !== arr.length - 1) {
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

  if(annotations === void(0)) {
    return (<div>none detected</div>)
  }
  else {
    return (
      annotations.map(
        (annotation, i)=> {
          return (
            <li key={i} className="annotation">
              <div className="annotationText">
                {annotation.text}
                {renderButton(annotations, i)}
              </div>
            </li>
          )
        }
      )
    )
  }
}
