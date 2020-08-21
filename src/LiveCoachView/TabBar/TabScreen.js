import React from 'react';
import '../CoachLive.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function TabScreen() {

  const renderChamps = () => {
    return Data.map((champion,i) => {
      return (
        <li key={i}>
          <Container fluid className="listItem">
            <Row>
              <Col className="champCol">
                <Row>{champion.name}</Row>
                <Row>level</Row>
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
    })
  }

  const Data = [
    {
      name: 'lux',
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
     {renderChamps()}
    </ul>
  )
}
