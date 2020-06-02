import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';
import MyCalendar from '../Components/Calendar';
import Backdrop from '../Components/Backdrop';

function Cameras() {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

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
      <MyCalendar
        setSnackBarOpen={setSnackBarOpen}
        setSnackMessage={setSnackMessage}
        setBackdropOpen={setBackdropOpen}
      />
      <Backdrop 
        open={backdropOpen}
      />
    </main>
  )
}

export default Cameras;