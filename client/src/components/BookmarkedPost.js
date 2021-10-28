import React, { useEffect, useState } from 'react'
import { useStateValue } from '../contexts/StateProvider';
import { DataBase } from './firebase';
import Post from './posts/Post';



function BookmarkedPost({postId}) {
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    const [postToBookmark, setPostToBookmark] = useState([])
    //====================================Post changes listner=========================================
    useEffect( () => {
        //onSnapshot = listner to changes in posts 
        //everytime the posts change run this code
        //grab the collection 'posts' from the database with doc = postId 
        DataBase.collection('posts').doc(postId).get().then((doc) => {
            setPostToBookmark(doc.data())
            console.log(postToBookmark)
        }).catch((err)=>(alert(err)))
    },[,user,postId]);
    return (
        <div className="bookmarkedPost">
             <Post postId={postId} username={postToBookmark?.username} user_id={postToBookmark?.user_id} timeInMillis={postToBookmark?.timestamp?.seconds * 1000}  caption={postToBookmark?.caption} imageUrl={postToBookmark?.imageUrl} likesCount={postToBookmark?.likesCount}/>
        </div>
    )
}

export default BookmarkedPost
