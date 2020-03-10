import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, 
        Toolbar, 
        AppBar, 
        MenuItem, 
        Avatar, 
        Box, 
        Menu, 
        IconButton  } 
        from '@material-ui/core';
import { AuthService } from '../utils/Auth';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // marginBottom: theme.spacing(4),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    // background: theme.palette.common.black,
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    padding: '0',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  nameContainer: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },  
}));

export default function Navbar(props) {
  const classes = useStyles();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const avatar = Cookies.get('avatar');
  const name = Cookies.get('name');
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    AuthService.signOut(() => {
      history.push("/login");
      setAnchorEl(null);
    });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Booking App
          </Typography>
            {props.loggedIn && (<Box className={classes.userInfo}> 
              <Box className={classes.nameContainer} mr={1}><Typography component="span">{name}</Typography></Box>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className={classes.avatar}
              >
              <Avatar  alt="andrzej" src={avatar} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>)}
          
        </Toolbar>
      </AppBar>
    </div>
  );
}