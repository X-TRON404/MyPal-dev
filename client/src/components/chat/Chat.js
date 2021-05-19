import React, { useEffect, useState } from 'react'
import Message from './Message'
import './Chat.css'
import {DataBase} from '../firebase';
import {useStateValue} from '../../contexts/StateProvider';
import { useParams } from 'react-router-dom';
import SendMessage from './SendMessage'



function Chat() {
    //set the chat name in the
    const [chatName,setChatName] = useState('')
    //get the messages from the database
    const [messages,setMessages] = useState([])
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();
    //get the slug from the url  (remeber that component using useParams should be inside <Router>)
    const {chatId} = useParams()
 



//======================================================GET Messages==========================================
//everytime chat_user_id (which is basically the doc id inside the chat collection) changes pull the messages for that chat_user_id from the database
useEffect(() => {
    if (user){
    if (chatId){
        //here the chat_user_id (chatId) is taken from the user (user.uid) who posted that particular post to database
        const unsubscribe = DataBase.collection('users').doc(user.uid).collection('chats').doc(chatId).collection('messages').orderBy('timestamp','asc').onSnapshot((snapshot)=>(
            setMessages(snapshot.docs.map((doc) => doc.data()))
        ))
            //get the username of the person we are chatting with 
            DataBase.collection('users').doc(user.uid).collection('chats').doc(chatId).onSnapshot((snapshot)=>(
                setChatName(snapshot.data()) )
            )

        return () =>{
            //perform cleanup before re-firing the useEffect
            unsubscribe();
          }
    }

}

    
}, [chatId])


//=============================================================================================================

    return (                         
             <div className="chat">
                <div className="chat__body">
                    <div className="chat__header">
                        This is the beggining of your texx with  {chatName.chat_username}
                    </div>
                    <div className="chat__messages">
                    {
                        messages.map((message)=>(<Message message={message}/>))
                        
                    }
                    </div>
                </div>
                <div className="chat__sendMessage">
                    <SendMessage chatId={chatId} />
                </div>
             </div> 
             


    )
}

export default Chat
