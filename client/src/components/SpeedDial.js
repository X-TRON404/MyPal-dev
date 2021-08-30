import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import WhatshotSharpIcon from '@material-ui/icons/WhatshotSharp';
import EventIcon from '@material-ui/icons/Event';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core';
import './SpeedDial.css'


  const useStyles = makeStyles((theme) => ({
      speedDial: {
        position: 'fixed',
        bottom: theme.spacing(12),
        right: theme.spacing(2),
      },
  }));

function SpeedDiall() {
   const classes = useStyles();
  //open speedDial
  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  //current route path
  const pathname = window.location.pathname
  //actions for speedDial
  //add Link to action icons
  const addLink = (to, children) => <Link to={to}>{children}</Link>;
  const actions = [
    { icon: addLink('/ImageUploadMobile',<AddPhotoAlternateIcon/>), name: 'Post' },
    { icon: addLink('/CreateEvent',<EventIcon/>), name: 'Event' },
    { icon: addLink('/CreateConfessions',<WhatshotSharpIcon/>), name: 'Confession' },
  ];

  const handleOpen = () => {
    setOpenSpeedDial(true);
  };

  const handleClose = () => {
    setOpenSpeedDial(false);
  };
    //hide speedDial for chats route
    if (pathname.match(/chats/)){
        return null;
    }
    //else if not chat route then return the speedDial
    return (
        <div className="speedDial">
            <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            className={classes.speedDial}
            hidden={false}
            icon={<SpeedDialIcon openIcon={<EditIcon/>} />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={openSpeedDial}
            >
            {actions.map((action) => (
                <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleOpen}
                />
                
            ))}
            </SpeedDial>
        </div>
    )
}

export default SpeedDiall
