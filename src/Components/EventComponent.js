import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Avatar } from '@material-ui/core';
import RoomIcon  from '@material-ui/icons/Room';
import VideocamIcon from '@material-ui/icons/Videocam';



const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 24,
    width: 24,
  },

}));

export default function EventComponent(props) {
  const { event } = props; 
  const classes = useStyles();

  return (
    <Box 
      display="flex" 
      flexDirection="column"
    >
      <Box display="flex" justifyContent="space-around">
        <Avatar 
          alt={event.booked_by.name} 
          src={event.booked_by.avatar} 
          className={classes.avatar}
        />
        {event.camera_needed && <VideocamIcon />}
        {event.room_needed && <RoomIcon />}
      </Box>
    </Box>
  );
}