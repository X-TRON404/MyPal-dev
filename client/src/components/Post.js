//post component

import React , {useState,useEffect,useContext} from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';
import {IconButton, Input } from '@material-ui/core';
import {DataBase} from './firebase'
import firebase from 'firebase';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import RepeatIcon from '@material-ui/icons/Repeat'
import FavoriteIcon from '@material-ui/icons/Favorite';
import PublishIcon from '@material-ui/icons/Publish';
import SendIcon from '@material-ui/icons/Send';
import {useStateValue} from '../contexts/StateProvider'
import FlipMove from 'react-flip-move';





function Post({postId,username,caption,imageUrl}) {
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    //store comments from the database for a praticular post in an array (GET from DataBase)
    const [comments, setComments] = useState([]);
    //input comment for a post from the user  (POST to DataBase)
    const [comment, setComment] = useState('');
    //store likes from the database for a praticular post in an array (GET from DataBase)
    const [likes, setLikes] = useState([]);
    //input comment for a post from the user  (POST to DataBase)
    const [like, setLike] = useState(false);
    //change color of the like button on click
    const [favouritesColor, setfavouritesColor] = useState(false)
    //to make sure user likes the post only once
    const [firstTimeLike,setFirstTimeLike] = useState(true) 
    //
    const [likeColor,setLikeColor] = useState('')
  
    

    

//================================================
// posts-(doc)------
//                 |___comments (collection)-----|
//                 |                             |__comment
//                 |                             |__timestamp
//                 |                             |__username
//                 |
//                 |___postLikes    (collection)-----|
//                                               |__like
//                                               |__timestamp
//                                               |__username

//======================================Post likes to the database=======================================

//===================================================TO DO===============================================
//delete the previous like collection
// later on change this operation to server side
// use your own hashing algorithm which takes username as input also for creating a doc inside the 'postLikes' collection 
//user can not survive refresh. Add facility to survive refresh.
//=======================================================================================================
    const postLike = (e) => {
        e.preventDefault(); 
//bug:whenever a new document is created it takes the like state of the previous document
//like color doesnt change when we likw the post for the first time

        //whenever a new document is created it takes the like state of the previous document
        //to not to do this change the like state whenver a new document is created 

        

//=======================================liking the document first time==========================================================================
        
        



        //if there is a document named by 'user.displayName' in the collection 'postLikes' that means this is not the first time we are liking the document 
        //creating a document named 'user.displayName' hence this will be !(false) hence true
        if (    !(likes.filter(like => (like.username===user.displayName))).length     ){
        console.log("if statement")
        //add like to the 'postLikes' collection of the particular post 
        setLike(true)   
        DataBase.collection('posts').doc(postId).collection('postLikes').doc(user.displayName).set(
            {
                like:like,
                username:user.displayName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),

            }
        )
        setfavouritesColor(true)
        setLikeColor('red')
    
        }

//=======================================liking the document NOT first time==========================================================================

        //if not liking the post for the first time meaning the document by the name 'user.displayName' already exists in the collection postLikes
        //hence this will be true 
        else if(  (likes.filter(like => (like.username===user.displayName))).length     ){
            console.log("else statement")
            setLike(!like)
            //update like to the 'postLikes' collection of the particular post 
            DataBase.collection('posts').doc(postId).collection('postLikes').doc(user.displayName).update(
                {
                    like:like,
                    timestamp:firebase.firestore.FieldValue.serverTimestamp()
                }
            )
                  
        setfavouritesColor(!favouritesColor)
        
        setLikeColor(favouritesColor?'red':'')
        }
        
}
//======================================Post comments to the database=======================================
const postComment = (e) => {
    e.preventDefault();
    //add comment to the 'comments' collection of the particular post 
    DataBase.collection('posts').doc(postId).collection('comments').add(
        {
         text:comment,
         username:user.displayName,
         timestamp:firebase.firestore.FieldValue.serverTimestamp()
        }
    )
    //clear the input after posting
    setComment('')
}

