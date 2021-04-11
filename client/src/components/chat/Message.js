//structure of standard message
import React,{ forwardRef } from 'react';//forwardRef keeps track of what is changing
import {Card,Avatar,CardContent,Typography} from '@material-ui/core';
import './Message.css';

//====================================================================================================
const Message =  forwardRef(({},ref) => {
    //boolean isUser to check whether the user is same as the one logged in 
    // const isUser = username === message.username 
    const isUser = true;
    return (
        //apply message__user class only if isUser is True
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            {/*if isUser True then apply 'message_userCard' else apply 'message_guestCard'*/}
            <Card className={isUser ? 'message_userCard': 'message_guestCard' }>
                <div className="message__header">
                    <Avatar className="message__avatar" alt={'d'} src="/static/images/avatar/1.jpg"></Avatar>
                    <Typography className="message__username" variant="h">
                        {isUser ?`${'You'}`: "message.username" || 'Unknown user'}
                    </Typography>
                </div>
                <CardContent>
                    <Typography className="message__message" color="#E6E6E6" variant="h5" component="h2">
                        {"message.message"}
                    </Typography>
                </CardContent>
            </Card>
        </div>
        )
    
})

export default Message;