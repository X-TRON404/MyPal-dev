//post component

import React , {useState,useEffect,useContext} from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar';
import {Button, IconButton, Input } from '@material-ui/core';
import {DataBase} from './firebase'
import firebase from 'firebase';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import RepeatIcon from '@material-ui/icons/Repeat'
import FavoriteIcon from '@material-ui/icons/Favorite';
import PublishIcon from '@material-ui/icons/Publish';
import SendIcon from '@material-ui/icons/Send';
import {useStateValue} from '../contexts/StateProvider'
import FlipMove from 'react-flip-move';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';





function Post({postId,username,user_id,caption,imageUrl}) {
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
    //to store users in chat list after getting them from the database
    const [chats,setChats] = useState([]) 
    //the problem with let here is  it is making everything empty after 
    //to store uid and bool for if the user is present in the chat list
    const [chats_array,setChats_array]= useState([])
    const [isPresent,setIsPresent] = useState(false)

//==================================================check whether user is present in the chat list=========================================================================
    const isPresentInChats = (user_id,chats_array) => {
        for (const chat of chats_array){
            if (chat[0]===user_id){
                return true
            }
        }

}
//======================================Post likes to the database===================================================================================

    const postLike = (e) => {
        e.preventDefault(); 

//like color doesnt change when we like the post for the first time
        //whenever a new document is created it takes the like state of the previous document
        //to not to do this change the like state whenver a new document is created 
//=======================================liking the document first time=============================

        //if there is a document named by 'user.displayName' in the collection 'postLikes' that means this is not the first time we are liking the document 
        //creating a document named 'user.displayName' hence this will be !(false) hence true
        if (    !(likes.filter(like => (like.username===user.displayName))).length     ){
        console.log("if statement")
        //add like to the 'postLikes' collection of the particular post 
        setLike(true)   
        DataBase.collection('posts').doc(postId).collection('postLikes').doc(user.uid).set(
            {
                like:like,
                username:user.displayName,
                timestamp:firebase.firestore.FieldValue.serverTimestamp(),

            }
        )
        setfavouritesColor(true)
        setLikeColor('red')
    
        }

//=======================================liking the document NOT first time==========================

        //if not liking the post for the first time meaning the document by the name 'user.displayName' already exists in the collection postLikes
        //hence this will be true 
        else if(  (likes.filter(like => (like.username===user.displayName))).length     ){
            console.log("else statement")
            setLike(!like)
            //update like to the 'postLikes' collection of the particular post 
            DataBase.collection('posts').doc(postId).collection('postLikes').doc(user.uid).update(
                {
                    like:like,
                    timestamp:firebase.firestore.FieldValue.serverTimestamp()
                }
            )
                  
        setfavouritesColor(!favouritesColor)
        
        setLikeColor(favouritesColor?'red':'')
        }    
}
//======================================Get the list of users in chatlist===============================================================================
useEffect(()=>{
    let unsubscribe
    if (user)
    {unsubscribe = DataBase.collection('users').doc(user.uid).collection('chats').orderBy('timestamp','desc').onSnapshot((snapshot)=>{
                        setChats(snapshot.docs.map((doc) => (doc.data())))
                    
    
                    })
    }
return  () => {
    unsubscribe()
};
//when postId changes fire the code above
},[,user_id,user])

//========================================================================================================================

useEffect(() => {
    //Run this function when the post component loads or there are changes in user object or chats object 
        //because we want to run this function only after the data from the database has been fetched and the component in which we are mapping this data (Button) that,
        //loads after the component which calls for this function (<Avatar>) is loaded  
        console.log("running AddButton")
            //loop through the object list of 'chats' 
            // if the 'chat_user_id' is already present in the chats object, then set the the second dimension true
            //convert each object into an array and loop through it
            let cha =[];
            //to store the return from the function if the user is present in the chat list 
            for (const chat of Object.entries(chats)){
                if (user_id===chat.chat_user_id){
                    
                    // console.log([chat[1].chat_user_id,true])
                    // console.log([chat[1].chat_user_id,true][0])
                    // first dimension is for uid 
                    // second dimension is a bool for checking whether the 'chat_user_id' is already present in the chats
               
                    cha.push([chat[1].chat_user_id,true])
                    // console.log("chats_array "+chats_array)
                    
                    
                }
                else{
                    cha.push([chat[1].chat_user_id,false])
                    // console.log("chats_array "+chats_array)
                    
                }
               

            }
            setChats_array(cha)
            setIsPresent(isPresentInChats(user_id,chats_array))
            console.log(isPresent)

        },[,chats,user])
//======================================Add the selected user to chats list============================================
const addToChats = () => {
    //if the document by the user_id already exists then it wont change it
    //if logged in user 'user.uid' == 'user_id' user who wrote the post  then dont add it to chats list
    if(!(user.uid===user_id)){
    DataBase.collection('users').doc(user.uid).collection('chats').doc(user_id).set({
        chat_username:username,
        //user id of the user who wrote the post
        chat_user_id:user_id,
        timestamp:firebase.firestore.FieldValue.serverTimestamp(),

        })
    }
    
} 
//======================================Post comments to the database========================================================================================
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
//====================================Get the comments and likes from the database and display=================================================================
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
        //when postId,user changes or page loads fire the code above
},[postId,user])

