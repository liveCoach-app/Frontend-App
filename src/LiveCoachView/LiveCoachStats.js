import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CoachLive.css';

import {
  useHistory,
} from "react-router-dom";



export default function Stats() {
  const [tab, setTab] = React.useState('statistic');



  const handleClick = (evt) => {
    const target = evt.currentTarget;
    setTab(target.id);
  }

  return (
    <Container id="statsContainer">
      <Row>
        <Col xs={3} id="webCol"><button id="statistic" onClick={handleClick} className={tab === 'statistic' ? 'activeTab' : 'tabButton'}>
          Stat Website
        </button></Col>
        <Col xs={3} id="tabCol"><button id="liveData" onClick={handleClick} className={tab === 'liveData' ? 'activeTab' : 'tabButton'}>Tab Screen</button></Col>
      </Row>
      <Row id="statRow">
        <MainStats tabName={tab}/>
      </Row>
      <Row id="endRow">
        <EndSession />
      </Row>
    </Container>
  );
}


function MainStats(props) {
  const tabscreen = props.tabName

  const mainBody = () => {
    if(tabscreen === 'statistic') {
      return (<div className="statisticBody">STAT SCREEN</div>);
    }
    else if(tabscreen === 'liveData') {
      return (<div>TABSCREEN</div>);
    }
    else {
      return (<div>Error</div>);
    }
  }
  return (
    <div id="mainStatDiv">{mainBody()}</div>
  );
}


function EndSession() {
  const history = useHistory();

  const handleClick = (evt) => {
    history.push('/studentStart');
  }

  return(
    <button id="endSessionBtn" onClick={handleClick}>
      End Session
    </button>
  );
}
