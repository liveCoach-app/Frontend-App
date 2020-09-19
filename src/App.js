
// atom.config.set('core.editor.multiCursorOnClick', true);

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import StudentStart from './StudentStartSession/StartSession.js';
import LiveCoachView from './LiveCoachView/CoachLive.js';
import StartScreen from './StartSession/StartScreen.js'
import makeFetchRequest from './HelperFunctions/MakeFetchRequest.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";



export default class App extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      id: "",
    };
  }


  createSession = async () => {
    const response = await makeFetchRequest("https://lca.devlabs-projects.info/sessions", "POST");
    this.setState({
      id: response.data.id,
    });
    return response.data.id;
  };


  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/StartScreen">
              <StartScreen createSession={this.createSession}/>
            </Route>
            <Route path="/StudentStart">
              <StudentStart />
            </Route>
            <Route path="/CoachLive" >
              <LiveCoachView annotate={this.createAnnotation}/>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

}

function Home() {
  return (
    <div>
      <ul>
        <h2>Home</h2>
        <li><Link to="/StudentStart">Student Start Screen</Link></li>
        <li><Link to="/CoachLive">Live Coach View</Link></li>
        <li><Link to="/StartScreen">Start Screen</Link> </li>
      </ul>
    </div>
  );
}
