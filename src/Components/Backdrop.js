import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop(props) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);  onClick={props.handleClose}
  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.open} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}