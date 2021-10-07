import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useStateValue } from '../../contexts/StateProvider';
import Confessions from './Confessions';
import { DataBase } from '../firebase';
import '../posts/PostSharingContainer.css'

function ConfessionSharingContainer() {
    //get the slug from the url  (remeber that component using useParams should be inside <Router>)
    const {confessionId} = useParams();
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    const [confessionToShare, setConfessionToShare] = useState([])
    //====================================Confession changes listner=========================================
    useEffect( () => {
        //onSnapshot = listner to changes in confession 
        //everytime the confession change run this code
        //grab the collection 'Events' from the database with doc = confessionId
        DataBase.collection('confessions').doc(confessionId).get().then((doc) => {
            setConfessionToShare(doc.data())
            console.log(confessionToShare)
        }).catch((err)=>(alert(err)))
    },[,user,confessionId]);
    return (
        <div className="postSharingContainer">
            <Confessions confessionId={confessionId} confession={confessionToShare.confession} likesCount={confessionToShare.likesCount}/>
        </div>
    )
}

export default ConfessionSharingContainer
