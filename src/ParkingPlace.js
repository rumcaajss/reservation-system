import React, { useState } from 'react';
import { Grid, Container, Box, Paper, Typography, ButtonBase, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  parkPlace: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 300,
    width: 200,
    background: '#76CC88',
    border: '1px solid #fff',
  },
  taken: {
    background: '#FF7C7C'
  }
}));

function ParkingPlace(props) {
  const [reserved, setReserved] = useState(false);
  const classes = useStyles();
  
  function toggleState() {
    setReserved(!reserved);
  }
  
  return (
    <ButtonBase
      focusRipple
      onClick={toggleState}
    >
      <Paper className={classes.parkPlace + ' ' + ( reserved ? classes.taken : '')} >
        {reserved ? (
          <Box display="flex" flexDirection="column" alignItems="center" >
          <Avatar alt="Remy Sharp" src="" />
          <Typography
            component="p"
            variant="subtitle1"
            color="inherit"
          >
            rumcajs
          </Typography>
          </Box>
        ) : ('')}
        <Typography
          component="p"
          variant="subtitle1"
          color="inherit"
        >
        {props.name}
        </Typography>
      </Paper>
    </ButtonBase>
  )
}


export default ParkingPlace;