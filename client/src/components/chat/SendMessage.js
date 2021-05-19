import React, { useState } from 'react'
import { Button, IconButton, Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase/app'
import {useStateValue} from '../../contexts/StateProvider';
import {InsertEmoticon, MicOutlined} from '@material-ui/icons';
import {DataBase} from '../firebase';
import './SendMessage.css'


function SendMessage({chatId}) {
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();
    //set the input 
    const [input, setInput] = useState('');
  
//========================================================POST Messages========================================


    const sendMessage = () => {
        if (user){
            //add message to user1's database (sender)
            DataBase.collection('users').doc(user.uid).collection('chats').doc(chatId).collection('messages').add(
                {
                    text:input,
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    author:user.uid,
                    authorName:user.displayName,
                    imageUrl:"",
                }
            )
            //add message to user2's database (sendee)
            DataBase.collection('users').doc(chatId).collection('chats').doc(user.uid).collection('messages').add(
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
                <IconButton  variant ='contained' color="primary"disabled={!input} onClick={sendMessage} type="submit"><SendIcon /></IconButton>
                <MicOutlined/>
            </form>
    </div>
    )
}

export default SendMessage
