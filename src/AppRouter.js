import React, { useEffect } from 'react';
import { Switch, Router, Route } from 'react-router-dom';

import PrivateRoute from './Routes/PrivateRoute';
import Parking from './Routes/Parking';
import Cameras from './Routes/Cameras';
import Login from './Routes/Login';
import Book from './Routes/Book';
import { AuthService } from './utils/Auth';


function AppRouter(props){
  useEffect(() => {
    // AuthService.authenticate();
  }, []);
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Book} />
      <PrivateRoute path='/cameras' component={Cameras}/>
      <PrivateRoute path="/parking" component={Parking} />
      <Route path="/login" component={Login} />
    </Switch>
  )
}

export default AppRouter;


