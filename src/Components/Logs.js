import React, { useState, useEffect } from 'react';
import { List, 
         ListItem, 
         ListItemAvatar, 
         Avatar, 
         ListItemText 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  listItemRelease: {
    borderLeft: `3px solid ${theme.palette.secondary.main}`,
  },
  listItemReserve: {
    borderLeft: `3px solid ${theme.palette.error.light}`,
  }
}));



function Logs(props) {
  const classes = useStyles();
  const logs = props.logs || [];
  return (
    <List dense className={classes.root}>
      {logs.map((value, index) => {
        return (
          <ListItem key={index} className={value.action === 'release' ? classes.listItemRelease : classes.listItemReserve}>
            <ListItemAvatar>
              <Avatar
                alt={value.name}
                src={value.avatar}
              />
            </ListItemAvatar>
            <ListItemText primary={value.text}/>
          </ListItem>
        );
      })}
    </List>
  )
}

export default Logs;