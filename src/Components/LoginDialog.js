import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default function LoginDialog(props) {
  const teamId = process.env.REACT_APP_TEAM_ID;
  const classes = useStyles();
  const redirect = process.env.NODE_ENV === 'development' ? encodeURIComponent('http://localhost:3000/api/authorize') : encodeURIComponent('https://reservation-system.now.sh/api/authorize');
  const auth_link = `https://slack.com/oauth/authorize?scope=identity.basic,identity.avatar&client_id=37842542386.425513927477&redirect_uri=${redirect}&team=${teamId}`;
  const { open } = props;


  return (
    <React.Fragment>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open max-width dialog
      </Button> */}
      <Dialog
        fullWidth={true}
        maxWidth={'xs'}
        open={open}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Login</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText>
            Your session has expired, please sign in.
          </DialogContentText>
          <Link 
            className={classes.login} 
            href={auth_link}
          >
            <img 
              src="https://platform.slack-edge.com/img/sign_in_with_slack.png" 
              srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" 
              alt=""
            />
          </Link>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}