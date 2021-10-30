//this profile will be visible to other users when they click on the profile
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './UserProfile.css'
import { Button, Input, Snackbar } from '@material-ui/core';
import { auth, DataBase, realtime } from '../firebase';
import firebase from 'firebase/app'
import { useParams } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import UserScrollableTabsButtonAuto from './UserSwipeTab';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';


const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar:{
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginTop:10,
        marginLeft:10,
        marginBottom:10,
        marginRight:10,
      },
  chips:{
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

function UserProfile() {
  //get user from firebase
  const user = firebase.auth().currentUser
  const classes = useStyles();
  //store the user fields from the database 
  const [userInfo,setUserInfo] = useState([])
  //store the number of posts inside posts collection
  const [numberOfPosts, setNumberOfPosts] = useState(0)
  //bio
  const [bio,setBio] = useState(userInfo?.bio);
  //added to chat notification open/close
  const [show, setShow] = useState(false);
  //get the slug from the url  (remeber that component using useParams should be inside <Router>)
  const {palId} = useParams()
  //===========================================================================================
  useEffect(() => {
      //load the user info from Database on load or when user changes
      const unsubscribe = DataBase.collection('users').doc(palId).onSnapshot(snapshot=>{
                                  setUserInfo(snapshot.data());
      })      
                        //   DataBase.collection('users').doc(user.uid).collection('posts').onSnapshot(snapshot=>{
                        //           setNumberOfPosts(snapshot.size)
                        //   })
      return () => {
          unsubscribe()
      }
  }, [palId])
  //=============================================================================================
    //close notifications toast
    const handleCloseNotif = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setShow(false);
    };

  //======================================Add the selected user to chats list============================================
  const addToChats = () => {
    //if the document by the palId already exists then it wont change it
    //if logged in user 'user.uid' == 'palId' user who wrote the post  then dont add it to chats list
      if (!(user.uid === palId)) {
        //===================Add to Realtime============
        realtime.ref(`/'chats'/${user.uid}/${palId}`).set(
          {
            chat_username: userInfo?.displayName,
            //user id of the user who wrote the post
            chat_user_id: palId,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            lastchatAt: firebase.database.ServerValue.TIMESTAMP,
          },
          (error) => {
            if (error) {
              alert(error.message);
            } else {
            }
          }
        );
        //add the user1 who added user2 to chatlist of user1 to chatlist of user2
        //also later write the code to send notification to user2 that he has been added to the chatlist by user1
        realtime.ref(`/'chats'/${palId}/${user.uid}`).set(
          {
            chat_username: user.displayName,
            //user id of the user who wrote the post
            chat_user_id: user.uid,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            lastchatAt: firebase.database.ServerValue.TIMESTAMP,
          },
          (error) => {
            if (error) {
              alert(error.message);
            } else {
            }
          }
        );
      }
      //open notification alert
      setShow(true);
  }
    return (
        <div className="userProfile">
            <Snackbar
            className={classes.snackbar}
            open={show}
            autoHideDuration={1000}
            anchorOrigin={{ vertical: "center", horizontal: "center" }}
            onClose={handleCloseNotif}
            message="Added to chats"
          />
                    <div className="userProfile__header">
                        <div className="userProfile__headerTop">
                                <Avatar className={classes.avatar} alt={userInfo?.displayName} src={userInfo?.displayName} ></Avatar>
                                <div className="userProfile__headerInfo">
                                    <Typography><b>{userInfo?.displayName}</b></Typography>
                                    <p style={{color:'gray'}}font-size="small">{`Joined on ${user?.metadata.creationTime.slice(0,17)}`}</p>
                                  {/*dont show add to chats for the user who is signed in (you cant add yourself to chats)*/}
                                                                      {!(user.uid === palId) &&
                                    <Button size="small" onClick={addToChats}>Add to chats</Button>
                                  }
                                </div>
                            {/* <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton> */}
                        </div>
                       
                        <div className="userProfile__headerTypography">
                                                {/*user bio*/}
                            <Typography>{userInfo?.bio}</Typography>
                            {/* <Typography>Interests</Typography> */}
                        </div>
                    </div>
                    <span>{userInfo?.institute && <Chip size="x-small" icon={<AccountBalanceIcon />} label={userInfo?.institute} />}</span>
                    <div className="userProfile__footer">
                           <UserScrollableTabsButtonAuto palId />
                    </div>
                 
        </div>
    )
}

export default UserProfile
