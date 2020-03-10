import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    height: 'calc(100vh - 56px)',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1, 0),
    },
  },
  heading: {
    fontWeight: '600',
  },

}));


function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h1" color="secondary" className={classes.heading}>404</Typography>
      <Typography component="h1" variant="h3" >Page not found</Typography>
      <Button href="/" color="primary" variant="outlined">
        Go home?
      </Button>
    </div>)
  
}

export default NotFound;