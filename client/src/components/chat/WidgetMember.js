import React, { Suspense, useEffect, useState } from 'react'
import './WidgetMember.css'
import { makeStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {Badge, ButtonBase} from '@material-ui/core';
import {realtime} from '../firebase'
import Skeleton from '@material-ui/lab/Skeleton';
const  GetRecentMessage = React.lazy( () =>  import('./GetRecentMessage'))
//==================================================Card Styles==============================================
const useStyles = makeStyles((theme) => ({
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
    badge: {
      left:-12,
      top: 9,
    },
  
  }));
    
function WidgetMember({chat_username,chatId}) {
    console.log(chat_username,chatId)
    const classes = useStyles();
    //to keep the track if the particular chat is online or not
    const [online,setOnline] = useState('')
    useEffect(() => {
        //get online/offline users
   
        chatId && realtime.ref(`/status/${chatId}`).on('value',snapshot=>{
                        setOnline(snapshot.val());
                        console.log(chatId)
                        console.log(snapshot.val())
                    })
            
             
                  
             
     }, [,chatId,chat_username,online])
     
    return (
      //==========================================Get Online members===========================================================
        <div className={online==='online'?"widgetsChat__online":"widgetsChat__offline"}>
        <div className="widgetsChat__onlineBox">
        <ButtonBase>
                        <Avatar className={classes.avatar} alt={chat_username} src="/static/images/avatar/1.jpg"></Avatar>
                            <Badge
                              className={classes.badge}
                               color={online=='online'?"primary":"secondary"} variant="dot"   
                                overlap="circle"
                            ></Badge>
                        <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <Typography component="p" variant="caption">
                                        {chat_username}
                                    </Typography>
                                    <Suspense fallback={<Skeleton variant="text" />}>
                                      {/*Get recent message*/}
                                        <GetRecentMessage chatId={chatId}/>
                                    </Suspense>
                               
                                </CardContent>
                        </div>
        </ButtonBase>
        </div>
    </div>
    )
}

export default WidgetMember
