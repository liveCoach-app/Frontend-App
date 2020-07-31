
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';





export default function DetailsBar(props) {

  const pastGames = props.games;
  let selectedGame = {
    username: 'none selected',
    date: '0/0/0',
  };

  for(let i = 0; i < pastGames.length; i++) {
    if(pastGames[i].selected == true) {
      selectedGame = pastGames[i];
    }
  }

  return (
    <Container  fluid="xs">
      <GameDetails game={selectedGame}/>
      <Recording />
      <NotesList />
    </Container>
  );

}



function GameDetails(props) {
  const selectedGame = props.game;
  return(
    <Row id="detailsRow">
      <h1 id="detailsHead">Game Details</h1>
      <div id="gameCoach">Coach: {selectedGame.username}</div>
      <div id="gameTime">Time: 3:45-4:45 (60 mins)</div>
    </Row>
  );
}

function Recording() {
  return (
    <Row>
      <button id="recordingButton">
        <img src="recording.png" id="recordingSymbol"/>
        <div id="recordingTag">Recording</div>
      </button>
    </Row>
  );
}

function Note() {
  return (
    <li className="note">
      <div className="noteTime">
        Time: 4:18
      </div>
      <div className="noteContent">
        Hello, here you decide to do this but you shouldve done that, this would help a lot with wave management and you wouldn't have so much trouble with this and that in the future. Dont do this too much, as it is very not beneficial, also that is very unfortunate that your teammates did this.
      </div>
    </li>
  );

}

function NotesList() {
  return (
    <Row id="notesRow">
      <div id="notesTag">Coach's Notes</div>
      <ul id="notesList">
        <Note />
        <Note />
        <Note />
        <Note />
      </ul>
    </Row>

  );
}
