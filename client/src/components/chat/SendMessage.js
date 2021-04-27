import React, { useState } from 'react'
import { Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase/app'
import {useStateValue} from '../../contexts/StateProvider';
import {InsertEmoticon, MicOutlined} from '@material-ui/icons';
import {DataBase} from '../firebase';
import { useParams } from 'react-router-dom';
import './SendMessage.css'

function SendMessage(chatId) {
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();
    //set the input 
    const [input, setInput] = useState('');
  
//========================================================POST Messages========================================


    const sendMessage = () => {
        if (user){
            DataBase.collection('users').doc(user.uid).collection('chats').doc(chatId).collection('messages').add(
                {
                    text:input,
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    author:user.uid,
                    authorName:user.displayName,
                    imageUrl:"",
                }
            )
            setInput('');
        }
    }

//=============================================================================================================
    return (
    <div className="sendMessage">
            <form className="chat__inputForm" onSubmit={(e)=>{e.preventDefault()}}>
                <InsertEmoticon/>
                <Input style={{color:"aliceblue"}} className="sendMessage__input" value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="   Send a texx..."/>
                <SendIcon onClick={sendMessage} type="submit"/>
                <MicOutlined/>
            </form>
    </div>
    )
}

export default SendMessage
