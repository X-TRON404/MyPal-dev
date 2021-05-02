import React, { useEffect, useState } from 'react'
import Post from './Post';
import {DataBase} from './firebase'
import {useStateValue} from '../contexts/StateProvider'


function Feed(){

//get the user from the provider
const [{user}, dispatch] = useStateValue();
//posts array
const [posts, setPosts] = useState([]);
//====================================Post changes listner=========================================
    useEffect( () => {
        //onSnapshot = listner to changes in posts 
        //everytime the posts change run this code
        //grab the collection 'posts' from the database and order 'docs' in the collection by timestamp
        DataBase.collection('users').doc(user.uid).collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
        //Now set the  id=doc.id and post=doc.data to the fields in the 'posts' variable that we defined above
        setPosts(snapshot.docs.map(doc =>({id:doc.id,post:doc.data()})))
            })
    },[user]);
    return (
    <div className="feed">
            <div className="feed__posts"> 
                 {
                //render only those posts by id who are newly added to the database dont render the entire post list  
                posts.map(({id,post})=>(<Post key={post.id} postId={id} username={post.username} user_id={post.user_id} caption={post.caption} imageUrl={post.imageUrl} likesCount={post.likesCount}></Post>))
                } 
            </div>    
    </div>
    )
}

export default Feed
