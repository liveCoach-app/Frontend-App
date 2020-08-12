import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import {
  useHistory,
} from "react-router-dom";


export default function ProfileSideBar(props) {
  const clickHandler = props.clicker;

  return (
      <Container>
        <UserProfile />
        <HistoryBar clicker={clickHandler} games={props.games}/>
        <BackButton />
      </Container>
  );
}





function UserProfile() {
  return (
    <Row id="userNameBody">
      <img alt="" id="mainLogo" src="logo.png" />
      <Col>
        <h1 className="userName">Dekempsy4</h1>
        <button id="settingsButton">
          <Row >
            <img alt="" id="settingPic" src = "settings.png" />
            <h2 className="settingTag">Settings</h2>
          </Row>
        </button>
       </Col>
    </Row>
  );
}


function HistoryBar(props) {
  const handleClick = props.clicker;


  const gameList = [];

  for(let i = 0; i < props.games.length; i++) {
    if(props.games[i].className === "proposed") {
      gameList.push(<PastGame className={props.games[i].className} clicker={handleClick} game={props.games[i]} />);
    }
  }

  for(let i = 0; i < props.games.length; i++) {
    if(props.games[i].className === "past") {
      gameList.push(<PastGame className={props.games[i].className} clicker={handleClick} game={props.games[i]} />);
    }
  }

  return (
      <Row id="historyContainer">
        <ul id="historyList">
          {gameList}
        </ul>

        <button id="scheduleButton">
          <img alt="" src="shceduleButton.png" id="scheduleImg" width="100%" height="100%"/>
        </button>

      </Row>
  );
}




function BackButton() {
  const history = useHistory();

  const handleClick = (evt) => {
    history.push('/');
  }

  return (
    <button id="backButton" onClick={handleClick}>
      <img alt="" src="backButton.png" id="backButtonImg" />
    </button>
  );
}


function PastGame(props) {
  const handleClick = props.clicker;
  const game = props.game;
  const isSelected = props.game.selected

  let classes = props.className;
  if(isSelected) {
    classes = classes + ` selectedHistoryItem`;
  }


  const date = () => {
    if(props.game.className === "past") {
      return (
        <Row>
          <div className="dateTag">{game.date}</div>
          <div className="durationTag">Length: 1 hour</div>
        </Row>
      );
    }
    else if (props.game.className === "proposed") {
      return (
        <Row>
          <div className="dateTag">Proposed Time: {game.date}</div>
        </Row>
      );
    }
  }
  return(
    <li className="historyItem">
      <button className={classes} onClick={handleClick} id={game.id}>
        <Row>
          <div className="coachTag">Coach:</div>
          <img alt="" src="logo.png" className="coachIcon" />
          <div className="testerDiv">
            <div className="coachUsername">{game.username}</div>
          </div>
        </Row>
          {date()}
      </button>
    </li>
  );
}
