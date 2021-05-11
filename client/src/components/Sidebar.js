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

function Sidebar() {
    return (
        <div className="sidebar">
            {/*pass icons as props to SidebarOptions component*/}
            {/*keep i captial of Icon to let react know you are passing a component*/}
            <Router>
                <Link to='/' onClick={()=>window.location.href= '/'}><SidebarOptions active text="Home" Icon={HomeIcon}/></Link>
            </Router>
            <SidebarOptions text="Explore" Icon={SearchIcon}/>
            <Router>
                <Link to='/eventsFeed' onClick={()=>window.location.href='/eventsFeed'}><SidebarOptions text="Events" Icon={EventIcon}/></Link>
            </Router>
            <Router>
                <Link to='/confessionsFeed' onClick={()=>window.location.href='/confessionsFeed'}><SidebarOptions text="Confessions" Icon={WhatshotSharpIcon}/></Link>
            </Router>
            <SidebarOptions text="Notifications" Icon={NotificationsNoneIcon}/>
            <SidebarOptions text="Messages" Icon={MailOutlineIcon}/>
            <SidebarOptions text="Bookmarks" Icon={BookmarkBorderIcon}/>
            <SidebarOptions text="More" Icon={MoreHorizIcon}/>
            <Router>
                <Link to='/createEvent' onClick={()=>window.location.href='/createEvent'}><Button variant="outlined"  className="sidebar__event" fullWidth>New event</Button></Link>
            </Router>
            <Router>
                <Link to='/createConfessions' onClick={()=>window.location.href='/createConfessions'}><Button variant="outlined"  className="sidebar__event" fullWidth>Write an annonymous confession</Button></Link>
            </Router>
        </div>
    )
}

export default Sidebar
