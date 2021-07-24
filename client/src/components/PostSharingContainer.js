import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useStateValue } from '../contexts/StateProvider';
import { DataBase } from './firebase';
import Post from'./Post'
import './PostSharingContainer.css'

function PostSharingContainer() {
    //get the slug from the url  (remeber that component using useParams should be inside <Router>)
    const {postId} = useParams();
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    const [postToShare, setPostToShare] = useState([])
    //====================================Post changes listner=========================================
    useEffect( () => {
        //onSnapshot = listner to changes in posts 
        //everytime the posts change run this code
        //grab the collection 'posts' from the database and order 'docs' in the collection by timestamp
        DataBase.collection('posts').doc(postId).get().then((doc) => {
            setPostToShare(doc.data())
            console.log(postToShare)
        }).catch((err)=>(alert(err)))
    },[,user,postId]);
    return (
        <div className="postSharingContainer">
            <Post postId={postId} username={postToShare.username} user_id={postToShare.user_id} caption={postToShare.caption} imageUrl={postToShare.imageUrl} likesCount={postToShare.likesCount}  />
        </div>
    )
}

export default PostSharingContainer
