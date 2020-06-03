import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link
} from '@material-ui/core';


import HomeIcon from '@material-ui/icons/Home';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import VideocamIcon from '@material-ui/icons/Videocam';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  menuText: {
    color: theme.palette.secondary.main
  }
}));

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const { open, setDrawerOpen } = props;
  const menuItems = [
    {label: 'Home', link: '/', icon: <HomeIcon/>},
    {label: 'Parking', link: '/parking', icon: <LocalParkingIcon />},
    {label: 'Rooms & Cameras', link: '/cameras', icon: <VideocamIcon />},
  ]
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpen(open);
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem 
            button 
            key={index}
            component={ Link } 
            href={item.link} 
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.label}
              className={classes.menuText}
            />
          </ListItem>
        ))}
      </List>

    </div>
  );

  return (
    <div>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}