import { Avatar, Button } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { useStateValue } from '../contexts/StateProvider';
import './Confessions.css'
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Collapse, IconButton, Input} from '@material-ui/core';
import { DataBase } from './firebase';
import firebase from 'firebase';
import SendIcon from '@material-ui/icons/Send';
import ShareIcon from '@material-ui/icons/Share';
import { Link } from 'react-router-dom';

function Confessions({confession,confessionId,likesCount}) {
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    //comments from DataBase
    const [confessionComments,setConfessionComments] = useState([])
    //set comment from input
    const [confessionComment, setConfessionComment] = useState('')
    //for commentsIcon onclick collapse
    const [expanded, setExpanded] =  useState(false);
    //if like=true or not
    const [like, setLike] = useState(false);
    //number of likes
    const [likeCount,setLikeCount] = useState(likesCount)
    //like ref
    const likeCountRef = useRef(0)
    
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
         user_id:user.uid,
         timestamp:firebase.firestore.FieldValue.serverTimestamp()
        }
    )
    //clear the input after posting
    setConfessionComment('')
}
//======================================Post likes to the database===================================================================================
const postLike = () => {
    const newLikeValue = !like;
    const newLikeCount = like ? likeCount - 1 : likeCount + 1;
    setLike(!like);

    setLikeCount(newLikeCount);
    setLike(newLikeValue);
    DataBase
    .collection('confessions').doc(confessionId)
    .collection('confessionLikes').doc(user.uid)
    .set(
      { 
        like:newLikeValue,
        username:user.displayName,
        user_id:user.uid,
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),

      }
    ).catch((err)=>{console.log("something wrong happened "+err.message)})
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
                                console.log(confessionComments+" commnets")
                    })

                //check if the user already liked the doc or not
                setTimeout(() => {
                    DataBase.collection('confessions').doc(confessionId).collection('confessionLikes').doc(user.uid).get().then((doc) => {
                        if (doc.exists) {
                            console.log(doc.data().like)
                            setLike(doc.data().like)
                            console.log(like + " 1")
                            console.log("likedData")
                        } else {
                            // doc.data() will be undefined in this case
                            console.log("Not liked");
                        }
                    }).catch((error) => {
                        console.log("Error getting document:", error);
                    });
                }, 500);

                
                    //    grab the docs which have like=true 
                    setTimeout(() => {
                        DataBase.collection('confessions').doc(confessionId).collection('confessionLikes').where("like", "==", true).get()
                        .then((querySnapshot) => {
                            setLikeCount((querySnapshot.docs.map(doc =>doc.data())).length)
                            console.log(likeCount +" likes count")
                            likeCountRef.current=likeCount
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                    }, 400);
            
            

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

                            <div className="confessions__likes">  
                                                                                {/*like icon*/}

                                        {like?
                                            (<Button onClick={postLike} ><FavoriteIcon   fontsize="small" cursor="pointer" style={{color:'red'}}/></Button> ):(<Button onClick={postLike} ><FavoriteIcon   fontsize="small" cursor="pointer"  /> </Button>)
                                            
                                        }
                                <p className="confessions__likesCount"  component={'span'}>Likes {likeCount}</p>
                            </div>


                                                {/*display the comments from the database */}
                    <div className="confessions__commentsIcon">
                                 <IconButton onClick={handleExpandClick} id="comments-icon"  disabled={confessionComments.length===0}>
                                    <ChatBubbleOutlineRoundedIcon fontsize="small" cursor="pointer" aria-expanded={expanded} aria-label="show more comments"/>
                                 </IconButton>
                                                            {/*no. of comments*/}
                                 <p className="confessions__commentsIconCommentsCount" >{confessionComments.length} Comments</p>
                    </div>


                                                                        {/*share icon*/}
                            <Button onClick={() => {
                                                if (navigator.share) {
                                                    navigator.share({
                                                            title: document.title,
                                                            text: confession,
                                                            url: window.location.href + `share/confessions/${confessionId}`,
                                                        })
                                                        .then(() => console.log('Successful share'))
                                                        .catch((error) => console.log('Error sharing', error));
                                                } else {
                                                    alert("Web Share API is not supported in your browser.")
                                                }
                                            }}>
                                <ShareIcon fontsize="small" cursor="pointer"> 
                                </ShareIcon> 
                            </Button>
                            
            </div>

                    <Collapse in={expanded} timeout="auto" unmountOnExit >
                        <div className="confessions_commentWrapper">
                                    { confessionComments.map((comment) => (
                                            //here we are accessing the username and text fields of the doc[comment(iterator)] from 'comments' collection of the DataBase
                                                <p className="confessions__comments" key={comment.id}><Link to={`/pals/${comment.user_id}`} style={{textDecoration:'none'}}><strong>{comment.username+":"}</strong></Link>{comment.text}</p>
                                        ))
                                    }
                        </div>
                    </Collapse>

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
