import React, { useEffect, useState } from 'react'
import { useStateValue } from '../contexts/StateProvider';
import { DataBase } from './firebase';
import Event from './events/Event';



function BookmarkedEvent({eventId}) {
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    const [eventToBookmark, setEventToBookmark] = useState([])
    //====================================Event changes listner=========================================
    useEffect( () => {
        //onSnapshot = listner to changes in event 
        //everytime the events change run this code
        //grab the collection 'events' from the database with doc = eventId 
        DataBase.collection('events').doc(eventId).get().then((doc) => {
            setEventToBookmark(doc.data())
            console.log(eventToBookmark)
        }).catch((err)=>(alert(err)))
    },[,user,eventId]);
    return (
        <div className="bookmarkedEvent">
            <Event eventId={eventId} dateTime={eventToBookmark.dateTime} venue={eventToBookmark.venue} title={eventToBookmark.title} username={eventToBookmark.username} user_id={eventToBookmark.user_id} description={eventToBookmark.description} imageUrl={eventToBookmark.imageUrl} interestedCount={eventToBookmark.interestedCount}/>
        </div>
    )
}

export default BookmarkedEvent
