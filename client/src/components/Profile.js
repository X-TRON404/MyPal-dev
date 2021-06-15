import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './Profile.css'
import { Button, Input } from '@material-ui/core';
import { auth, DataBase } from './firebase';
import firebase from 'firebase/app'
import ScrollableTabsButtonAuto from './SwipeTab'


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

function Profile() {
//get user from firebase
const user = firebase.auth().currentUser
const classes = useStyles();
//store the user fields from the database 
const [userInfo,setUserInfo] = useState([])
//store the number of posts inside posts collection
const [numberOfPosts, setNumberOfPosts] = useState(0)
//show or hide edit options
const [showEditInput, setShowEditInput] = useState(false);
//===========================================================================================
useEffect(() => {
    //load the user info from Database on load or when user changes
    const unsubscribe = DataBase.collection('users').doc(user?.uid).onSnapshot(snapshot=>{
                                setUserInfo(snapshot.data());
                                console.log(userInfo)
    })

                      //   DataBase.collection('users').doc(user.uid).collection('posts').onSnapshot(snapshot=>{
                      //           setNumberOfPosts(snapshot.size)
                      //   })
    return () => {
        unsubscribe()
    }
}, [,user])
//displayName to edit the existing username
const [displayName,setDisplayName] = useState(user?.displayName);
// edit bio
const [bio,setBio] = useState(userInfo?.bio);
console.log(bio)

//==================================================Log out =======================================
const logout = () => {
    //remove the user from the local storage
    // localStorage.setItem('user','null')
    auth.signOut().then(() => {
      console.log("sucessfully singned out")
    }).catch((error) => {
      alert(error.message)
    });
    }
//============================================================================================
    //edit button event
    const handleEditInputShow = () => {
        setShowEditInput(true)
    }
    //save changes 
    const handleProfileUpdate = () => {
        //if displayName is changed
        if (user.displayName !== displayName){
            user.updateProfile({
            displayName: displayName,
          }).then(function(result) {
            console.log(result)
          }).catch(function(err) {
            alert(err.message)
          });
        }
        //if bio is changed
        else if (bio !== userInfo?.bio){
            DataBase.collection('users').doc(user.uid).set({
                bio:bio
            })
        }
    //close edit mode
    setShowEditInput(false)
    }
    return (
        <div className="profile">
                <Card className="profile__card" elevation={1}>
                    <div className="profile__header">
                        <div className="profile__headerTop">
                                <Avatar className={classes.avatar} alt={'username'} src="/static/images/avatar/1.jpg" ></Avatar>
                                <div className="profle__headerInfo">
                                    {/*if show edit input is true then show the input elements for edit else show normal elements*/}
                                                {/*username*/}
                                    {!showEditInput &&<Typography><b>{user?.displayName}</b></Typography>}
                                                {/*username edit input box*/}
                                    {showEditInput && <Input value={displayName} onChange={(e)=>{setDisplayName(e.target.value)}}/>}
                                    <Typography>{`Joined on ${user?.metadata.creationTime.slice(0,17)}`}</Typography>
                                </div>
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        </div>
                                              {/*Edit button*/}
                        <center className="profile__headerEditButton">
                            {!showEditInput &&<Button size="small" onClick={handleEditInputShow}>Edit Profile</Button>}
                                                {/*save changes button*/}
                            <div className="profile__headerSaveButton">
                                {showEditInput && <Button size="small"  id="saveButton" variant="outlined" color="primary" onClick={handleProfileUpdate}>Save changes</Button>}
                                {showEditInput && <Button size="small"  id="discardButton" color="primary" onClick={()=>{setShowEditInput(false)}}>Discard changes</Button>}
                            </div>
                        </center>
                        <div className="profile__headerTypography">
                                                {/*user bio*/}
                            {!showEditInput && <Typography>{userInfo?.bio}</Typography>}
                                                {/*user bio edit*/}
                            {showEditInput && <Input value={bio} onChange={(e)=>{setBio(e.target.value)}}/>}
                            <Typography>Interests</Typography>
                        </div>

                                            {/*log out button*/}
                        <Button size="small" className="profile__logoutButton" onClick={logout}>Log out</Button>
                    </div>
                    <div className="profile__footer">
                           <ScrollableTabsButtonAuto/>
                    </div>
                    </Card>
        </div>
    )
}

export default Profile
