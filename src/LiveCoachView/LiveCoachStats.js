import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './CoachLive.css';


export default function Stats() {
  const [tab, setTab] = React.useState('statistic');


  function setColor() {
    console.log(tab)
    var statBtn =  document.getElementById('webButton');
    var tabBtn = document.getElementById('tabButton');
    if (tab === false) {
        statBtn.style.backgroundColor = "#D8D8D8"
        tabBtn.style.backgroundColor = "#FFFFFF"
    }
    else if(tab === true){
        statBtn.style.backgroundColor = "#FFFFFF"
        tabBtn.style.backgroundColor = "#D8D8D8"
    }
  }



  const handleClick = (evt) => {
    const target = evt.currentTarget;
    setTab(target.id);
    // if(target.id === "webButton" && tab === true) {
    //   setTab(false);
    // }
    // else if(target.id === "tabButton" && tab === false) {
    //   setTab(true);
    // }
    //setColor();
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
    else if(tabscreen === 'live') {
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
  return(
    <button id="endSessionBtn">
      End Session
    </button>
  );
}
