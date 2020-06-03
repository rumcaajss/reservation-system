import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Avatar,
  Typography,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default function LastPerson(props) {
  const classes = useStyles();
  const { open, setOpen, person } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth={'xs'}
        open={open}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Last camera use</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            Last person using the camera was
          </DialogContentText>
          <Avatar alt={person.name} src={person.avatar} />
          <Typography>{person.name}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}