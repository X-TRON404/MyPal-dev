import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Message from './Message'
import {InsertEmoticon, MicOutlined} from '@material-ui/icons';
import './Chat.css'
import {DataBase} from '../firebase';

function Chat({user,chat_user_id}) {
const [input, setInput] = useState('')
const {chatId} = useParams()
//set the chat name in the
const [chatName,setChatName] = useState('')
//get the messages from the database
const [messages,setMessages] = useState([])

//everytime roomId changes pull the messages for that roomId from the database
useEffect(() => {
    
    if (chatId){
        //here the chat_user_id is taken from the user who posted that particular post to database
        DataBase.collection('users').doc(user.uid).collection('chats').doc(chat_user_id).collection('messages').onSnapshot((snapshot)=>(
            setMessages(snapshot.data())
        ))
    }
    
}, [chatId])

const sendMessage = (e) => {
    e.preventDefault();
    //add message to database
    setInput('')
}
    return (                         
             <div className="chat">
                <div className="chat__header">
                This is the beggining of your texx with selected_user
                </div>
                <Message/>

                <div className="chat__input">
                    <InsertEmoticon/>
                    <form>
                        <input value={input} onChange={(e)=>setInput(e.target.value)} type="text"/>
                        <button onClick={sendMessage} type="submit">Send a message</button>
                    </form>
                    <MicOutlined/>
                </div>
            </div> 


    )
}

export default Chat
