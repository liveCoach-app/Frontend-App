import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import '../CoachLive.css';


export default function NoteView() {

  const [noteTab, setNoteTab] = React.useState(false);

  const handleClick = (evt) => {
    setNoteTab(!noteTab);
  }

  return (
    <Row id="noteRow">
      <NotesButton clicker={handleClick} showing={noteTab}/>
      <NoteTab show={noteTab} />
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


  const render = () => {
    if(isShowing === false) {
      return(<div></div>);
    }
    else {
      return(
        <form id="noteBox">
          <label id="noteTime"> Time: 42:35</label>
          <textarea placeholder="enter note" id="noteContent" />
          <button>Enter</button>
        </form>

      );
    }
  }

  return (
    <div>
     {render()}
    </div>
  );
}
