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
        //here the chat_user_id is taken from the user who posted that particular post to database
        const unsubscribe = DataBase.collection('users').doc(user.uid).collection('chats').doc(chatId).collection('messages').onSnapshot((snapshot)=>(
            setMessages(snapshot.docs.map((doc) => doc.data()))
        ))

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
                <div className="chat__header">
                This is the beggining of your texx with {}
                </div>
                
                {
                    messages.map((message)=>(<Message message={message}/>))
                    
                }
                <SendMessage chatId={chatId} />
             </div> 
             


    )
}

export default Chat
