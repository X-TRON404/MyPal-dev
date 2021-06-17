import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import {realtime} from '../firebase';
import {useStateValue} from '../../contexts/StateProvider';
import { useParams } from 'react-router-dom';
import SendMessage from './SendMessage'
import { Suspense } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';



const Message = React.lazy(()=>import('./Message'))
function Chat() {
    //set the chat name in the
    const [chatName,setChatName] = useState('')
    //get the messages from the database
    const [messages,setMessages] = useState([])
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();
    //get the slug from the url  (remeber that component using useParams should be inside <Router>)
    const {chatId} = useParams()
    //
    const scrollRef = useRef([])
    //
    const messageScrollRef = useRef(null)

//======================================================GET Messages==========================================
//everytime chat_user_id (which is basically the doc id inside the chat collection) changes pull the messages for that chat_user_id from the database
useEffect(() => {
    if (user){
    if (chatId){
    
            //here the chat_user_id (chatId) is taken from the user (user.uid) who posted that particular post to database
            const messagesArray = [];
            realtime.ref(`/'messages'/${user.uid}/${chatId}`).orderByChild('timestamp').on('value', (snapshot) => {
                //get all the messages for that particular chatId
    
                snapshot.forEach((child)=>{
                    messagesArray.push(child.val())
                })
                setMessages(messagesArray)
                // console.log("messages array "+ messagesArray)
                
                });

                //get the username of the person we are chatting with 
                realtime.ref(`/'chats'/${user.uid}/${chatId}`).on('value', (snapshot) => {
                if (snapshot.exists()){
                    // console.log(snapshot.val())
                setChatName(snapshot.val())
                }
            });

            return () => {
                //unsubscribe to the database
                realtime.ref(`/'messages'/${user.uid}/${chatId}`).off()
                realtime.ref(`/'chats'/${user.uid}/${chatId}`).off()
            }
      
    }


}
 //when chatId changes/messages are added/page is re-rendered  run this   
}, [,user,chatId,messages])

//scroll to bottom when new messages are added.
useEffect(() => {
 
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
        console.log("scrollHeight "+messageScrollRef.current.scrollHeight)
        console.log("amount of scroll user has done "+messageScrollRef.current.scrollTop)
    }
    //using messages.length because firebase is constantly fetching messages from realtime db which changes messages state constantly
    //but messages.length only changes when a new message is added
,[messages.length])


//=============================================================================================================

    return (                         
             <div className="chat" >
                <div className="chat__body">
                    <div className="chat__header" >
                        This is the beggining of your texx with  {chatName.chat_username}
                    </div>
                        <div className="chat__messages" ref={messageScrollRef}>
                        {
                            messages.map((message)=>(
                                <Suspense fallback={
                                    <div><Skeleton variant="rect" width={210} height={10} /></div>} key={message.key}>
                                        <Message message={message} key={message.key}/>
                                </Suspense>
                                ))
                            
                        }
                        </div>
                <div ref={scrollRef}>
                </div>

                </div>
                <div className="chat__sendMessage">
                    <SendMessage chatId={chatId} />
                </div>
             </div> 
             


    )
}

export default Chat
