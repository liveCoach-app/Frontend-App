
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './StartSession.css';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";


export default function StartSessionBar() {

  const [disc, setDisc] = React.useState('');

  const history = useHistory();

  const handleSubmit = (evt) => {
    history.push('/CoachLive');
  }

  return(
    <Row id="startSessionRow">
      <form id="startSessionSquare" onSubmit={handleSubmit}>
        <label id="liveTitle">Start Live Session</label>
        <label id="summonerInfo">Dekempsy4 (Na)</label>
        <input
          id="discInput"
          placeholder="Enter coach's discord"
          onChange={e => setDisc(e.target.value)}
        />
        <button id="startButton"><div id="startButtonTag">Start live Session!</div></button>
      </form>
    </Row>
  )
}
