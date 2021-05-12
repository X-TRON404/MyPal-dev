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

function BottomNavigationMobile() {
    const classes = useStyles();
    const [value, setValue] = useState('Home');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return (
      <Paper elevation={10}>
        <div className="bottomNavigation"> 
            <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
            {/*Added routers here so that instead of pushing the entire app.js to rerender when we click it will only re-render the specific component inside the app__body <Router>*/}
            <BrowserRouter><Link><BottomNavigationAction onClick={()=>window.location.href= '/'} label="Home" value="Home" icon={<HomeIcon/>} /></Link></BrowserRouter>
            <BrowserRouter><Link><BottomNavigationAction onClick={()=>window.location.href= '/confessionsFeed'} label="Confessions" value="Confessions" icon={<WhatshotSharpIcon/>} /></Link></BrowserRouter>
            <BrowserRouter><Link><BottomNavigationAction onClick={()=>window.location.href= '/eventsFeed'} label="Event" value="Events" icon={<EventIcon/>} /></Link></BrowserRouter>
            <BrowserRouter><Link><BottomNavigationAction onClick={()=>window.location.href= '/chatsFeed'} label="Chats" value="Chats" icon={<CommentRoundedIcon />} /></Link></BrowserRouter>
            <BrowserRouter><Link><BottomNavigationAction onClick={()=>window.location.href= '/'} label="Notifications" value="Notifications" icon={ <NotificationsNoneIcon/>} /></Link></BrowserRouter>
            </BottomNavigation>
        </div>
      </Paper>
    )
}

export default BottomNavigationMobile
