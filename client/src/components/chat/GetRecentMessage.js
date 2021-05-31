import { Badge, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../../contexts/StateProvider';
import { DataBase } from '../firebase';
import './GetRecentMessage.css'

function GetRecentMessage({chatId}) {
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();
    const [messages,setMessages] = useState([])
    //count unread messages 
    const [countUnread, setCountUnread] = useState(0)
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
        //here the chat_user_id (chatId) is taken from the user (user.uid) who posted that particular post to database
        setTimeout(() => {
             DataBase.collection('users').doc(user.uid).collection('chats').doc(chatId).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot)=>(
            setMessages(snapshot.docs.map((doc) => doc.data()))
        ))
        setCountUnread(0)
        },500)
    }
    console.log(chatId)


}

    
}, [,chatId,messages])
    return (
        <div className="getRecentMessage">
            {/*later on add count of unread messages*/}
        <StyledBadge badgeContent={countUnread} color="primary">
            {/*Get recent message*/}
            <p style={{color:'gray'}}>{messages.length!=0?(messages[0]?.text):('start a conversation')}</p>
        </StyledBadge>
        </div>
    )
}

export default GetRecentMessage
