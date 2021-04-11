import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Message from './Message'
import {InsertEmoticon, MicOutlined} from '@material-ui/icons';
import './Chat.css'
import {DataBase} from '../firebase';

function Chat() {
const [input, setInput] = useState('')
const {chatId} = useParams()
const [chatName,setChatName] = useState('')

//everytime roomId changes pull the messages for that roomId from the database
useEffect(() => {
    
    if (chatId){
        DataBase.collection('rooms').doc(chatId).onSnapshot((snapshot)=>(
            setChatName(snapshot.data().name)
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
