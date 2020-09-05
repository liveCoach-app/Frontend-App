
// atom.config.set('core.editor.multiCursorOnClick', true);

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import StudentStart from './StudentStartSession/StartSession.js';
import LiveCoachView from './LiveCoachView/CoachLive.js';
import StartScreen from './StartSession/StartScreen.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";



export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/StartScreen">
            <StartScreen />
          </Route>
          <Route path="/StudentStart">
            <StudentStart />
          </Route>
          <Route path="/CoachLive">
            <LiveCoachView />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
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
