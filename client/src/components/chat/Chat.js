import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Message from './Message'
import {InsertEmoticon, MicOutlined} from '@material-ui/icons';
import './Chat.css'
import {DataBase} from '../firebase';
import firebase from 'firebase/app'
import {useStateValue} from '../../contexts/StateProvider';
import { Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

function Chat() {
    const [input, setInput] = useState('')
    //set the chat name in the
    const [chatName,setChatName] = useState('')
    //get the messages from the database
    const [messages,setMessages] = useState([])
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();
    const {chatId} = useParams()



//======================================================GET Messages==========================================
//everytime chat_user_id (which is basically the doc id inside the chat collection) changes pull the messages for that chat_user_id from the database
useEffect(() => {
    if (user){
    if (chatId){
        //here the chat_user_id is taken from the user who posted that particular post to database
        DataBase.collection('users').doc(user.uid).collection('chats').doc(chatId).collection('messages').onSnapshot((snapshot)=>(
            setMessages(snapshot.data())
        ))
    }
}
    
}, [chatId])

//========================================================POST Messages========================================

    const sendMessage = () => {
        DataBase.collection('users').doc(user.uid).collection('chats').doc(chatId).collection('messages').add(
            {
                text:input,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                author:user.uid,
                authorName:user.displayName,
                imageUrl:"",
            }
        )
        setInput('')

    }

//=============================================================================================================

    return (                         
             <div className="chat">
                <div className="chat__header">
                This is the beggining of your texx with {}
                </div>
                {
                    messages.map((message)=>(<Message message={message}/>))
                    

                }
                <div className="chat__input">
                    <InsertEmoticon/>
                    <form className="chat__inputForm" onSubmit={(e)=>{e.preventDefault()}}>
                        <Input value={input} onChange={(e)=>setInput(e.target.value)} type="text"/>
                        <SendIcon onClick={sendMessage} type="submit">Send a message</SendIcon>
                    </form>
                    <MicOutlined/>
                </div>
            </div> 


    )
}

export default Chat
