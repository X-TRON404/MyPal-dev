import React, { useEffect, useState, Suspense } from 'react'
import {DataBase} from './firebase'
import {useStateValue} from '../contexts/StateProvider'
import Skeleton from '@material-ui/lab/Skeleton';


const Confessions = React.lazy(()=>import('./Confessions'))
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
                confessions.map(({id,confession})=>(
                    <Suspense fallback={
                        <div><Skeleton variant="text" />
                        <Skeleton variant="circle" width={40} height={40} />
                        <Skeleton variant="rect" width={210} height={118} /></div>} key={id}>
                            <Confessions confessionId={id} confession={confession.confession} />
                    </Suspense>
                ))
                } 
            </div>    
    </div>
    )
}

export default FeedConfessions
