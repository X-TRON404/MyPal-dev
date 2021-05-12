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
            <BottomNavigationAction onClick={()=>window.location.href= '/'} label="Home" value="Home" icon={<HomeIcon/>} />
            <BottomNavigationAction onClick={()=>window.location.href= '/confessionsFeed'} label="Confessions" value="Confessions" icon={<WhatshotSharpIcon/>} />
            <BottomNavigationAction onClick={()=>window.location.href= '/eventsFeed'} label="Event" value="Events" icon={<EventIcon/>} />
            <BottomNavigationAction onClick={()=>window.location.href= '/chatsFeed'} label="Chats" value="Chats" icon={<CommentRoundedIcon />} />
            <BottomNavigationAction onClick={()=>window.location.href= '/'} label="Notifications" value="Notifications" icon={ <NotificationsNoneIcon/>} />
            </BottomNavigation>
        </div>
      </Paper>
    )
}

export default BottomNavigationMobile
