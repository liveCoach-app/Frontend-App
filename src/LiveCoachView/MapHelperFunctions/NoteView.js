import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import '../CoachLive.css';


export default function NoteView(props) {

  const noteTab = props.noteTab;
  const handleClick = props.noteClick;
  const noteSubmit = props.noteSubmit;
  const annotations = props.annotationList;


  return (
    <Row className="noteRow">
      <NotesButton clicker={handleClick} showing={noteTab}/>
      <NoteTab show={noteTab} noteSubmit={noteSubmit} annotations={annotations} />
    </Row>
  );

}




function NotesButton(props) {
  const handleClick = props.clicker;
  const isShowing = props.showing;


  let buttonClass = 'noteButton';
  if(isShowing) {
    buttonClass = 'noteButton activeNoteButton';
  }

  return(
      <button className={buttonClass} onClick={handleClick}>
        <strong>+</strong> Add Note
      </button>
  );
}

function Annotations(props) {
  const annotations = props.annotations;
  console.log(annotations)
  if(annotations === void(0)) {
    return (<div>none detected</div>)
  }
  else {
    return (
      annotations.map(
        (annotation, i)=> {
          return (
            <li key={i} className="annotation">
              <div className="annotationText">{annotation.text}</div>
            </li>
          )
        }
      )
    )
  }

}

function NoteTab(props) {
  const isShowing = props.show;
  const noteSubmit = props.noteSubmit;
  const annotations = props.annotations;

  const render = () => {
    if(isShowing === false) {
      return(<div></div>);
    }
    else {
      return(
        <div>
          <form className="noteBox" onSubmit={noteSubmit}>
            <label className="noteTime"> Time: 42:35</label>
            <textarea placeholder="enter note" className="noteContent"/>
            <button>Enter</button>
          </form>
          <ul className="annotationList">
            <Annotations annotations={annotations}/>
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
