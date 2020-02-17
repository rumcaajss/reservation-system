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
function LoggedIn() {
  const [options] = useState([{name: 'Parking', link:'/parking'}, {name: 'Cameras', link:'/cameras'}])
  const classes = useStyles();

  return (
    <div>
      <div className={classes.circleTop}></div>
      <div className={classes.circleBottom}></div>
      <Box m={3}>
        <Typography variant="h2" gutterBottom>
          What would you like to book?
        </Typography>
      </Box>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      > 
        {options.map(value => (
          <Grid key={value.link} item>
            <Link href={value.link}><Paper className={classes.paper}>{value.name}</Paper></Link>
          </Grid>
        ))}
      </Grid>
    </div>
  )

} 

export default LoggedIn;