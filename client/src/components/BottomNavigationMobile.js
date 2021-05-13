import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EventIcon from '@material-ui/icons/Event';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
import HomeIcon from '@material-ui/icons/Home';
import './BottomNavigationMobile.css'
import WhatshotSharpIcon from '@material-ui/icons/WhatshotSharp';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { Card, Paper } from '@material-ui/core';
import {BrowserRouter, Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#1A1A1A'
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
    const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
    const [value, setValue] = useState(navValues[window.location.pathname])
    return (
      <Paper elevation={10}>
        <div className="bottomNavigation"> 
            <BottomNavigation value={value} className={classes.root}>
              {console.log(value)}
            {/*Added routers here so that instead of pushing the entire app.js to rerender when we click it will only re-render the specific component inside the app__body <Router>*/}
            <BottomNavigationAction onClick={()=>{window.location.href= '/';setValue(navValues[window.location.pathname])}} label="Home"  icon={<HomeIcon/>} />
            <BottomNavigationAction onClick={()=>{window.location.href= '/confessionsFeed';setValue(navValues[window.location.pathname])}} label="Confessions" icon={<WhatshotSharpIcon/>} />
            <BottomNavigationAction onClick={()=>window.location.href= '/eventsFeed'} label="Events"  icon={<EventIcon/>} />
            <BottomNavigationAction onClick={()=>window.location.href= '/chatsFeed'} label="Chats"  icon={<CommentRoundedIcon />} />
            <BottomNavigationAction onClick={()=>window.location.href= '/notificationsFeed'} label="Notifications"  icon={ <NotificationsNoneIcon/>} />
            </BottomNavigation>
        </div>
      </Paper>
    )
}

export default BottomNavigationMobile
