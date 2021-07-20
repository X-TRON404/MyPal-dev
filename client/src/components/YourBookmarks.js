import { Card, CardContent, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
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
    //convert date
    const convertToDate = (date) => {
        //convert to miliseconds
        let k = date.seconds*1000
        let dat = Date(k)
        dat = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: "long" ,day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(k)
        return dat
    }

    useEffect(() => {
        if (user){
        DataBase.collection('users').doc(user?.uid).collection('bookmarksPost').orderBy('timestamp','desc').onSnapshot(
            (snapshot) =>{
                    setEventBookmarks(snapshot.docs.map((doc) => doc.data()))
                        })

        DataBase.collection('users').doc(user?.uid).collection('bookmarksEvents').orderBy('timestamp','desc').onSnapshot(
            (snapshot) =>{
                setPostBookmarks(snapshot.docs.map((doc) => doc.data()))
                console.log(postBookmarks)
                        })
                }           
    }, [,user])
    return (
        <div className="bookmarks">
            <div className="bookmarks__postBookmarks">
                   {postBookmarks.map(post=>(
                    <Card className="yourevents__event">
                        <CardContent>
                            <Typography  component={'span'}>Caption: {post.bookmarkPostCaption}</Typography>
                            <img src={post.bookmarkPostImage}/>
                            <Typography  component={'span'}>Posted By: {post.bookmarkPostUsername}</Typography>
                        </CardContent>
                    </Card>
                     ))}
            </div>
            <div className="bookmarks__postBookmarks">
                    {/* {eventBookmarks.map(event=>(
                    <Card className="yourevents__event">
                        <CardContent>
                            <Typography>Event: {event.title}</Typography>
                            <Typography>Date: {convertToDate(event.dateTime)}</Typography>
                            <Typography>Venue: {event.venue}</Typography>
                            <Typography>Interested people: {event.interestedCount}</Typography>
                        </CardContent>
                    </Card>
                     ))} */}
            </div>
        </div>
    )
}

export default YourBookmarks