//====================================Get the comments and likes from the database and display=========================================
    useEffect(() => {
        let unsubscribe;
        //if a postId is passed
        if (postId){
            //get a snapshot listner for 'comments' collection inside the passed 'postId' doc inside the collection 'posts'
            unsubscribe = DataBase.collection('posts').doc(postId).collection('comments').orderBy('timestamp','desc').onSnapshot(
                    (snapshot) =>{
                        //set comments to the data inside the doc
                                setComments(snapshot.docs.map((doc) => (doc.data())))
                    })

            //get a snapshot listner for 'postLikes' collection inside the passed 'postId' doc inside the collection 'posts'
             DataBase.collection('posts').doc(postId).collection('postLikes').orderBy('timestamp','desc').onSnapshot(
                (snapshot) =>{
                    //set likes to the data inside the doc
                            setLikes(snapshot.docs.map((doc) => (doc.data())))
                           

                })
        }
        return  () => {
            unsubscribe()
        
        };
        //when postId changes fire the code above
},[postId,user])

// if (user){
//     let x = likes.filter(like => (like.username===user.displayName))[0] 

//     for (let i=0;i<x.length;i++)
//     {
//         let k=x[i]
//         if(typeof k === "undefined") {
//             console.log(k,"object no.",i)
//         }  
//     }
// }
// console.log("Like object of the particluar user to change the color of the like buttons that user likes", ( user ?(   (likes.length) ? ( (                 ).like            ):'test'):'test'))
//========================================================================================================================
    return (
        <div className="post">
            <div className="post__header">
                                               {/*avatar managed by@material-ui/core*/}
                <Avatar className="post__avatar" alt={username} src="/static/images/avatar/1.jpg"></Avatar>
                <h3>{username}</h3>
            </div>
            <img className="post__image" src={imageUrl} alt={username+" "+caption}/>
            <h4 className="post__text"><strong>{username+" "}</strong>:{" "+caption}</h4>
            <div className="post__footer">
                                                    {/*Comment icon*/}
                            <ChatBubbleOutlineRoundedIcon fontsize="small" cursor="pointer"/>
                                                    {/*Re-tweet icon*/}
                            <RepeatIcon fontsize="small" cursor="pointer"/>
                                                    {/*like icon*/}
                            
                                            
                            <FlipMove>   
                                {/* (like && (like.username===user.displayName)?(like.like?(<strong>You</strong>):(<strong></strong>)):(<strong>{like.username}</strong>)):(<strong></strong>) )}</p>       */}
                            <FavoriteIcon   fontsize="small" cursor="pointer" onClick={postLike} style={{color:likeColor}} /> 
                                {likes.map((like)=>
                                    (<p><strong>{user && (user.displayName===like.username?(like.like?(<strong>You{JSON.stringify(like.like)}</strong>):(<strong></strong>)):(like.username))}</strong></p>)
                                )}
                            </FlipMove>
                                                    
                                             
                         
            </div>
                                              {/*display the comments from the database */}
            <div className="post__comments">
                {
                    comments.map((comment) => (
                        //here we are accessing the username and text fields of the doc[comment(iterator)] from 'comments' collection of the DataBase
                        <p><strong>{comment.username}</strong>{comment.text}</p>
                    ))
                } 
            </div>
                                               {/*post the comment to the database*/}
            {//if the user is logged in then only show the post comment section
                user &&(
                <form className="post__commentBox">
                    <Input style={{color:"aliceblue"}} className="post__input" type="text" placeholder="Add a comment..." value={comment} onChange={(e)=> setComment(e.target.value)}/>
                    <IconButton  disabled={!comment}  variant ='contained' color="primary" type ='submit' onClick={postComment}>
                            <SendIcon/>
                    </IconButton>
                </form>) 
            }
        </div>
    )
}

export default Post
