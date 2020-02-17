import React, { useState } from 'react';
import { Grid, Container, Link, Paper, Typography, Box, Button } from '@material-ui/core';
import ParkingPlace from './ParkingPlace.js';

function Parking() {
  const [parkingPlaces] = useState(['F08', 'F09', 'F10', 'F11']);
  return (
    <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}
      > 
        {parkingPlaces.map(value => (
          <Grid key={value} item>
            <ParkingPlace name={value}></ParkingPlace>
          </Grid>
        ))}
      </Grid>
  )
}


export default Parking;