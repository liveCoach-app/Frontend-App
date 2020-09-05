
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import './StudentStartSession.css';


import {
  useHistory,
} from "react-router-dom";


export default function StartSessionBar() {


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
        />
        <button id="startButton"><div id="startButtonTag">Start live Session!</div></button>
      </form>
    </Row>
  )
}
