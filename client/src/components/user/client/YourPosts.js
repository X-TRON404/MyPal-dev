import React, { useEffect, useState } from 'react';
import { useStateValue } from '../../../contexts/StateProvider';
import { DataBase } from '../../firebase';
import './YourPosts.css'
import YPost from './YPost'

const EmptyList = () => <h4 style={{ color: 'aliceblue' }}>Empty. Nothing to see here</h4>

export default function YourPosts() {
  //get the user from the provider
  const [{ user }] = useStateValue();
  //posts array
  const [posts, setPosts] = useState([]);

  const handleGetPosts = async () => {
    // Get user posts, in case of error, show a console.log
    try {
      const data = await DataBase.collection('posts').where('user_id', '==', user?.uid).get()
      const posts = data.docs.map(doc => ({ id: doc.id, post: doc.data() }))
      setPosts(posts)
    } catch (error) {
      console.log('Error getting documents: ', error)
    }
  }
  //====================================GET user created posts=========================================
  useEffect(() => {
    if (user) {
      //grab the posts which belong to the logged in user from the db
      handleGetPosts()
    }
  }, [user]);

  const handleDeletePost = id => () => {
    console.log(id, 'id post')
    const newPosts = posts.filter(post => post.id !== id)
    setPosts(newPosts)
  }

  return (
    <div className="yourPosts">
      {posts.length !== 0 ? (
        posts.map((post) => (
          <YPost
            key={post.id}
            onDelete={handleDeletePost(post.id)}
            postId={post.id}
            username={post.post.username}
            user_id={post.post.user_id}
            caption={post.post.caption}
            imageUrl={post.post.imageUrl}
            timeInMillis={post.post?.timestamp?.seconds * 1000}
            likesCount={post.post.likesCount}
          />
        ))) : (
        <EmptyList />
      )}
    </div>
  );
}
