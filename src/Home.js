import React, { useState } from 'react';
import { Grid, Container, Link, Paper, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Login from './Login.js';
import LoggedIn from './LoggedIn.js';
import circle1200 from './circle_1200.png';
import circle600 from './circle_600.png';
import circle450 from './circle_450.png';
import './Home.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  circleTop: {
    position: 'fixed',
    backgroundImage: 'url('+ circle450 + ')',
    top: '-100px',
    right: '-400px',
    height: '500px',
    width: '500px',
    [theme.breakpoints.up('md')]: {
      display: 'block',
      top: '-700px',
      right: '-600px',
      height: '1200px',
      width: '1200px',
      backgroundImage: 'url('+ circle1200 + ')',
      opacity: '.7',
    }
  },
  circleBottom: {
    [theme.breakpoints.down('sm')]: {
      left: '-400px',
      bottom: '-400px',
    },
    position: 'fixed',
    left: '-300px',
    bottom: '-300px',
    height: '600px',
    width: '600px',
    background: 'url(' + circle600 + ')',
    opacity: .7,
  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 200,
    background: 'transparent',
    border: '1px solid #fff',
  },
  control: {
    padding: theme.spacing(2),
  },
}));
function Home() {
  const [loggedIn, setLogin] = useState(false);

  const classes = useStyles();
  
  function stateToggler() {
    setLogin(!loggedIn)
  }
  
  if (loggedIn) {
    return <LoggedIn></LoggedIn>
  }
  return <Login handler={stateToggler}></Login>
} 

export default Home;