//==============================================================================================================================================================
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
//================================================================================================================================================================
    return (
        <div className="post">
            <div className="post__header" >
                                               {/*avatar managed by@material-ui/core*/}
                <Avatar className="post__avatar" alt={username} src="/static/images/avatar/1.jpg"></Avatar>
                <h3>{username}</h3>
                {/*==================================================================================================================================== */}
 
                {/* {user.uid === user_id && <Button onClick={addToChats}>Add to chats</Button>} */}
     
                {/*initially when chats array does not exists as it is made after calling the addToChats function  */}
                {/*if the array is empty (initial condition) */}
                {/* {console.log("array length")}
                {console.log((Array.isArray(chats_array) && chats_array.length) === 0 )} */}
                {/* {console.log(chats_array)} */}
                {/*to check whether the user is present in the chats_array*/}
                

                { //to stop react from freaking out when the user is not logged in
                 user && (
                    //Dont show anything for the post which are written by the user who is logged in
                    !(user.uid === user_id) &&  
                    //when there are no chats (chat array is empty)
                    (
                         (Array.isArray(chats_array) && chats_array.length) === 0 ? (<Button onClick={addToChats}>Add to chats</Button>) : 
                    (
                    //when there are chats
                    //check if the user is present in the chats_array
                    isPresent? 
                     //if present
                    ( 
                    chats_array.map((chat)=>(
                    //chat[0] contains the 'uid' of the 'user' who wrote the post 
                    //find the array element corresponding to the given post
                    //this is done by mathcing the 'user_id' from 'posts' to chat_user_id (chat[0])
                    //then check bool chat[1] for whether the element is present in an array or not
                    //if the element is not present then show <Add to chats> else show <Chat>
                    <span>{(chat[0]==user_id) && ((chat[1])?(<Button key={user_id} onClick={addToChats}>Add to chats</Button>):(<Button key={user_id}>Chat</Button>))}</span>
                    ))

                    ):
                    //if not present
                    (<Button key={user_id} onClick={addToChats}>Add  chats</Button>)
                        )    
                            ) 
                                )
                    }
                {/* {                chats_array.map((chat)=>{
                                    console.log(chat+"chta")
                })
                } */}
                <MoreVertIcon/>
             
            {/*===========================================================================================================================================*/}
            </div>
            {/* always run onLoad inside an img tag */}
            <img className="post__image" src={imageUrl} alt={username+" "+caption} />
            <h4 className="post__text"><strong>{username+" "}</strong>:{" "+caption}</h4>
            <div className="post__footer">
                                                     {/*like icon*/}

                            <FlipMove>   
                                {/* (like && (like.username===user.displayName)?(like.like?(<strong>You</strong>):(<strong></strong>)):(<strong>{like.username}</strong>)):(<strong></strong>) )}</p>       */}
                           
                                <FavoriteIcon   fontsize="small" cursor="pointer" onClick={postLike} style={{color:likeColor}} /> 
                                    {likes.map((like)=>
                                        (<p><strong>{user && (user.displayName===like.username?(like.like?(<strong>You{JSON.stringify(like.like)}</strong>):(<strong></strong>)):(like.username))}</strong></p>)
                                    )}
     
                            </FlipMove>
                                 {/*Comment icon*/}
                                 <IconButton>
                                    <ChatBubbleOutlineRoundedIcon fontsize="small" cursor="pointer"/>
                                </IconButton>
                                                    {/*share icon*/}
                            <IconButton>
                                <ShareIcon fontsize="small" cursor="pointer" onClick={() => {
                                                if (navigator.share) {
                                                    navigator.share({
                                                            title: document.title,
                                                            text: caption,
                                                            url: window.location.href,
                                                        })
                                                        .then(() => console.log('Successful share'))
                                                        .catch((error) => alert('Error sharing', error));
                                                } else {
                                                    alert("Web Share API is not supported in your browser.")
                                                }
                                            }}> 
                                </ShareIcon> 
                            </IconButton>
                                                    {/*Re-post icon*/}
                            <IconButton>                       
                                   <RepeatIcon fontsize="small" cursor="pointer"/>
                            </IconButton>

                            
                         
                                                 
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
