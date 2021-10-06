import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../contexts/StateProvider";
import Event from "./Event";
import { DataBase } from "../firebase";
import "../PostSharingContainer.css";

function EventSharingContainer() {
  //get the slug from the url  (remeber that component using useParams should be inside <Router>)
  const { eventId } = useParams();
  //get the user from the provider
  const [{ user }, dispatch] = useStateValue();
  const [eventToShare, setEventToShare] = useState([]);
  //====================================Event changes listner=========================================
  useEffect(() => {
    //onSnapshot = listner to changes in Event
    //everytime the Event change run this code
    //grab the collection 'Events' from the database with doc = eventId
    DataBase.collection("confessions")
      .doc(eventId)
      .get()
      .then((doc) => {
        setEventToShare(doc.data());
        console.log(eventToShare);
      })
      .catch((err) => alert(err));
  }, [, user, eventId]);
  return (
    <div className="postSharingContainer">
      <Event
        eventId={eventId}
        title={eventToShare.title}
        venue={eventToShare.venue}
        username={eventToShare.username}
        imageUrl={eventToShare.imageUrl}
        dateTime={eventToShare.dateTime}
        interestedCount={eventToShare.interestedCount}
        user_id={eventToShare.user_id}
        description={eventToShare.description}
      />
    </div>
  );
}

export default EventSharingContainer;
