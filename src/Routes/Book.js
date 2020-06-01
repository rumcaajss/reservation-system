import React, { useState } from 'react';
import { Grid, Container, Paper, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import LoginDialog from '../Components/LoginDialog';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    minHeight: 'calc(100vh - 56px)',
    backgroundColor: theme.palette.grey['200'],
    position: 'relative'
  },
  button: {
    '&:hover, &:focus, &$focusVisible': {
      '& $titleDecoration': {
        opacity: '0'
      },
      '& $title': {
        borderColor: 'currentColor',
      },
    },

  },
  paper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    height: 300,
    width: 200,
    backgroundColor: theme.palette.grey['100'],
  },

  gridContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  title: {
    padding: theme.spacing(4, 1),
    textAlign: 'center',
    position: 'relative',
    border: '3px solid transparent',
    transition: theme.transitions.create('border-color'),

  },  
  titleDecoration: {
    content: '',
    display: 'block',
    position: 'absolute',
    left: '50%',
    bottom: '-3px',
    height: '3px',
    width: '30px',
    backgroundColor: theme.palette.error.light,
    transform: 'translateX(-50%)',
    transition: theme.transitions.create('opacity'),
  },
  heading: {
    textAlign: 'center',
    padding: theme.spacing(3, 0),
  },
}));


function Book(props) {
  const [options] = useState([{name: 'Parking Spot', link:'/parking'}, {name: 'Camera', link:'/cameras'}])
  const classes = useStyles();
  
  return (
    <main className={classes.root}>
      <Container maxWidth="xl">
        <Typography 
          className={classes.heading} 
          component="h2" 
          variant="h4" 
          color="secondary"
        >
          What would you like to book today?
        </Typography> 
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={4}
          className={classes.gridContainer}
        > 
          {options.map(value => (
            <Grid item key={value.link}>
              <Button className={classes.button} component={RouterLink} to={value.link}>
                <Paper elevation={6} className={classes.paper}>
                  <Typography 
                    className={classes.title} 
                    color="secondary" 
                    component="span"
                  >
                    {value.name}
                    <span className={classes.titleDecoration} />
                  </Typography>
                </Paper>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
      <LoginDialog
        // open={!props.loggedIn}
      />
    </main>
  )

} 

export default Book;