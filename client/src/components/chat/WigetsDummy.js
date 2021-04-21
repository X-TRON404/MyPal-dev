
//users in sidebar chat (online/offline)

import React, { useEffect, useState } from 'react'
import './WidgetsDummy.css'
import Badge from '@material-ui/core/Badge';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {ButtonBase} from '@material-ui/core';
import {Link} from 'react-router-dom';
import {DataBase} from '../firebase'
import firebase from 'firebase/app';
import {useStateValue} from '../../contexts/StateProvider';
import { Unsubscribe } from '@material-ui/icons';
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
