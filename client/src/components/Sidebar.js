import React from 'react'
//Get material-ui icons
import SidebarOptions from './SidebarOptions'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ListAltIcon from '@material-ui/icons/ListAlt';
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
            <SidebarOptions text="Notifications" Icon={NotificationsNoneIcon}/>
            <SidebarOptions text="Messages" Icon={MailOutlineIcon}/>
            <SidebarOptions text="Bookmarks" Icon={BookmarkBorderIcon}/>
            <SidebarOptions text="Lists" Icon={ListAltIcon}/>
            <Router>
                <Link to='/profile' onClick={()=>window.location.href='/profile'}><SidebarOptions text="Profile" Icon={PermIdentityIcon}/></Link>
            </Router>
            <SidebarOptions text="More" Icon={MoreHorizIcon}/>
            <Button variant="outlined"  className="sidebar__tweet" fullWidth>Texx</Button>
        </div>
    )
}

export default Sidebar
