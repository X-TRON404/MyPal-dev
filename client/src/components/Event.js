import React, { Suspense, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Event.css'
import { Paper } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { DataBase } from './firebase';
import { useStateValue } from '../contexts/StateProvider';
import firebase from 'firebase/app'
import Skeleton from '@material-ui/lab/Skeleton';
import ShareIcon from '@material-ui/icons/Share';


const EventsMenu = React.lazy(()=>import('./EventsMenu'))

const useStyles = makeStyles({
  root: {
    backgroundColor:"#2E3336",
  },
  media: {
    height: 140,
  },
});
function Event({eventId, dateTime, venue, username,title, description, user_id, imageUrl, interestedCount}) {
    const classes = useStyles();
    const convertToDate = (date) => {
        let k = date
        let dat = Date(k)
        dat = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: "long" ,day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(k)
        return dat
    }
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    //bool to check if the current event is already subscribed or not
    const [interested,setInterested] = useState(false) 
    //disable the interested button after click
    const [onclickDisable,setOnclickDisable] = useState(false)

//===================================Add event to interested====================================
    const addInterested = () => {
    DataBase.collection('users').doc(user.uid).collection('interestedEvents').doc(eventId).set(
        {   eventTitle:title,
            eventId:eventId,
            dateTime:dateTime,
            venue:venue,
            eventDescription:description,
            eventOrganizedByName:username,
            eventOrganizedById:user_id,
        }
    )
    //increase the interested count
    DataBase.collection('events').doc(eventId).update("interestedCount", firebase.firestore.FieldValue.increment(1))

    setOnclickDisable(true)
}

//=====================================check if the user already registered for the event ==========================
useEffect(() => {

    DataBase.collection('users').doc(user.uid).collection('interestedEvents').doc(eventId).get().then((doc) => {
        if (doc.exists) {
            setInterested(true)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    
}, [eventId,interested])

//===============================================================================================
    return (
        <div className="event">
            <div className="event__header">
                <div className="event__headerInfo">
                    <Typography className="event__title"  variant="h5">
                        {title}
                    </Typography>
                    <span className="event__dateTime">
                        Date and time:<b>{" "+ convertToDate(dateTime)}</b>
                    </span>
                    <span  className="event__location">
                        Venue:{venue}
                    </span>
                </div>
                <Suspense fallback={
                        <div><Skeleton variant="text" /></div>} >
                            <EventsMenu eventId={eventId} eventUsername={username} eventUserId={user_id}/>
                </Suspense>
            </div>
            <Card className={classes.root}>

                <div className="event__thubnail">
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                        image={imageUrl}
                        />
                    </CardActionArea>
                </div>

                <CardContent className="event__description">
                    <Typography variant="body2" color="textSecondary"  component={'span'}>
                        {description}
                    </Typography>
                </CardContent>

                <div className="event__footer">
                    <div className="event__interested">
                        {/*if already registered for the event then show registered*/}
                    {
                    !interested?(<Button size="small" onClick={addInterested} disabled={onclickDisable}>    
                                Interested
                        </Button>):(<Button size="small" disabled={true}>Registered</Button>)

                    }   
                    </div>
    
                    <div className="event__actions">
                                                                   {/*share icon*/}
                            <Button onClick={() => {
                                                if (navigator.share) {
                                                    navigator.share({
                                                            title: document.title,
                                                            text: title,
                                                            url: window.location.href + `share/events/${eventId}`,
                                                        })
                                                        .then(() => console.log('Successful share'))
                                                        .catch((error) => console.log('Error sharing', error));
                                                } else {
                                                    alert("Web Share API is not supported in your browser.")
                                                }
                                            }}>
                                <ShareIcon fontsize="small" cursor="pointer"> 
                                </ShareIcon> 
                            </Button>
                    <div className="event__interestedInterestedCount">Interested: {interestedCount}</div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Event


