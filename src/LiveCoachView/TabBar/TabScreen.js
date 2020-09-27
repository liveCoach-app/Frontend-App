import React from 'react';
import '../CoachLive.css';
import './TabScreen.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export default function TabScreen() {

  const renderBlueChamps = () => {
    return Data.map((champion,i) => {
      if(champion.team === 'blue') {
        return (
          <li key={i}>
            <Container fluid className="listItem blueItem">
              <Row>
                <Col xs={3} className="champCol">
                  <Row><img alt="luxImg" src="Lux_0.jpg" className="luxImg"/></Row>
                  <Row><div className="levelTag">13</div></Row>
                  <Row>
                    <Col><img alt="trinketImg" src="blue_trinket.jpg" className="trinketImg"/></Col>
                    <Col>R</Col>
                  </Row>
                </Col>
                <Col xs={9} className="mainCol">
                  <Row>
                    6/20/19 summ1 summ2
                  </Row>
                  <Row>
                    ITEMSSSS
                  </Row>
                </Col>
              </Row>
            </Container>
          </li>
        )
      }else {
        return <div></div>;
      }
    })
  }

  const renderRedChamps = () => {
    return Data.map((champion,i) => {
      if(champion.team === 'red') {
        return (
          <li key={i}>
            <Container fluid className="listItem redItem">
              <Row>
                <Col className="champCol">
                  <Row><img alt="luxImg" src="Lux_0.jpg" className="luxImg"/></Row>
                  <Row><div className="levelTag">13</div></Row>
                </Col>
                <Col className="summonerCol">
                  <Row>{champion.summonerSpells[0]}</Row>
                  <Row>{champion.summonerSpells[1]}</Row>
                </Col>
                <Col className="itemsCol">Items</Col>
                <Col className="trinketCol">Trinket</Col>
              </Row>
            </Container>
          </li>
        )
      }
      else{
        return <div></div>
      }
    })
  }

  const Data = [
    {
      name: 'lux',
      team: 'blue',
      items: ['ludens echo', 'needlessly large rod'],
      creepScore: 98,
      kill: 3,
      deaths: 0,
      assists: 2,
      level: 11,
      summonerSpells: ['teleport', 'flash'],
      trinket: ['farsight'],
      keyRune: 'Guardian',
      primaryRunes: ["Shield Bash", "Bone Plating", "Revitalize"],
      secondaryRunes: ["Nimbus Cloak", "Transendance"],
    },
    {
      name: 'lux',
      team: 'blue',
      items: ['ludens echo', 'needlessly large rod'],
      creepScore: 98,
      kill: 3,
      deaths: 0,
      assists: 2,
      level: 11,
      summonerSpells: ['teleport', 'flash'],
      trinket: ['farsight'],
      keyRune: 'Guardian',
      primaryRunes: ["Shield Bash", "Bone Plating", "Revitalize"],
      secondaryRunes: ["Nimbus Cloak", "Transendance"],
    },
    {
      name: 'lux',
      team: 'blue',
      items: ['ludens echo', 'needlessly large rod'],
      creepScore: 98,
      kill: 3,
      deaths: 0,
      assists: 2,
      level: 11,
      summonerSpells: ['teleport', 'flash'],
      trinket: ['farsight'],
      keyRune: 'Guardian',
      primaryRunes: ["Shield Bash", "Bone Plating", "Revitalize"],
      secondaryRunes: ["Nimbus Cloak", "Transendance"],
    },
    {
      name: 'lux',
      team: 'blue',
      items: ['ludens echo', 'needlessly large rod'],
      creepScore: 98,
      kill: 3,
      deaths: 0,
      assists: 2,
      level: 11,
      summonerSpells: ['teleport', 'flash'],
      trinket: ['farsight'],
      keyRune: 'Guardian',
      primaryRunes: ["Shield Bash", "Bone Plating", "Revitalize"],
      secondaryRunes: ["Nimbus Cloak", "Transendance"],
    },
    {
      name: 'lux',
      team: 'blue',
      items: ['ludens echo', 'needlessly large rod'],
      creepScore: 98,
      kill: 3,
      deaths: 0,
      assists: 2,
      level: 11,
      summonerSpells: ['teleport', 'flash'],
      trinket: ['farsight'],
      keyRune: 'Guardian',
      primaryRunes: ["Shield Bash", "Bone Plating", "Revitalize"],
      secondaryRunes: ["Nimbus Cloak", "Transendance"],
    },
    {
      name: 'lux',
      team: 'red',
      items: ['ludens echo', 'needlessly large rod'],
      creepScore: 98,
      kill: 3,
      deaths: 0,
      assists: 2,
      level: 11,
      summonerSpells: ['teleport', 'flash'],
      trinket: ['farsight'],
      keyRune: 'Guardian',
      primaryRunes: ["Shield Bash", "Bone Plating", "Revitalize"],
      secondaryRunes: ["Nimbus Cloak", "Transendance"],
    },
    {
      name: 'lux',
      team: 'red',
      items: ['ludens echo', 'needlessly large rod'],
      creepScore: 98,
      kill: 3,
      deaths: 0,
      assists: 2,
      level: 11,
      summonerSpells: ['teleport', 'flash'],
      trinket: ['farsight'],
      keyRune: 'Guardian',
      primaryRunes: ["Shield Bash", "Bone Plating", "Revitalize"],
      secondaryRunes: ["Nimbus Cloak", "Transendance"],
    },
    {
      name: 'lux',
      team: 'red',
      items: ['ludens echo', 'needlessly large rod'],
      creepScore: 98,
      kill: 3,
      deaths: 0,
      assists: 2,
      level: 11,
      summonerSpells: ['teleport', 'flash'],
      trinket: ['farsight'],
      keyRune: 'Guardian',
      primaryRunes: ["Shield Bash", "Bone Plating", "Revitalize"],
      secondaryRunes: ["Nimbus Cloak", "Transendance"],
    },
    {
      name: 'lux',
      team: 'red',
      items: ['ludens echo', 'needlessly large rod'],
      creepScore: 98,
      kill: 3,
      deaths: 0,
      assists: 2,
      level: 11,
      summonerSpells: ['teleport', 'flash'],
      trinket: ['farsight'],
      keyRune: 'Guardian',
      primaryRunes: ["Shield Bash", "Bone Plating", "Revitalize"],
      secondaryRunes: ["Nimbus Cloak", "Transendance"],
    },
    {
      name: 'lux',
      team: 'red',
      items: ['ludens echo', 'needlessly large rod'],
      creepScore: 98,
      kill: 3,
      deaths: 0,
      assists: 2,
      level: 11,
      summonerSpells: ['teleport', 'flash'],
      trinket: ['farsight'],
      keyRune: 'Guardian',
      primaryRunes: ["Shield Bash", "Bone Plating", "Revitalize"],
      secondaryRunes: ["Nimbus Cloak", "Transendance"],
    },

  ]
  return(
    <ul className="championList">
      <Row>
        <Col xs={6} className='blueCol'>{renderBlueChamps()}</Col>
        <Col xs={6} className='redCol'>{renderRedChamps()}</Col>
      </Row>
    </ul>
  )
}
