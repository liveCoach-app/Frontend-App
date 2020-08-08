
// atom.config.set('core.editor.multiCursorOnClick', true);

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import StudentStart from './StudentStartSession/StartSession.js';
import LiveCoachView from './LiveCoachView/CoachLive.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


/*         <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/studentStart">Student Start Screen</Link>
            </li>
            <li>
              <Link to="/coachLive">Live Coach View</Link>
            </li>
          </ul>
        </nav> */


export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
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
      </ul>
    </div>
  );
}
