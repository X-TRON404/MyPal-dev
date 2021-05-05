import React, { useEffect, useState } from 'react'
import Event from './Event';
import {DataBase} from './firebase'
import {useStateValue} from '../contexts/StateProvider'

function FeedEvents() {

//get the user from the provider
const [{user}, dispatch] = useStateValue();
//events array
const [events, setEvents] = useState([]);
//====================================Events changes listner=========================================
    useEffect( () => {
        //onSnapshot = listner to changes in posts 
        //everytime the posts change run this code
        //grab the collection 'events' from the database and order 'docs' in the collection by timestamp
        DataBase.collection('events').orderBy('timestamp','desc').onSnapshot(snapshot =>{
        //Now set the  id=doc.id and event=doc.data to the fields in the 'event' variable that we defined above
        setEvents(snapshot.docs.map(doc =>({id:doc.id,event:doc.data()})))
            })
    },[user]);
    return (
    <div className="feedEvents">
            <div className="feedEvents__events"> 
                 {
                //render only those posts by id who are newly added to the database dont render the entire post list  
                posts.map(({id,event})=>(<Event key={event.id} postId={id} date={event.date} time={event.time} venue={event.venue} title={event.titile} username={event.username} user_id={event.user_id} description={event.description} imageUrl={event.imageUrl} interestedCount={event.interestedCount}/>))
                } 
            </div>    
    </div>
    )
}

export default FeedEvents
