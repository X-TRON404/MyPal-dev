
//users in sidebar chat (online/offline)

import React, { useEffect, useState } from 'react'
import './WidgetsChat.css'
import Badge from '@material-ui/core/Badge';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {ButtonBase} from '@material-ui/core';
import {BrowserRouter, Link} from 'react-router-dom';
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
function WidgetsChat() {
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([])




    
    useEffect(() => {
        //if user is logged out it throws an error hence using try catch
        try {
            console.log("trying widgetsChat")
            
            console.log(user)
            //this is not working because the user that is being added to 'users' collection from the App.js signup is not creating a valid document
            DataBase.collection('users').doc(user.uid).collection('chats').onSnapshot((snapshot)=>(
                setChats(snapshot.docs.map((doc) => doc.data()))
               
            ))
            console.log(chats)
     }
        catch (error) {
        console.log(error.message+" coming from widgetsChat getting 'chats'collection ")
        }
        
    }, [user]);

    return (
//==========================================Online members===========================================================
        <div className="widgetsChat">
            <div className="widgetsChat__online">
                 <p>Online<span><Badge color="primary" overlap="circle"  variant="dot"></Badge></span></p>
                 <div className="widgetsChat__onlineMembers">
            {
                chats.map((chat)=>(
                <BrowserRouter>
                            <Link to={`/chats/${chat.chat_user_id}`} key={chat.chat_user_id}>
                                    <ButtonBase>
                                        <Card className={classes.root}>
                                                <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                                                <div className={classes.details}>
                                                        <CardContent className={classes.content}>
                                                            <Typography component="p" variant="p">
                                                                {chat.chat_username}
                                                            </Typography>
                                                            <Typography className={classes.typoStatus} variant="caption">
                                                                status like I am using texx
                                                            </Typography>
                                                        </CardContent>
                                                </div>
                                        </Card>
                                    </ButtonBase>
                            </Link>
                </BrowserRouter>
                
                ))
            }
                 
                 </div>
            </div>
                                                        {/* offline members */}
            <div className="widgetsChat__offline">
                 <p>Offline<span><Badge color="secondary" overlap="circle"  variant="dot"></Badge></span></p> 
                 <div className="widgetsChat__offlineMembers">
                 <ButtonBase>
                    <Card className={classes.root}>
                            <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                            <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography component="p" variant="p">
                                            User
                                        </Typography>
                                        <Typography className={classes.typoStatus} variant="caption">
                                            status
                                        </Typography>
                                    </CardContent>
                            </div>
                        </Card>
                    </ButtonBase>
                    <ButtonBase>
                        <Card className={classes.root}>
                            <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                            <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography component="p" variant="p">
                                            User
                                        </Typography>
                                        <Typography className={classes.typoStatus} variant="caption">
                                            status
                                        </Typography>
                                    </CardContent>
                            </div>
                        </Card>
                    </ButtonBase>
                    <ButtonBase>
                        <Card className={classes.root}>
                            <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                            <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography component="p" variant="p">
                                            User
                                        </Typography>
                                        <Typography className={classes.typoStatus} variant="caption">
                                            status
                                        </Typography>
                                    </CardContent>
                            </div>
                        </Card>
                    </ButtonBase>
                    <ButtonBase>
                        <Card className={classes.root}>
                            <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                            <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography component="p" variant="p">
                                            User
                                        </Typography>
                                        <Typography className={classes.typoStatus} variant="caption">
                                            status
                                        </Typography>
                                    </CardContent>
                            </div>
                        </Card>
                    </ButtonBase>
                    <ButtonBase>
                        <Card className={classes.root}>
                            <Avatar className={classes.avatar} alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                            <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                        <Typography component="p" variant="p">
                                            User
                                        </Typography>
                                        <Typography className={classes.typoStatus} variant="caption">
                                            status
                                        </Typography>
                                    </CardContent>
                            </div>
                        </Card>
                    </ButtonBase>
                 </div>
            </div>
        </div>
    )
}

export default WidgetsChat
