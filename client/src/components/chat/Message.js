//structure of standard message
import React,{  useState } from 'react';//forwardRef keeps track of what is changing
import {Avatar} from '@material-ui/core';
import './Message.css';
import {useStateValue} from '../../contexts/StateProvider';


//====================================================================================================
//whenver you are using forwardref first argumnet is the props from the parent component and second parameter is the ref 
//that ref parameter is then assigned to one of the elements of the given function
const Message = ({message}) => {
    //boolean isUser to check whether the user is same as the one logged in 
    // const isUser = username === message.username 
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();
    const [isUser, setIsUser] = useState(user.uid === message.author);
    // if (user){
    // setIsUser(user.uid === message.author)
    // }
    return (
        //apply message__user class only if isUser is True
        <div className={`message ${isUser && 'message__user'}`}>
            {/*if isUser True then apply 'message_userCard' else apply 'message_guestCard'*/}
            <div className={isUser ? 'message_userCard': 'message_guestCard' }>
                <div className="message__header">
                    <Avatar className="message__avatar" alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                    <p className="message__username" variant="h">
                        {isUser ? 'You': message.authorName || 'Unknown user'}
                    </p>
                </div>
                <div>
                    <p className="message__message" color="#E6E6E6" variant="h5" component="h2">
                        {message.text}
                    </p>
                </div>
            </div>
        </div>
        )
    
}

export default Message;