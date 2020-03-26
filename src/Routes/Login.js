import React from 'react';
import {  Link, Typography, Paper, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../Components/Copyright';



const useStyles = makeStyles(theme => ({
  root: {
    height: 'calc(100vh - 56px)',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1478186172078-2a70949993f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  paper: {
    '& > *': {
      margin: theme.spacing(1, 0),
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey['200'],
    color: theme.palette.secondary.main,
  },
}));



function Login(props) {
  const teamId = process.env.REACT_APP_TEAM_ID;
  const classes = useStyles();
  const redirect = process.env.NODE_ENV === 'development' ? encodeURIComponent('http://localhost:3000/api/authorize') : encodeURIComponent('https://reservation-system.now.sh/api/authorize');
  const auth_link = `https://slack.com/oauth/authorize?scope=identity.basic,identity.avatar&client_id=37842542386.425513927477&redirect_uri=${redirect}&team=${teamId}`;
  return (
    <div>
      <Grid 
        container 
        component="main" 
        className={classes.root}
      >
        <Grid 
          item 
          xs={false} 
          md={8}  
          className={classes.image}>
        </Grid>
        <Grid 
          item
          xs={12} 
          md={4} 
          component={Paper} 
          className={classes.paper} 
          elevation={6} 
          square
        >
          <Typography 
            component="h2" 
            variant="h5" 
            gutterBottom
          >
            Hey there!
          </Typography>
          <Avatar className={classes.avatar}/>
          <Typography  
            component="h3" 
            variant="h5"
          >
            Sign in.
          </Typography>
          <Link 
            className={classes.login} 
            href={auth_link}
          >
            <img 
              src="https://platform.slack-edge.com/img/sign_in_with_slack.png" 
              srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" 
              alt=""
            />
          </Link>
          <Copyright/>
        </Grid> 
      </Grid>
    </div>
  )
} 
export default Login;