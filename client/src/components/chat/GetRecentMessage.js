import { Badge, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../contexts/StateProvider';
import { DataBase, realtime } from '../firebase';
import './GetRecentMessage.css'
import firebase from 'firebase/app'

function GetRecentMessage({currentChat,lastchatAt,chatId}) {
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();
    const [messages,setMessages] = useState([])
    //count unread messages 
    const [countUnread, setCountUnread] = useState(0)
    //get recent chat
    const [recentChat,setRecentChat] = useState('')
    //get last seen for that chat
    const [lastSeen,setLastSeen] = useState('')
    const StyledBadge = withStyles((theme) => ({
        badge: {
          right: '-20px',
          top: 10,
          marginLeft:'20px',
          padding: '0 4px',
        },
      }))(Badge);
//======================================================GET Messages==========================================
//everytime chat_user_id (which is basically the doc id inside the chat collection) changes pull the messages for that chat_user_id from the database
useEffect(() => {
    if (user){
    if (chatId){
        let unreadMessages = []
        //here the chat_user_id (chatId) is taken from the user (user.uid) who posted that particular post to database
        setTimeout(() => {
                   //here the chat_user_id (chatId) is taken from the user (user.uid) who posted that particular post to database
            const messagesArray = [];
            //fetch the recent message 
            realtime.ref(`/'messages'/${user.uid}/${chatId}`).orderByChild('timestamp').on('value', (snapshot) => {
    
                snapshot.forEach((child)=>{
                    messagesArray.push(child.val())
                })
                setMessages(messagesArray.reverse())
                console.log(messages[0])
                // console.log("messages array "+ messagesArray)
                
                });
            realtime.ref(`'recent_chat'/${user.uid}`).on('value', (snapshot) => {
                setRecentChat(snapshot.val())
            })
            realtime.ref(`'last_Seen'/${user.uid}/${chatId}`).on('value', (snapshot) => {
                setLastSeen(snapshot.val())
            })
            setCountUnread(0)
            if (chatId!=recentChat){
            //get all the messages which have timestamp > timestamp at which the user checked that chat
                messagesArray.map((message)=>{
                message.author != user.uid && message.timestamp>lastSeen && unreadMessages.push(message.timestamp>lastSeen)
                setCountUnread(unreadMessages.length)
            })
            }


            {console.log("unreadMessages"+ unreadMessages)}
        },500)

    
    }
    


}

    
}, [,chatId,messages.length,recentChat,lastSeen])
    return (
        <div className="getRecentMessage">
            {/*later on add count of unread messages*/}
            {console.log(recentChat)}
            {/*if chatId is the same as the chat with which we are chatting now then unread messages are 0*/}
        <StyledBadge badgeContent={countUnread} color="primary">
            {/*Get recent message*/}
            <p className="getRecentMessage__message" style={{color:'gray',fontSize:'small'}}>{messages.length!=0?(messages[0]?.text.slice(0, 5)):('start a conversation')}</p>
        </StyledBadge>
        </div>
    )
}

export default GetRecentMessage
