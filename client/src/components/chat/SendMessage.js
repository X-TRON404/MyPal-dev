import React, { useRef, useState } from 'react'
import {IconButton, Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase/app'
import 'emoji-mart/css/emoji-mart.css';
import {useStateValue} from '../../contexts/StateProvider';
import {InsertEmoticon, MicOutlined} from '@material-ui/icons';
import {realtime} from '../firebase';
import './SendMessage.css'
import EmojiSelect from './EmojiSelect';


function SendMessage({chatId}) {
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();
    //set the input 
    const [input, setInput] = useState('');
    //show/hide emoji picker menu
    const [emoMenuVisible,setEmoMenuVisible] = useState(false)
    //ref to input to focus on the input element after selecting the emoji 
    const inputRef = useRef();
    //current element of inputRef
    const inputRefCurrent = inputRef.current
//========================================================POST Messages========================================

const sendMessage = () => {
    if (user){
                   //add message to user1's database (sender)
                   realtime
                   .ref(`/'messages'/${user.uid}/${chatId}`)
                   //push create a unique id for each new doc 
                   .push({
                       text:input,
                       timestamp:firebase.database.ServerValue.TIMESTAMP,
                       author:user.uid,
                       authorName:user.displayName,
                       imageUrl:"",},
                       (error) => {
                       if (error) {
                       alert(error.message)
                       } else {
                       //successful!!
                       }         
                   })
                   //add message to user2's database (sendee)
                   //add to realtime db 
                       realtime
                       .ref(`/'messages'/${chatId}/${user.uid}`)
                       //push create a unique id for each new doc 
                       .push({     
                               text:input,
                               timestamp:firebase.database.ServerValue.TIMESTAMP,
                               author:user.uid,
                               authorName:user.displayName,
                               imageUrl:"",
                           },
                           (error) => {
                           if (error) {
                           alert(error.message)
                           } else {
                           //successful!!
                           }
                       
                       })
                    //post the time at which we sent a text to that user/received a text from that user lately
                    realtime.ref(`/'chats'/${user.uid}/${chatId}`).update(
                        {
                            lastchatAt:firebase.database.ServerValue.TIMESTAMP
                        }
                    )
                    realtime.ref(`/'chats'/${chatId}/${user.uid}`).update(
                        {
                            lastchatAt:firebase.database.ServerValue.TIMESTAMP
                        }
                    )
                    

        setInput('');
    }
}

//=============================================================================================================
    return (
    <div className="sendMessage">
                                                                {/*emoji select menu*/}
                                            {/*make the menu visible only when user clicks on emoji icon*/}
                                            {/*send the reference of the input component to <EmojiSelect/> to .focus() after emoji is selected*/}

                {emoMenuVisible?
                    (<EmojiSelect inputRefCurrent={inputRefCurrent} addEmojiToInput={(emoji)=>{setInput(input+emoji)}}  EmojiMenuVisibility={(visibility)=>{setEmoMenuVisible(visibility)}} />):(<></>)
                }
            <form className="chat__inputForm" onSubmit={(e)=>{e.preventDefault()}}>
                <InsertEmoticon className="sendMessage__emojiIcon" onClick={()=>{setEmoMenuVisible(!emoMenuVisible)}} style={{cursor: 'pointer'}}/>
                <Input inputRef={inputRef} style={{color:"aliceblue"}} className="sendMessage__input" value={input} onChange={(e)=>setInput(e.target.value)} type="text" placeholder="   Send a texx..."/>
                <IconButton  variant ='contained' color="primary"disabled={!input} onClick={sendMessage} type="submit"><SendIcon /></IconButton>
                {/* <MicOutlined/> */}
            </form>
    </div>
    )
}

export default SendMessage
