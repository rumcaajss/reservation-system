import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Grid, Typography, Button, Paper, Snackbar } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { firestore, firebase } from '../firebase';
import MyCalendar from '../Components/Calendar';
import { formatDate } from '../utils/utils';



function Cameras() {

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  const updateDb = () => {
    // let startTimestamp = firebase.firestore.Timestamp.fromDate(startDate);
    // let endTimestamp = firebase.firestore.Timestamp.fromDate(endDate);
    // if (endTimestamp <= startTimestamp)  {
    //   setSnackMessage('Please select end time after start time.')
    //   setSnackBarOpen(true);
    //   return;
    // } 
    // else if (!room) {
    //   setSnackMessage('Please select a room for the exam.')
    //   setSnackBarOpen(true);
    //   return;  
    // }
    // var docData = {
    //   room: room,
    //   from: startTimestamp,
    //   to: endTimestamp,
    //   booked_by: {
    //       avatar: avatar,
    //       name: name
    //   }
    // };
    // firestore.collection("exams").add(docData)
    // .then(function(docRef) {
    //     setSnackMessage('Room succesfully reserved!')
    //     setSnackBarOpen(true);
    //   })
    //   .catch(function(error) {
    //     setSnackMessage('An error has occured. Try again later.')
    //     setSnackBarOpen(true);
    // });
  
  }

  const getFutureBookings = () => {
    // firestore.collection("exams")
    // .where("from", ">=", firebase.firestore.Timestamp.fromDate(startDate))
    // .orderBy("from")
    // .get()
    // .then(function(querySnapshot) {
    //   let bookings = [];
    //   querySnapshot.forEach(function(doc) {
    //     let data = doc.data();
    //     let booking = {};
    //     let {avatar, name} = data.booked_by; 
    //     let {from, to, room} = data;
    //     let {id} = doc;
    //     from = from.toDate();
    //     to = to.toDate();
    //     room = roomChoices[room];
    //     let text = `${name} has booked ${room} from ${from} to ${to}`
    //     booking = {avatar, name, text}
    //     bookings.push(booking)
    //     console.log(doc.id, " => ", doc.data());
    //   });
    //   setBookings(bookings);
    // })
  }

  // const getRooms = async () => {
  //   await firestore.collection("rooms")
  //   .get()
  //   .then(function(querySnapshot) {
  //     let rooms = {};
  //     querySnapshot.forEach(function(doc) {
  //       rooms[doc.id] = doc.data().human_name
  //     });
  //     setRoomChoices(rooms)
  //   })
  // }
  useEffect(() => {
    // getRooms();
    getFutureBookings();
  //  console.log(firebase.firestore.Timestamp.fromDate(startDate))
  }, [])

  return (
    <main>
      
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackBarOpen}
        autoHideDuration={2000}
        message={snackMessage}
        onClose={handleSnackbarClose}
      />
      <MyCalendar/>
    </main>
  )
}

export default Cameras;