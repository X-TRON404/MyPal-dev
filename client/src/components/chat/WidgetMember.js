import React, { Suspense, useEffect, useState } from 'react'
import './WidgetMember.css'
import { makeStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {Badge, ButtonBase} from '@material-ui/core';
import {realtime} from '../firebase'
import Skeleton from '@material-ui/lab/Skeleton';
import firebase from 'firebase/app'
import { useStateValue } from '../../contexts/StateProvider';

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
    
function WidgetMember({lastchatAt,chat_username,chatId}) {
    // console.log(chat_username,chatId)
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();
    const classes = useStyles();
    //to keep the track if the particular chat is online or not
    const [online,setOnline] = useState('')
    //get the current user chatting with
    const [currentChat,setCurrentChat] = useState('')
    useEffect(() => {
        //get online/offline users
   
        chatId && realtime.ref(`/status/${chatId}`).on('value',snapshot=>{
                        setOnline(snapshot.val());
                        // console.log(chatId)
                        // console.log(snapshot.val())
                    })
                  realtime.ref(`'recent_chat'/${user.uid}`).on('value',snapshot=>{
                    setCurrentChat(snapshot.val());
                    // console.log("CurrentChat "+currentChat)
                })    
                
                
        return () => {
          realtime.ref(`'recent_chat'/${user.uid}`).off()
        }
             
     }, [,chatId,chat_username,online,currentChat])

    const sendClick = () => {
      realtime.ref(`'last_Seen'/${user.uid}/${chatId}`).set(firebase.database.ServerValue.TIMESTAMP)
      realtime.ref(`'recent_chat'/${user.uid}`).set({
        chatId:chatId
      })
      // window.location.href=`/chats/${chatId}`
        // realtime.ref(`/'chats'/${user.uid}/${chatId}`).set({
        //   last_check_out:firebase.database.ServerValue.TIMESTAMP
        // })
    }

     
    return (
      //==========================================Get Online members===========================================================
      <ButtonBase onClick={sendClick} className={"widgetsChat__online"}>
          <div className={chatId!=currentChat?"widgetsChat__onlineBox":"widgetsChat__onlineBoxActive"}>
        
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
                                        <GetRecentMessage currentChat={currentChat} lastchatAt={lastchatAt} chatId={chatId}/>
                                    </Suspense>
                               
                                </CardContent>
                        </div>
          </div>
    </ButtonBase>
    )
}

export default WidgetMember
