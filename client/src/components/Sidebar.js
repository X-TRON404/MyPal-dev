import React from 'react'
//Get material-ui icons
import SidebarOptions from './SidebarOptions'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import WhatshotSharpIcon from '@material-ui/icons/WhatshotSharp';
import EventIcon from '@material-ui/icons/Event';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {Button} from '@material-ui/core';
import './Sidebar.css'
import { BrowserRouter as Router,Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: 'rgb(86,108,183)',
    transition: "background 1s",
    background: 'linear-gradient(90deg, rgba(86,108,183,0.9290091036414566) 39%, rgba(190,185,249,1) 100%)',
    border: 'none',
    color: 'aliceblue',
    fontWeight: '900',
    textTransform: 'inherit',
    borderRadius: '30px',
    height: '50px !important',
    marginTop: '20px !important',
  },
});

function Sidebar() {
    const classes = useStyles();
    return (
        <div className="sidebar">
            {/*pass icons as props to SidebarOptions component*/}
            {/*keep i captial of Icon to let react know you are passing a component*/}
            <Link to='/' style={{ textDecoration: 'none' }}><SidebarOptions active text="Home" Icon={HomeIcon}/></Link>
            {/* <SidebarOptions text="Explore" Icon={SearchIcon}/> */}
            <Link to='/eventsFeed' style={{ textDecoration: 'none' }}><SidebarOptions text="Events" Icon={EventIcon}/></Link>
            <Link to='/confessionsFeed' style={{ textDecoration: 'none' }}><SidebarOptions text="Confessions" Icon={WhatshotSharpIcon}/></Link>
            {/* <SidebarOptions text="Notifications" Icon={NotificationsNoneIcon}/> */}
            {/* <SidebarOptions text="Messages" Icon={MailOutlineIcon}/> */}
            <Link to='/profile' style={{ textDecoration: 'none' }}><SidebarOptions text="Bookmarks" Icon={BookmarkBorderIcon}/></Link>
            {/* <SidebarOptions text="More" Icon={MoreHorizIcon}/> */}
            <div className="sidebar__buttons">
            <Link to='/createEvent' style={{ textDecoration: 'none' }}><Button variant="outlined"  className={classes.root} fullWidth>New event</Button></Link>
            <Link to='/createConfessions'  style={{ textDecoration: 'none' }}><Button variant="outlined"   className={classes.root}  fullWidth>Write an annonymous confession</Button></Link>
            </div>
        </div>
    )
}

export default Sidebar
