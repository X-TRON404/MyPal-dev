
//users in sidebar chat (online/offline)

import React, { Suspense, useEffect, useState } from 'react'
import './WidgetsChat.css'
import { makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {realtime} from '../firebase'
import {useStateValue} from '../../contexts/StateProvider';
import Skeleton from '@material-ui/lab/Skeleton';

const WidgetMember = React.lazy(() => import('./WidgetMember'))
//==================================================Card Styles==============================================
const useStyles = makeStyles((theme) => ({
  root: {
    flex:1,
    display: 'flex',
    minWidth:  314,
    height:60,
    background: '#1A1A1A',
    '&:hover': {
       background: '#363A3E',
    },
    border:'1px grey',
    marginBottom:'2px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    Bottom:'20px',
    fontWeight:300,
    color: 'white',
    marginBottom:10,
  },
  avatar:{
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginTop:10,
    marginLeft:10,
    marginBottom:10,
  },
  typoStatus:{
    color:'grey',
  }

}));
//==================================================================================================================
function WidgetsChat() {
    //get the user from the provider  
    const [{user}, dispatch] = useStateValue();
    const [chats, setChats] = useState([])
    
    useEffect(() => {
        //if user is logged out it throws an error hence using try catch
        try {
        // console.log(chats)

          //get the username of the person we are chatting with 
          realtime.ref(`/'chats'/${user.uid}`).orderByChild('lastchatAt').on('value', (snapshot) => {
                //store chats of the particular user
                const chatsArray = [] 
            if (snapshot.exists()){
                snapshot.forEach((child)=>{
                  chatsArray.push(child.val())
                })
                // console.log(snapshot.val())
                // console.log(chatsArray)

                //.orderByChild works in ascending order
                //we want in descending order hence reverse tha array
                setChats(chatsArray.reverse())

            // setChats(snapshot.val())
            }
        });
           
        }
        catch (error) {
            console.log(error.message+" coming from widgetsChat getting 'chats'collection ")
            }
    }, [user,chats.length]);
    // console.log(chats)


    return (
//==========================================ALL CHATS LIST===========================================================
        <div className="widgetsChat">
          {chats.length!==0 &&  
                (chats.map((chat)=>(
                    <Suspense fallback={
                        <div>
                        <Skeleton variant="circle" width={40} height={40} />
                        <Skeleton variant="rect" width={210} height={50} /></div>} key={chat.key}>
                      
                        <Link to={`/chats/${chat.chat_user_id}`} style={{ textDecoration: 'none' }}>
                          <WidgetMember lastchatAt={chat.lastchatAt} chatId={chat.chat_user_id} chat_username= {chat.chat_username} />
                        </Link>

                        {/* {console.log(chat.chat_user_id)} */}
                    </Suspense>
                ))
            )
            }            
        </div>
    )
}

export default WidgetsChat
