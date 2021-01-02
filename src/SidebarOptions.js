
import React from 'react'
import './SidebarOptions.css'

function SidebarOptions({active,text,Icon}) {
    return (
        //change of the color of the icon with active link
        <div className={`sidebarOptions ${active && 'sidebarOptions--active'}`}>
            <Icon/>
            <h2>{text}</h2>
        </div>
    )
}

export default SidebarOptions
