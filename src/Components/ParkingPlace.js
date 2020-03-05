import React from 'react';
import { Box, Paper, Typography, ButtonBase, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  parkPlace: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 180,
    width: '100%',
    background: theme.palette.grey['100'],
    [theme.breakpoints.up('sm')]: {
      height: 300,
    },
    '& $indicator': {
      background: '#689f38',
    },
  },
  taken: {
    '& $indicator': {
      background: theme.palette.error.light,

    }
  },
  placeNumber: {
    position: 'absolute',
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    fontWeight: '600',
    // color: theme.palette.common.white,
    fontSize: '1.5rem',
  },
  indicator: { 
    position: 'absolute',
    top: '0',
    right: '0',
    height: '60px',
    width: '60px',
    clipPath: 'polygon(0 0, 100% 100%, 100% 0);',

  }
}));

function ParkingPlace(props) {
  const classes = useStyles();
  
  
  return (
    <ButtonBase
      focusRipple
      onClick={props.onClick}
      className={classes.root}
    >
      <Paper elevation={5} className={classes.parkPlace + ' ' + ( !props.free ? classes.taken : '')} >
      <div className={classes.indicator}></div>
        {!props.free ? (
          <Box display="flex" flexDirection="column" alignItems="center" >
            <Avatar alt={props.takenBy.name} src={props.takenBy.avatar} />
            <Typography component="p" variant="subtitle1" color="inherit">{props.takenBy.name}</Typography>
          </Box>
        ) : ('')}
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          className={classes.placeNumber}
          >{props.number}
        </Typography>
      </Paper>
    </ButtonBase>
  )
}


export default ParkingPlace;