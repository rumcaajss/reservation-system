import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { isLoggedIn, AuthService }  from '../utils/Auth';


const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },  
  pageDecoration: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      height: '60%',
      width: '100%',
      clipPath: 'polygon(80% 80%, 100% 50%, 100% 100%, 0 100%, 0 0)',
      backgroundColor: 'rgba(71, 168, 139, 0.2)',
      // zIndex: 2,
    },
  },
}));


function PrivateRoute({ component: Component, ...rest }){
  const classes = useStyles();

  const [ loggedIn, setLoggedIn ] = useState(isLoggedIn());

  return (
    <div className={classes.root}>
      <Route {...rest} render={props =>
        loggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{pathname: "/login"}}/>
        )
      }/>
      <div className={classes.pageDecoration}></div>
    </div>
  )
}

export default PrivateRoute;