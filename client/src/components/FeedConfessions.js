import React, { useEffect, useState } from 'react'
import Confessions from './Confessions'
import {DataBase} from './firebase'
import {useStateValue} from '../contexts/StateProvider'


function FeedConfessions(){

//get the user from the provider
const [{user}, dispatch] = useStateValue();
//confessions array
const [confessions, setConfessions] = useState([]);
//====================================Post changes listner=========================================
    useEffect( () => {
        //onSnapshot = listner to changes in posts 
        //everytime the posts change run this code
        //grab the collection 'posts' from the database and order 'docs' in the collection by timestamp
        DataBase.collection('confessions').orderBy('timestamp','desc').onSnapshot(snapshot =>{
        //Now set the  id=doc.id and post=doc.data to the fields in the 'posts' variable that we defined above
        setConfessions(snapshot.docs.map(doc =>({id:doc.id,confession:doc.data()})))
            })
    },[user]);
    return (
    <div className="feedConfessions ">
            <div className="feedConfessions__confessions "> 
                 {
                //render only those posts by id who are newly added to the database dont render the entire post list  
                confessions.map(({id,confession})=>(<Confessions  key={confession.id} confessionId={confession.id} confession={confession.confession} />))
                } 
            </div>    
    </div>
    )
}

export default FeedConfessions
