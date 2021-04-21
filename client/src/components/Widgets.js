import React from 'react'
import './Widgets.css'
import { Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import WidgetsChat from './chat/WidgetsChat'
import WigetsDummy from './chat/WigetsDummy'
import {useStateValue} from '../contexts/StateProvider'

function Widgets() {
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();

    return (
        <div className="widgets"> 
            <div className="widgets__inputBox">
                <SearchIcon className="widgets__searchIcon"/>
                <Input style={{color:"aliceblue"}} className="widgets__input" type= "text" placeholder="Search Texx" />
            </div>
            <div className="widgets___widgetContainer">
                {/* if user doesnt exists WidgetsChat component wasthrwoing an error hence I Made a fummy component which doesnt have a user object and 
                will be rendered during refresh transitions when momentarily user is unavailable instead of throwing an error  */}
                {user?(<WidgetsChat/>):(<WigetsDummy/>)}
            </div>
        </div>
    )
}

export default Widgets
