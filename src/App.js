import React from 'react';
import Home from './Home.js';
import { Container} from '@material-ui/core';
import Cameras from './Cameras.js';
import Parking from './Parking.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App-body">
      <Container maxWidth="xl">
        <Router>
          <Switch>
            <Route path="/cameras">
              <Cameras />
            </Route>
            <Route path="/parking">
              <Parking />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
