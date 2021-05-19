import { Card, CardContent, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useStateValue } from '../contexts/StateProvider';
import { DataBase } from './firebase';
import './YourEvents.css'

function YourEvents() {
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    //store user's events
    const [events,setEvents] = useState([])
    //convert date
    const convertToDate = (date) => {
        //convert to miliseconds
        let k = date.seconds*1000
        let dat = Date(k)
        dat = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: "long" ,day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(k)
        return dat
    }
    //====================================GET user created events=========================================
    useEffect( () => {
        //grab the events which belong to the logged in user from the db
        DataBase.collection('events').where("user_id", "==", user.uid).get()
        .then((querySnapshot) => {
            setEvents(querySnapshot.docs.map(doc =>doc.data()))
            console.log(events)
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        
    },[user]);
    return (
        <div className="yourevents">
            {events.map(event=>(
                    <Card className="yourevents__event">
                        <CardContent>
                            <Typography>Event: {event.title}</Typography>
                            <Typography>Date: {convertToDate(event.dateTime)}</Typography>
                            <Typography>Venue: {event.venue}</Typography>
                            <Typography>Interested people: {event.interestedCount}</Typography>
                        </CardContent>
                    </Card>
            ))}
        </div>
    )
}

export default YourEvents
