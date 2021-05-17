
//users in sidebar chat (online/offline)

import React from 'react'
import './WidgetsDummy.css'
import { makeStyles } from '@material-ui/core/styles';
//==================================================Card Styles==============================================
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minWidth: 250,
    height:60,
    background: '#1A1A1A',
    '&:hover': {
       background: '#363A3E',
    },
    border:'1px grey',
    marginBottom:'5px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    Bottom:'20px',
    fontWeight:300,
    color: 'white',
    marginBottom:10,
  },
  avatar:{
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginTop:10,
    marginLeft:10,
    marginBottom:10,
  },
  typoStatus:{
    color:'grey',
  }

}));
//==================================================================================================================
function WidgetsDummy() {

    return (

        <div className="widgetsChat">
            
        </div>
    )
}

export default WidgetsDummy
