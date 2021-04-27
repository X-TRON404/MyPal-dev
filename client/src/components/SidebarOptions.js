
import React from 'react'
import './SidebarOptions.css'

function SidebarOptions({active,text,Icon}) {
    return (
        //change of the color of the icon with active link
        <div className={`sidebarOptions ${active && 'sidebarOptions--active'}`}>
            <Icon style={{color:"aliceblue"}}/>
            <h2 style={{color:"aliceblue"}}>{text}</h2>
        </div>
    )
}

export default SidebarOptions
