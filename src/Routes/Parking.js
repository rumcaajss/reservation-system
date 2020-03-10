import React, { useState, useEffect } from 'react';
import { Grid, Typography, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import ParkingPlace from '../Components/ParkingPlace.js';
import SimpleBackdrop from '../Components/Backdrop.js';
import { firestore } from '../firebase';
import { generateDocId } from '../utils/utils'; 
import { firestoreParkingSeed } from '../utils/seeds'; 

const useStyles = makeStyles(theme => ({
  
  root: {
    flexGrow: 1,
    minHeight: 'calc(100vh - 56px)',
    backgroundColor: theme.palette.grey['200'],
    position: 'relative'
  },

  parkingGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),

  },

  heading: {
    textAlign: 'center',
    padding: theme.spacing(3, 0),
  },

}));


function Parking(props) {
  const [firestoreData, setFirestoreData] = useState(firestoreParkingSeed());
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [name] = useState(Cookies.get('name'));
  const [avatar] = useState(Cookies.get('avatar'));
  const [documentId] = useState(generateDocId());
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
 
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  const handleSpotClick = function(spot) {
    let firestoreDataCopy = {...firestoreData};
    let successMessage = '';
    if (!firestoreDataCopy.places[spot].free && firestoreDataCopy.places[spot].taken_by.name === name) {
      firestoreDataCopy.places[spot].free = true;
      firestoreDataCopy.places[spot].taken_by.avatar = '';
      firestoreDataCopy.places[spot].taken_by.name = '';
      successMessage = `Spot ${spot} released!`;
      updateDb(firestoreDataCopy, successMessage);
    }
    else if (firestoreDataCopy.places[spot].free === true) {
      firestoreDataCopy.places[spot].free = false;
      firestoreDataCopy.places[spot].taken_by.avatar = avatar||'';
      firestoreDataCopy.places[spot].taken_by.name = name||'';
      successMessage = `Spot ${spot} reserved!`;
      updateDb(firestoreDataCopy, successMessage);
    }
  }
  
  const updateDb = function(parkPlaces, successMessage, errorMessage) {
    setIsLoading(true);
    var docRef = firestore.collection("bookings").doc(documentId)
    .set(parkPlaces)
    .then(function() {
      setIsLoading(false);
      if (successMessage) {
        setSnackBarOpen(true);
        setSnackMessage(successMessage)
      }
      setFirestoreData(parkPlaces);
    })
    .catch(function(error) {
      setSnackBarOpen(true);
      setSnackMessage(errorMessage || 'Unable to write to database!');   
    });
  }

  const subsribeToDb = function(docRef) {
    setIsLoading(true);
    return docRef.onSnapshot(function(doc) {
      var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      if (source === "Server") {
        setIsLoading(false);
        setFirestoreData(doc.data());
      }
    });
  }

  // const seedDb = function() {
  //   setIsLoading(true);
  //   let docRef = firestore.collection("bookings").doc(documentId)
  //     .set(firestoreData)
  //     .then(function() {
  //       setIsLoading(false);
  //     })
  //     .catch(function(error) {
  //       setSnackBarOpen(true);
  //       setSnackMessage('Unable to sync with database.');
  //     })
  // }


  useEffect(() => {
    var unsubscribe;
    let docRef = firestore.collection("bookings").doc(documentId);
    docRef.get().then(function(doc) {
      if (doc.exists) {
        unsubscribe = subsribeToDb(docRef);
      } else {
        updateDb(firestoreData);
        // seedDb();
      }
    }).catch((error)=> {
      console.log('error')
    })

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe()
      } 
    };
  }, [])
  
  return (
    <main className={classes.root}>
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
      <div className={classes.pageDecoration}></div>
      <Typography 
        className={classes.heading} 
        color="secondary" 
        variant="h4" 
        component="h2"
      >
        Click a spot you'd like to book
      </Typography>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
        className={classes.parkingGrid}
      > 
        {Object.keys(firestoreData.places).map(value => (
          <Grid key={value} xs={5} md={2} item>
            <ParkingPlace 
              onClick={() => handleSpotClick(value)} 
              free={firestoreData.places[value].free} 
              takenBy={firestoreData.places[value].taken_by} 
              number={value}
            >
            </ParkingPlace>
          </Grid>
        ))}
      </Grid>
      <SimpleBackdrop 
        open={isLoading} 
      />
    </main>
  )
}

export default Parking;