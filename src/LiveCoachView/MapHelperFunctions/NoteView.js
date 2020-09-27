import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import '../CoachLive.css';

import Annotations from './Annotations.js'


export default function NoteView(props) {
  const noteSubmit = props.noteSubmit;
  const annotations = props.annotationList;
  const deleteAnnotation = props.deleteAnnotation;
  const [noteTab, setNoteTab] = React.useState(false)

  const noteClick = () => {
    const currentNote = noteTab;
    setNoteTab(!currentNote);
  }

  return (
    <Row className="noteRow">
      <NotesButton clicker={noteClick} showing={noteTab}/>
      <NoteTab
        show={noteTab}
        noteSubmit={noteSubmit}
        annotations={annotations} deleteAnnotation={deleteAnnotation}
      />
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
