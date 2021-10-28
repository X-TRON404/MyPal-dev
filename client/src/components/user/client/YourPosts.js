import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../../contexts/StateProvider';
import { DataBase } from '../../firebase';
import './YourPosts.css'
import YPost from './YPost'

export default function YourPosts() {
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    //posts array
    const [posts, setPosts] = useState([]);
//====================================GET user created posts=========================================
    useEffect( () => {
      if (user){
        //grab the posts which belong to the logged in user from the db
        DataBase.collection('posts').where("user_id", "==", user?.uid).get()
        .then((querySnapshot) => {
            setPosts(querySnapshot.docs.map(doc =>({id:doc.id,post:doc.data()})))
            console.log(posts)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
              }
    },[,user]);
    

  return (
    <div className="yourPosts">
            {posts.length!=0?(                            
            posts.map((post) => (
                  <YPost postId={post.post.id} username={post.post.username} user_id={post.post.user_id} caption={post.post.caption} imageUrl={post.post.imageUrl} timeInMillis={post.post?.timestamp?.seconds * 1000} likesCount={post.post.likesCount}/>
            ))):(<h4 style={{color:'aliceblue'}}>Empty. Nothing to see here</h4>)}
    </div>
  );
}
