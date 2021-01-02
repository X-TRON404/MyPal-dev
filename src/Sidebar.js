import React from 'react'
//Get material-ui icons
import TwitterIcon from '@material-ui/icons/Twitter';
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
function Sidebar() {
    return (
        <div className="sidebar">
            <TwitterIcon className="sidebar__twitterIcon"/>
            {/*pass icons as props to SidebarOptions component*/}
            {/*keep i captial of Icon to let react know you are passing a component*/}
            <SidebarOptions active text="Home" Icon={HomeIcon}/>
            <SidebarOptions text="Explore" Icon={SearchIcon}/>
            <SidebarOptions text="Notifications" Icon={NotificationsNoneIcon}/>
            <SidebarOptions text="Messages" Icon={MailOutlineIcon}/>
            <SidebarOptions text="Bookmarks" Icon={BookmarkBorderIcon}/>
            <SidebarOptions text="Lists" Icon={ListAltIcon}/>
            <SidebarOptions text="Profile" Icon={PermIdentityIcon}/>
            <SidebarOptions text="More" Icon={MoreHorizIcon}/>
            <Button variant="outlined"  className="sidebar__tweet" fullWidth>Tweet</Button>
        </div>
    )
}

export default Sidebar
