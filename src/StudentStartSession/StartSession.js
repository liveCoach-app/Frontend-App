
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './StudentStartSession.css';
import StartSessionBar from './StartSessionBar.js';
import DetailsBar from './DetailsBar.js';
import ProfileSideBar from './ProfileSideBar.js'



export default function StudentStart() {
  const [pastGames, setPastGames] = React.useState([
    {
      id: 0,
      className: "past",
      username: "Joe Biden",
      date: "6/20/20",
      selected: true,
    },
    {
      id: 1,
      className: "past",
      username: "Michelle Obama",
      date: "5/15/20",
      selected: false,
    },
    {
      id: 2,
      className: "past",
      username: "Donald Trump",
      date: "8/20/19",
      selected: false,
    },
    {
      id: 3,
      className: "past",
      username: "Joe Biden",
      date: "6/20/20",
    },
    {
      id: 4,
      className: "past",
      username: "Joe Biden",
      date: "6/20/20",
    },
    {
      id: 5,
      className: "past",
      username: "Joe Biden",
      date: "6/20/20",
    },
    {
      id: 6,
      className: "past",
      username: "Joe Biden",
      date: "6/20/20",
    },
    {
      id: 7,
      className: "past",
      username: "Joe Biden",
      date: "6/20/20",
    },
    {
      id: 8,
      className: "proposed",
      username: "Micheal Joradan",
      date: "6/20/20",
    }
  ]);




  const handleHistoryClick = (evt) => {
    let tempGamelist = pastGames.slice();
    const buttonId = evt.currentTarget.id;
    for(let i = 0; i < tempGamelist.length; i ++) {
      if(tempGamelist[i].selected === true) {
        tempGamelist[i].selected = false;
      }
      if(tempGamelist[i].id === buttonId) {
        tempGamelist[i].selected = true;
      }
    }

    setPastGames(tempGamelist);

  }




  return (
    <Row xs={12}>
      <Col sm={3} xs={12} id="sideBar"> <ProfileSideBar clicker={handleHistoryClick} games={pastGames}/> </Col>
      <Col sm={5} xs={12} id="detailsBar"> <DetailsBar games={pastGames}/> </Col>
      <Col sm={4} xs={12} id="startSessionBar" > <StartSessionBar /> </Col>
    </Row>
  );
}
