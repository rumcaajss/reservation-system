import React, { useState } from 'react';
import { 
  Button,
  Avatar,
  FormControlLabel,
  Checkbox,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid, 
  Typography, 
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import Cookies from 'js-cookie';
import DateFnsUtils from '@date-io/date-fns';
import { isBefore } from 'date-fns';

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
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const name = Cookies.get('name');
  const { 
    preview, 
    open, 
    cameraNeeded, 
    setCameraNeeded,
    roomNeeded, 
    setRoomNeeded, 
    bookingRoom, 
    setBookingRoom,
    evt, 
    startDate,
    setStartDate, 
    endDate, 
    setEndDate, 
    onCloseModal, 
    onRemoveEvent,
    onSubmitModal,
  } = props;
  const lockSubmit = roomNeeded && !bookingRoom;
  const evtId = evt._id || null;
  let lockEdit = false;

  if (preview && evt.booked_by.name !== name) {
    lockEdit = true;
  } 

  const classes = useStyles();
  const roomChoices = {
    'big_room': 'Big Conference Room',
    'small_room': 'Small Conference Room',
    '3d_printer_room': '3D Printer Room',
    'gregs_office': 'Greg\'s Office',
  } 


  const onEndDateChange = (newValue) => {
    setError(false);
    setErrorMsg('');
    if (isBefore(newValue, startDate)) {
      setEndDate(startDate);
      setError(true);
      setErrorMsg('End time can\'t be before start time.');
      return;
    }
    setEndDate(newValue);
  }
  
  const onStartDateChange = (newValue) => {
    setStartDate(newValue);
    setEndDate(newValue);
  }
  
  const handleRoomChange = (event) => {
    setBookingRoom(event.target.value);
  };

  const handleRoomNeededChange = (event) => {
    setBookingRoom(''); 
    setRoomNeeded(event.target.checked)
  }

  return (
    <div>      
      <Dialog 
        fullWidth={true}
        maxWidth='xs'
        open={open} 
        onClose={onCloseModal} 
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
                <Avatar alt={evt.booked_by.name} src={evt.booked_by.avatar} />
                <Typography component="p" variant="subtitle1" color="inherit">{evt.booked_by.name}</Typography>
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
                value={startDate}
                onChange={onStartDateChange}
                className={classes.formElement}
              />
              <TimePicker
                disabled={lockEdit}
                required={true}
                autoOk
                margin="normal"
                id="start-time"
                label="Start time"
                value={startDate}
                onChange={onStartDateChange}
                ampm={false}
                className={classes.formElement}
              />
              <TimePicker
                disabled={lockEdit}
                required={true}
                autoOk
                error={error}
                helperText={errorMsg}
                margin="normal"
                id="end-time"
                label="End Time"
                value={endDate}
                onChange={onEndDateChange}
                ampm={false}
                className={classes.formElement}
              />
              <Box>
                <FormControlLabel
                  control={
                    <Checkbox
                      disabled={lockEdit}
                      checked={cameraNeeded}
                      onChange={(event) => setCameraNeeded(event.target.checked)}
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
                      onChange={handleRoomNeededChange}
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
                    value={bookingRoom}
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
            <Button onClick={onCloseModal} color="primary">
              Ok
            </Button>
          :
            <div>
              {!lockEdit && preview ? 
              <Button 
                onClick={() => onRemoveEvent(evt._id)} 
                className={classes.removeButton} 
                variant="outlined" 
                color="secondary">
                  Remove Event
              </Button>
              : ''
              }
              <Button onClick={onCloseModal} color="primary">
                Cancel
              </Button>
              <Button 
                onClick={() => onSubmitModal(evtId)} 
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