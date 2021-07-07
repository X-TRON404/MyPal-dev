//this profile will be visible to other users when they click on the profile
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './UserProfile.css'
import { Button, Input } from '@material-ui/core';
import { auth, DataBase } from './firebase';
import firebase from 'firebase/app'
import { useParams } from 'react-router-dom';
import UserScrollableTabsButtonAuto from './UserSwipeTab';


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
}));

function UserProfile() {
//get user from firebase
const user = firebase.auth().currentUser
const classes = useStyles();
//store the user fields from the database 
const [userInfo,setUserInfo] = useState([])
//store the number of posts inside posts collection
const [numberOfPosts, setNumberOfPosts] = useState(0)
//get the slug from the url  (remeber that component using useParams should be inside <Router>)
const {palId} = useParams()
//===========================================================================================
useEffect(() => {
    //load the user info from Database on load or when user changes
    const unsubscribe = DataBase.collection('users').doc(palId).onSnapshot(snapshot=>{
                                setUserInfo(snapshot.data());
                                console.log("userInfo"+ userInfo)
    })

                      //   DataBase.collection('users').doc(user.uid).collection('posts').onSnapshot(snapshot=>{
                      //           setNumberOfPosts(snapshot.size)
                      //   })
    return () => {
        unsubscribe()
    }
}, [,palId])
//displayName 
const [displayName,setDisplayName] = useState(userInfo?.displayName);
//bio
const [bio,setBio] = useState(userInfo?.bio);


    return (
        <div className="userProfile">
                <Card className="userProfile__card" elevation={1}>
                    <div className="userProfile__header">
                        <div className="userProfile__headerTop">
                                <Avatar className={classes.avatar} alt={'username'} src="/static/images/avatar/1.jpg" ></Avatar>
                                <div className="userProfile__headerInfo">
                                    {/*if show edit input is true then show the input elements for edit else show normal elements*/}
                                                {/*username*/}
                                    {<Typography><b>{userInfo?.displayName}</b></Typography>}
                                    {/* <Typography>{`Joined on ${user?.metadata.creationTime.slice(0,17)}`}</Typography> */}
                                </div>
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        </div>
                       
                        <div className="userProfile__headerTypography">
                                                {/*user bio*/}
                            <Typography>{userInfo?.bio}</Typography>
                            <Typography>Interests</Typography>
                        </div>
                    </div>
                    <div className="userProfile__footer">
                           <UserScrollableTabsButtonAuto palId />
                    </div>
                    </Card>
        </div>
    )
}

export default UserProfile
