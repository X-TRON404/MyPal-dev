import { Card, CardContent, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useEffect, useState } from 'react'
import { Suspense } from 'react';
import { useStateValue } from '../contexts/StateProvider';
import { DataBase } from './firebase';
import './YourBookmarks.css'


function YourBookmarks() {
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    //store user's event bookmarks
    const [eventBookmarks,setEventBookmarks] = useState([])
    //store user's post bookmarks
    const [postBookmarks,setPostBookmarks] = useState([])
    //lazy loading
    const BookmarkedPost = React.lazy(() => import('./BookmarkedPost'))
    //lazy loading
    const BookmarkedEvent = React.lazy(() => import('./BookmarkedEvent'))

    useEffect(() => {
        if (user){
        DataBase.collection('users').doc(user?.uid).collection('bookmarksPost').orderBy('timestamp','desc').onSnapshot(
            (snapshot) =>{
                setPostBookmarks(snapshot.docs.map((doc) => doc.data()))
                console.log(postBookmarks)
                        })

        DataBase.collection('users').doc(user?.uid).collection('bookmarksEvents').orderBy('timestamp','desc').onSnapshot(
            (snapshot) =>{
                setEventBookmarks(snapshot.docs.map((doc) => doc.data()))
                        })
  
                }  
                
                
    }, [,user])
    return (
        <div className="bookmarks">
            <div className="bookmarks__postBookmarks">
                   {postBookmarks.map(post=>(
                     <Suspense fallback={
                        <div><Skeleton variant="text" />
                        <Skeleton variant="circle" width={40} height={40} />
                        <Skeleton variant="rect" width={210} height={118} /></div>} key={post.bookmarkPostId}>
                            <BookmarkedPost postId={post.bookmarkPostId} />
                    </Suspense>))}
            </div>
            <div className="bookmarks__eventBookmarks">
                    {eventBookmarks.map(event=>(
                     <Suspense fallback={
                        <div><Skeleton variant="text" />
                        <Skeleton variant="circle" width={40} height={40} />
                        <Skeleton variant="rect" width={210} height={118} /></div>} key={event.bookmarkEventUserId}>
                            <BookmarkedEvent eventId={event.bookmarkEventUserId} />
                    </Suspense>))}
            </div>
        </div>
    )
}

export default YourBookmarks
