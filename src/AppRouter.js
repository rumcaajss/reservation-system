import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute';

import Parking from './Routes/Parking';
import Cameras from './Routes/Cameras';
import Login from './Routes/Login';
import Book from './Routes/Book';
import NotFound from './Routes/NotFound';


function AppRouter(props){
  const { loggedIn } = props;
  
  return (
    <Switch>
      <Route exact path="/" loggedIn={loggedIn} component={Book}/>
      <PrivateRoute loggedIn={loggedIn} exact path="/cameras">
        <Cameras/>
      </PrivateRoute>
      <PrivateRoute loggedIn={loggedIn} exact path="/parking">
        <Parking loggedIn={loggedIn}/>
      </PrivateRoute>
      <Route path="/login" render={() => loggedIn ? <Redirect to={{pathname: '/'}}/> : <Login/>}/>
      <Route component={NotFound} />
    </Switch>
  )
}

export default AppRouter;


