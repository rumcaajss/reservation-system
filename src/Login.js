import React, { useState } from 'react';
import { Grid, Container, Link, Paper, Typography, Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
function Login(props) {
  
  const classes = useStyles();

  return (
    <div maxWidth="xl">
      <Typography variant="h2" gutterBottom>
        Please sign in first
      </Typography>
      <Button variant="contained" onClick={props.handler}>Sign in with Slack :)</Button>
    </div>
  )

} 

export default Login;