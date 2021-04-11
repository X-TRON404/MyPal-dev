import React, { useEffect, useState } from 'react'
import Post from './Post';
import {DataBase} from './firebase'


function Feed() {
//posts array
const [posts, setPosts] = useState([]);
//flag to keep track of whether the user has logged in or not (user who's signed in )
const [user,setUser] = useState(null);
//====================================Post changes listner=========================================
    useEffect( () => {
        //onSnapshot = listner to changes in posts 
        //everytime the posts change run this code
        //grab the collection 'posts' from the database and order 'docs' in the collection by timestamp
        DataBase.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
        //Now set the  id=doc.id and post=doc.data to the fields in the 'posts' variable that we defined above
        setPosts(snapshot.docs.map(doc =>({id:doc.id,post:doc.data()})))
            })
    },[]);
    return (
    <div className="feed">
            <div className="feed__posts"> 
                 {
                //render only those posts by id who are newly added to the database dont render the entire post list  
                posts.map(({id,post})=>(<Post key={post.id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}></Post>))
                } 
            </div>    
    </div>
    )
}

export default Feed
