import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './StartSession.css'

import { withRouter } from "react-router-dom";
import { useHistory } from 'react-router';






 class StartScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://lca.devlabs-projects.info/sessions", {
      method: "POST",

    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }



  render() {
    const { history } = this.props;

    const handleClick = () => {
      alert("the id is: " + this.state.items.data.id)
      history.push('/CoachLive')
    }




    return(
      <Container fluid id="startScreenContainer">
        <Row id="headerRow">
          <Col xs={2}><img alt="hello" src="HeaderImg.png" id="headerImg" /></Col>
        </Row>
        <Row id="startScreenRow" xs={12}>
          <form id="startForm" onSubmit={handleClick}>
            <div><label id="startHeader">Start Live Session</label></div>
            <div><label id="startTag">You can begin coaching here</label></div>
            <button id="startSessionButton"><div id="">Start</div></button>
          </form>
        </Row>
        <Row id="footerRow">
        </Row>
      </Container>
    );
  }
}

export default withRouter(StartScreen);
