import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../contexts/StateProvider';
import './Confessions.css'
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import {Collapse, IconButton, Input, Typography } from '@material-ui/core';
import { DataBase } from './firebase';
import firebase from 'firebase';
import SendIcon from '@material-ui/icons/Send';

function Confessions({confession,confessionId}) {
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    //comments from DataBase
    const [confessionComments,setConfessionComments] = useState([])
    //set comment from input
    const [confessionComment, setConfessionComment] = useState('')
    //for commentsIcon onclick collapse
    const [expanded, setExpanded] =  useState(false);
    
    //commentsIcon onclick collapse
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    //convert to date
    const convertToDate = (timestamp) => {
    console.log(timestamp)
    let currentDate = firebase.firestore.Timestamp.now();
    console.log(currentDate)
    let diff = Math.abs(timestamp - currentDate );
    const dateInMillis  = diff * 1000;
    let date = new Date(dateInMillis).toLocaleTimeString();
    return(date.replace(/:\d+ /, ' ')+"hrs ago")
}
//======================================Post comments to the database========================================================================================
const postConfessionComment = (e) => {
    e.preventDefault();
    //add comment to the 'comments' collection of the particular confession 
    DataBase.collection('confessions').doc(confessionId).collection('comments').add(
        {
         text:confessionComment,
         username:user.displayName,
         timestamp:firebase.firestore.FieldValue.serverTimestamp()
        }
    )
    //clear the input after posting
    setConfessionComment('')
}
//====================================Get the comments from the database and display=================================================================
    useEffect(() => {
        
        //if a confessionId is passed
        if (confessionId){
            //get a snapshot listner for 'comments' collection inside the passed 'confessionId' doc inside the collection 'confessions'
             DataBase.collection('confessions').doc(confessionId).collection('comments').orderBy('timestamp','desc').onSnapshot(
                    (snapshot) =>{
                        //set comments to the data inside the doc
                                setConfessionComments(snapshot.docs.map((doc) => (doc.data())))
                                console.log(confessionComments+" Ccommnets")
                    })

                }

},[,user,confessionId])
//=====================================================================================================


    return (
        <div className="confessions">
            <div className="confessions__header">
                <Avatar alt={'username'} src="/static/images/avatar/1.jpg"/> Annonymous
            </div>
            <div className="confessions__confession">
                <p style={{color:"aliceblue"}}>{confession}</p>
            </div>
            <div className="confessions__footer">
                                                {/*display the comments from the database */}
                    <div className="confessions__commentsIcon">
                                 <IconButton onClick={handleExpandClick} id="comments-icon"  disabled={confessionComments.length===0}>
                                    <ChatBubbleOutlineRoundedIcon fontsize="small" cursor="pointer" aria-expanded={expanded} aria-label="show more comments"/>
                                 </IconButton>
                                                            {/*no. of comments*/}
                                 <Typography style={{color:'aliceblue'}}  component={'span'}>{confessionComments.length} Comments</Typography>
                    </div>

                            <Collapse in={expanded} timeout="auto" unmountOnExit >
                            { confessionComments.map((comment) => (
                                    //here we are accessing the username and text fields of the doc[comment(iterator)] from 'comments' collection of the DataBase
                                    <p style={{color:"#dae1e7"}} key={comment.id}><strong>{comment.username+":"}</strong>{comment.text}<span>{" "+convertToDate(comment.timestamp)}</span></p>
                                ))
                            } 
                            </Collapse>
                            
            </div>
                                                    {/*post the comment to the database*/}
                    {//if the user is logged in then only show the post comment section
                        user &&(
                        <form className="confessions__commentBox">
                            <Input style={{color:"aliceblue"}} className="confessions__input" type="text" placeholder="Add a comment..." value={confessionComment} onChange={(e)=> setConfessionComment(e.target.value)}/>
                            <IconButton  disabled={!confessionComment}  variant ='contained' color="primary" type ='submit' onClick={postConfessionComment}>
                                    <SendIcon/>
                            </IconButton>
                        </form>) 
                    }
        </div>
    )
}

export default Confessions
