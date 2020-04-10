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
    margin: theme.spacing(4),
  },
  listItem: {
    borderLeft: `3px solid ${theme.palette.secondary.main}`
  }
}));



function Logs(props) {
  const classes = useStyles();
  const logs = props.logs || [];
  return (

    <List dense className={classes.root}>
      {logs.map((value, index) => {
        return (
          <ListItem key={index} className={classes.listItem}>
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