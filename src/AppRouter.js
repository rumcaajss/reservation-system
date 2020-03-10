import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './Routes/PrivateRoute';

import Parking from './Routes/Parking';
import Cameras from './Routes/Cameras';
import Login from './Routes/Login';
import Book from './Routes/Book';
import NotFound from './Routes/NotFound';
import { AuthService } from './utils/Auth';


function AppRouter(props){
  useEffect(() => {
    AuthService.authenticate(props.setLoggedIn);
  }, [props.loggedIn]);

  return (
    <Switch>
      <Route exact path="/" component={Book}/>
      <PrivateRoute loggedIn={props.loggedIn} exact path="/cameras">
        <Cameras/>
      </PrivateRoute>
      <PrivateRoute loggedIn={props.loggedIn} exact path="/parking">
        <Parking loggedIn={props.loggedIn}/>
      </PrivateRoute>
      <Route path="/login" render={() => props.loggedIn ? <Redirect to={{pathname: '/'}}/> : <Login/>}/>
      <Route component={NotFound} />
    </Switch>
  )
}

export default AppRouter;


