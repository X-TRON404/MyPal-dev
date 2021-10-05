import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EventIcon from '@material-ui/icons/Event';
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import HomeIcon from '@material-ui/icons/Home';
import './BottomNavigationMobile.css'
import WhatshotSharpIcon from '@material-ui/icons/WhatshotSharp';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { Paper } from '@material-ui/core';
import {BrowserRouter, Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#1A1A1A',
  },
});

const navValues = {
  '/':1,
  '/confessionsFeed':2,
  '/eventsFeed':3,
  '/chatsFeed':4,
  '/notificationsFeed':5
}

//BUG:
// here everytime we change the value using setValue it causes one additional render
function BottomNavigationMobile() {
    const classes = useStyles();
    const [value, setValue] = React.useState('Home');
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <Paper elevation={10}>
        <div className="bottomNavigation" style={{position:'fixed'}}> 
            <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            <BottomNavigationAction component={Link} to ='/' value="Home"  label="Home"  icon={<HomeIcon/>} />
            <BottomNavigationAction component={Link} to= '/confessionsFeed' value="Confessions" label="Confessions" icon={<WhatshotSharpIcon/>} />
            <BottomNavigationAction component={Link} to='/eventsFeed' value="Events" label="Events"  icon={<EventIcon/>} />
            <BottomNavigationAction component={Link} to= '/chatsFeed' value="Chats"  label="Chats"  icon={<CommentRoundedIcon />} />
            <BottomNavigationAction component={Link} to= '/notificationsFeed' value="Notifications" label="Notifications"  icon={ <NotificationsNoneIcon/>} />
            </BottomNavigation>
        </div>
      </Paper>
    )
}

export default BottomNavigationMobile
