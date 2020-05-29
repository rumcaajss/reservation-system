import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookies from 'js-cookie';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';
import { FormControl, InputLabel, Select, MenuItem, Grid, Typography, Paper } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formElement: {
    width: '100%',
  },
  removeButton: {
    color: theme.palette.error.light,
    borderColor: theme.palette.error.light,
    '&:hover': {
      backgroundColor: theme.palette.error.light,
      borderColor: theme.palette.common.white,
      color: theme.palette.common.white,
      
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: theme.palette.error.light,
      color: theme.palette.common.white,
      borderColor: theme.palette.common.white,
    },
    
  }
}));



export default function FormDialog(props) {
  const name = Cookies.get('name');
  const preview = props.preview;
  const cameraNeeded = props.cameraNeeded;
  const roomNeeded = props.roomNeeded;
  const lockSubmit = !preview && roomNeeded && !props.bookingRoom;
  const evtId = props.evt._id || null;
  let lockEdit = false;

  if (props.preview && props.evt.booked_by.name !== name) {
    lockEdit = true;
  } 
  const classes = useStyles();
  const roomChoices = {
    'big_room': 'Big Conference Room',
    'small_room': 'Small Conference Room',
    '3d_printer_room': '3D Printer Room',
    'gregs_office': 'Greg\'s Office',
  } 


  const handleRoomChange = (event) => {
    props.onBookingRoomChange(event.target.value);
  };


  return (
    <div>      
      <Dialog 
        fullWidth={true}
        maxWidth='xs'
        open={props.open} 
        onClose={props.onCloseModal} 
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{preview ? 'Booking preview' : 'Make a booking'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {preview ? 'Event booked by:' : 'Select room and date when you\'ll be passing an exam'}
          </DialogContentText>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="center" direction="column" align="center">
            {preview &&
              <div>
                <Avatar alt={props.evt.booked_by.name} src={props.evt.booked_by.avatar} />
                <Typography component="p" variant="subtitle1" color="inherit">{props.evt.booked_by.name}</Typography>
              </div>
            }
              
              <DatePicker
                disabled={lockEdit}
                required={true}
                autoOk
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Select Date"
                disablePast
                // value={props.evt.start ? props.evt.start : props.startDate}
                value={props.startDate}
                onChange={props.onStartDateChange}
                className={classes.formElement}
              />
              <TimePicker
                disabled={lockEdit}
                required={true}
                autoOk
                margin="normal"
                id="start-time"
                label="Start time"
                // value={props.evt.start ? props.evt.start : props.startDate}
                value={props.startDate}
                onChange={props.onStartDateChange}
                ampm={false}
                className={classes.formElement}
              />
              <TimePicker
                disabled={lockEdit}
                required={true}
                autoOk
                margin="normal"
                id="end-time"
                label="End Time"
                // value={props.evt.end ? props.evt.end : props.endDate}
                value={props.endDate}
                onChange={props.onEndDateChange}
                ampm={false}
                className={classes.formElement}
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={lockEdit}
                      checked={cameraNeeded}
                      onChange={(evt) => props.onCameraNeededChange(evt.target.checked)}
                      name="camera"
                      color="primary"
                    />
                  }
                  label="Camera needed?"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={lockEdit}
                      checked={roomNeeded}
                      onChange={(evt) => props.onRoomNeededChange(evt.target.checked)}
                      name="room"
                      color="primary"
                    />
                  }
                  label="Room needed?"
                />
              </Box>
              {roomNeeded ? 
                <FormControl required className={classes.formElement}>
                  <InputLabel id="demo-simple-select-label">Select room</InputLabel>
                  <Select
                    disabled={lockEdit}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={props.evt.room ? props.evt.room : props.bookingRoom}
                    value={props.bookingRoom}
                    onChange={handleRoomChange}
                  >
                    {Object.keys(roomChoices).map(roomChoice => (
                      <MenuItem key={roomChoice} value={roomChoice}>{roomChoices[roomChoice]}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                : ''
              }
            </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          {lockEdit ? 
            <Button onClick={props.onCloseModal} color="primary">
              Ok
            </Button>
          :
            <div>
              {!lockEdit && preview ? 
              <Button 
                onClick={() => props.onRemoveEvent(props.evt._id)} 
                className={classes.removeButton} 
                variant="outlined" 
                color="secondary">
                  Remove Event
              </Button>
              : ''
              }
              <Button onClick={props.onCloseModal} color="primary">
                Cancel
              </Button>
              <Button 
                onClick={() => props.onSubmitModal(evtId)} 
                disabled={lockSubmit}
                color="primary">
                Save
              </Button>
            </div>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}