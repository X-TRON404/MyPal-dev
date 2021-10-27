import React, {useState,useEffect, Suspense,lazy} from 'react';
import './App.css';
import {auth, DataBase} from './firebase'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { AppBar, Avatar, Backdrop, Button, FormControl, Input, InputLabel, MenuItem, Snackbar } from '@material-ui/core';
import ImageUpload from './imageUpload/ImageUpload';
import Sidebar from './navigation/Sidebar';
import Widgets from './Widgets';
import { BrowserRouter as Router ,Link} from 'react-router-dom'
import {Route,Switch} from 'react-router-dom'
import Chat from './chat/Chat'
import {useStateValue} from '../contexts/StateProvider';
import { actionTypes } from '../contexts/reducer';
import firebase from 'firebase/app'
import SendMessage from './chat/SendMessage'
//Get material-ui icons
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import BottomNavigationMobile from './navigation/BottomNavigationMobile'
import logo from '../texx_logo.png'
import {realtime} from './firebase'
import { getToken } from './firebase';
import { onMessageListener } from './firebase';
import Home from './Home'
import UserProfile from './user/UserProfile';
import Select from '@material-ui/core/Select';
import MuiAlert from '@material-ui/lab/Alert';
import SpeedDiall from './SpeedDial';

//custom alert for notifications toast
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

//====================================Modal styles=========================================
function getModalStyle() {
  const top = 50 ;
  const left = 50 ;  
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    [theme.breakpoints.down("xs")]: {
      width: 250,
    },
    [theme.breakpoints.between("sm", "lg")]: {
      width: 450,
    },
    backgroundColor:'#2E3336',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color:'white'
    },
    root: {
    display: 'flex',
    objectFit: 'contain',
    backgroundColor: '#363A3E',
    padding:'10px',
    position: 'sticky',
    zIndex: 100, 
    },
    backdrop: {
      zIndex: 1,
      color: '#ffffff',
    },
    speedDial: {
      position: 'fixed',
      bottom: theme.spacing(12),
      right: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    notif:{
      backgroundColor:'red',
    },
}));
//========================================================================================================
function App() {
  //dispatch for the user
  const [{},dispatch] = useStateValue();
  const classes = useStyles();
  //modal styles
  const [modalStyle] = useState(getModalStyle);
  //initially unless fired dont show the model for sign in
  const [openSignIn,setOpenSignIn] = useState(false);
  //initially unless fired dont show the model for sign up
  const [open,setOpen] = useState(false);
  //for requiring sign in/sign up to upload
  const [openRequired,setOpenRequired] = useState(false)
  //store username of the person who wrote the post
  const [username,setUsername] = useState('');
  //store email
  const [email,setEmail] = useState('');
  //store password
  const [password,setPassword] = useState('');
  //store bio
  const [bio,setBio] = useState('');
  //flag to keep track of whether the user has logged in or not (user who's signed in )
  const [user,setUser] = useState([]);
  //save userId 
  const [userId,setUserId] = useState(null)
  //show password for password field
  const [showPassword,setShowPassword] = useState(false)
  //select institute in sign up
  const [institute,setInstitute] = useState('')
  //push notifications permissions token:
  const [isTokenFound, setTokenFound] = useState(false);
  //push notifications open/close
  const [show, setShow] = useState(false);
  // const [notification, setNotification] = useState({title: '', body: ''});
  // getToken(setTokenFound);

  //alerts as snackbars (show/message)
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // onMessageListener().then(payload => {
  //   setShow(true);
  //   setNotification({title: payload.notification.title, body: payload.notification.body})
  //   console.log(payload);
  // }).catch(err => console.log('failed: ', err));

  // getToken(setTokenFound);
  //user stored in local storage
  let userFromLocalStorage
  //
  let user_Id
  //lazy loading
  const Profile = React.lazy(() => import('./Profile'))
  const Feed = React.lazy(() => import('./feed/Feed'))
  const Chat = React.lazy(() => import('./chat/Chat'))
  const CreateEvent = React.lazy(() => import('./events/CreateEvent'))
  const CreateConfessions = React.lazy(() => import('./confessions/CreateConfessions'))
  const FeedEvents = React.lazy(() => import('./feed/FeedEvents'))
  const FeedConfessions = React.lazy(() => import('./feed/FeedConfessions'))
  const ImageUploadMobile = React.lazy(() => import('./imageUpload/ImageUploadMobile'))
  const WidgetsChat = React.lazy(() => import('./chat/WidgetsChat'))
  const PostSharingContainer = React.lazy(() => import('./posts/PostSharingContainer'))
  const SearchMobile = React.lazy(() => import('./SearchMobile'))
  const ConfessionSharingContainer = React.lazy(() => import('./confessions/ConfessionSharingContainer'))
  const EventSharingContainer = React.lazy(() => import('./events/EventSharingContainer'))

  //====================================Get the user from the local storage on refresh======================
  useEffect(()=>{
    userFromLocalStorage = localStorage.getItem('user')
    //if there is a user object saved in local storage then set it equal to 'user'
    if (userFromLocalStorage){
      //JSON.parse will convert stringify to JSON
      // setUser(JSON.parse(userFromLocalStorage))
      // console.log(JSON.parse(userFromLocalStorage))
      try {
        
        dispatch(
            {
            type:actionTypes.SET_USER,
            user:JSON.parse(userFromLocalStorage)
            }
          )
        
        
      }
    
    catch (err){
      // alert(err.message)
      setShowSnackbar(true);
      setSnackbarMessage(err.message)
    }
  }

  },[])

//====================================Authorization state listner=========================================
  useEffect(()=>{
    //onAuthStateChanged = listnser to changes in authorization state
    //when user is logged in or logged out or is changed
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
    //if user has logged in 
    if (authUser){
      console.log(authUser)
      //capture the user inside the auth state in the 'setuser' variable
      user_Id = authUser.uid
      //=============survive the refresh================
      //you can only store string items in local storage

      localStorage.setItem('user',JSON.stringify(authUser))


      setUser(authUser)
    }
    // else if user has logged out set user to null
    else{
      setUser(null)
    }

  })
  //===============Add user status as 'online:true' to database as this component loads=====
  user && 

    realtime.ref('.info/connected').on('value',snapshot=>{

        //make user status 'offline  in realtime database if user disconnects
        realtime
        .ref(`/status/${user_Id}`)
        .onDisconnect() // Set up the disconnect hook
        .set('offline') // The value to be set for this key when the client disconnects 
        .then(() => {
          //set firestore's user 'online' key to true
          DataBase.collection('users').doc(user_Id).update({
            online:true,
          },console.log(user_Id+" user offline"))
        })

        //make user status 'online' in realtime database when page component loads 
        realtime.ref(`/status/${user_Id}`).set('online');
      })


  //========================================================================================

},[user,username])
//sign up inside sign in
const handleSignUp= () => {
  setOpen(true)
  setOpenSignIn(false)

}
//close notifications toast
const handleCloseNotif = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setShow(false);
};
//====================================sign in the user=========================================
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .then((result)=>{
      //dispatch user to state management
      dispatch(
          {
          type:actionTypes.SET_USER,
          user:result.user
          }
        );
      localStorage.setItem('user',JSON.stringify(result.user))

    //empty the fields
    setEmail('')
    setPassword('')

    })
    .catch((error) => { 
      // alert(error.message)
      setShowSnackbar(true)
      setSnackbarMessage(error.message)
    })
    //close the model
    setOpenSignIn(false)
    
  }
//====================================sign up the user=========================================
//bug:requires sign in after sign up
  const signUp = (e) => {
    e.preventDefault();
    if(username!==''){
    auth.createUserWithEmailAndPassword(email,password)
    //createUserWithEmailAndPassword will create a user object 
    .then(function(authUser){
        authUser.user.updateProfile({
        //set displayname attribute of user object to username
        displayName:username
      })            
      console.log(authUser+ "result after sign up")
      
      //sign in
      auth.signInWithEmailAndPassword(authUser.user.email,password)
      .then((result)=>{
        //dispatch user to state management
        dispatch(
            {
            type:actionTypes.SET_USER,
            user:result.user
            }
          );
        localStorage.setItem('user',JSON.stringify(result.user))
      })
          //added the newly created user to our firestore database for posts 
          DataBase.collection('users').doc(authUser.user.uid).set({
            email:authUser.user.email,
            displayName:username,
            bio:bio,
            online:true,
            institute:institute,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
           })
           //add the newly created user to realtime db for messages
           realtime
           .ref(`/'users'/${authUser.user.uid}`)
           .set({displayName : username},
            (error) => {
            if (error) {
              // alert(error.message)
              setShowSnackbar(true);
              setSnackbarMessage(error.message)
            } else {
              // alert("User created successfully")
              setShowSnackbar(true)
              setSnackbarMessage("User created successfully.")
            }
        
          })
    setOpen(false)
  })//catch error if data filled is not in the proper format
  .catch((error)=>{
    // alert(error.message)
    setShowSnackbar(true)
    setSnackbarMessage(error.message)
  })
}
else{
  alert("Username cant be empty")
}
}
//===============================================================================================
  return (
    <div className="app">

    <Snackbar
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        open={showSnackbar}
        onClose={()=>{
          setShowSnackbar(false);
          setSnackbarMessage("");
        }}
        key={ "top" +  "center"}
        autoHideDuration={800}
        message={snackbarMessage}
      />

      {/* <Snackbar open={show} autoHideDuration={6000} onClose={handleCloseNotif}>
            <img
              src={logo}
              alt="MyPal-logo"
            />
            <strong>{notification.title}</strong>
            <small>just now</small>
        <Alert onClose={handleCloseNotif}>
              {notification.body}
        </Alert>
      </Snackbar>

      {isTokenFound?(console.log("notifications permission given")):(console.log("notifications permission NOT given"))}
        */}
                                      {/*Modal for sign up*/}
      <Modal  open={open} onClose={()=>{setOpen(false)}}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              {/* <img  className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="ig-logo"/>   */}
            </center>
            <Input style ={{color:'aliceblue'}} placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Input style ={{color:'aliceblue'}} placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input style ={{color:'aliceblue',margin:'10px'}}
            id="standard-adornment-password"
            placeholder="password"
            type={showPassword ? 'text' : 'password'}
            value={password} onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => 
                    setShowPassword(!showPassword )
                  }
                  onMouseDown={(e) => 
                    e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
            <Input style ={{color:'aliceblue'}} placeholder="Add your biography" type="text" value={bio} onChange={(e)=>setBio(e.target.value)}/>
            {/*select institute*/}
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Institute</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={institute}
                onChange={(e)=>{setInstitute(e.target.value)}}
              >
                <MenuItem value={'MIT'}>MIT</MenuItem>
                <MenuItem value={'KMC'}>KMC</MenuItem>
                <MenuItem value={'MSAP'}>MSAP</MenuItem>
                <MenuItem value={'MAHE'}>MAHE</MenuItem>
                {console.log(institute)}
              </Select>
          </FormControl>
            <Button style ={{color:'aliceblue'}} onClick={signUp}>Sign up</Button>
          </form>
        </div>
      </Modal>

                                        {/*Modal for sign in*/}

                                     {/*if user is not logged in then keep sign in modal open*/}
                                     {/*if the user chooses sign up option then close the sign in modal*/}
      <Modal  open={open?false:(!user?true : openSignIn)} onClose={()=>{setOpenSignIn(false)}}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
            <img className="app__headerImage" src={logo} alt="texx-logo"/>
            </center>
            <p style={{margin:'10px'}} >Enter your credentials to Log in to MyPal</p>
            <Input style ={{color:'aliceblue',margin:'10px'}} placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input style ={{color:'aliceblue',margin:'10px'}}
            id="standard-adornment-password"
            placeholder="password"
            type={showPassword ? 'text' : 'password'}
            value={password} onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => 
                    setShowPassword(!showPassword )
                  }
                  onMouseDown={(e) => 
                    e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
            <Button style ={{color:'aliceblue',backgroundColor:'#556AB5'}} onClick={signIn}>Sign In</Button>
            <p style={{margin:'10px'}}>New to MyPal? Sign up</p>
            <Button style ={{color:'aliceblue',backgroundColor:'#556AB5'}} onClick={handleSignUp}>Sign up</Button>
          </form>
        </div>
      </Modal>

                                              {/*header*/}
      <AppBar position="static" className={classes.root} elevation={8}>
          <div className="app__header">
            <div className="app__headerLogo">
              <Router>
                <Link to="/" onClick={()=>window.location.href= '/'}><img className="app__headerImage" src={logo} alt="MyPal-logo"/></Link>
              </Router>
            </div>


                                              {/*serachbar for mobile view*/}
            <div className="app__searchbarMobile">
             
              <Router>
                <Link to="/searchMobile" onClick={()=>window.location.href="/searchMobile"}><SearchIcon style={{color:'aliceblue'}}></SearchIcon></Link>
              </Router>
                {/* <Input style={{color:"aliceblue",fontSize:'small'}} className="app__searchbarMobileInput" type= "text" placeholder="Search Texx"/>
                <SearchIcon style={{color:"aliceblue"}}/> */}
           
            </div>

                                        {/*profile section*/}
              <div className="app__headerProfile">
                <Router><Link><Avatar className="app__headerAvatar" alt={username} src="/static/images/avatar/1.jpg"  onClick={()=>window.location.href='/profile'} /></Link></Router>
                <b><p className="app__headerDisplayName">{user?.displayName}</p></b>
              </div>
          </div>
      </AppBar>                                               
                           {/* if user does not exists then reduce the opacity of the body */}
      <div className={user?'app__body':'app__bodyUserNotLoggedIn' }>
{/* =================================================REACT ROUTER COMES HERE================================================================================= */}
                  
        {/* if user is logged out then show the home page */}
        {!user? (<Home/>):
                (<Router>
                                                                      {/*SpeedDial for mobile view*/}
                    <div className="app__speedDialMobile">
                        <SpeedDiall></SpeedDiall>
                    </div>
                                          {/*sidebar*/}
                    <Sidebar/>
                                            {/*switch*/}
                    <Switch>             
                        <Route exact path="/">
                          <div className="app__feed">
                            {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                            <Suspense fallback={<div><center><CircularProgress disableShrink /></center></div>}>
                             <Feed/>
                            </Suspense>
                          </div>     
                        </Route>                                                                                                               
                        <Route path="/chats/:chatId">
                          <div className="app__chat">
                              {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                              <Suspense fallback={<div><CircularProgress disableShrink /></div>}>
                                <Chat/>
                              </Suspense>
                          </div>
                          </Route>
                        <Route path="/pals/:palId">
                          <div className="app__chat">
                              {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                              <Suspense fallback={<div><CircularProgress disableShrink /></div>}>
                                <UserProfile/>
                              </Suspense>
                          </div>
                        </Route>    
                        <Route path="/profile">
                          <div className="app__profile" >
                            {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                            <Suspense fallback={<div><CircularProgress disableShrink /></div>}>
                                <Profile/>
                            </Suspense>
                          </div>
                        </Route> 
                        <Route path="/createEvent">
                          <div className="app__createEvent" >
                            {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                            <Suspense fallback={<div><CircularProgress disableShrink /></div>}>
                              <CreateEvent/>
                            </Suspense>
                          </div>
                        </Route> 
                        <Route path="/createConfessions">
                          <div className="app__createConfessions" >
                            {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                            <Suspense fallback={<div><CircularProgress disableShrink /></div>}>
                              <CreateConfessions/>
                            </Suspense>
                          </div>
                        </Route> 
                        <Route path="/eventsFeed">
                          <div className="app__eventsFeed" >
                            {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                            <Suspense fallback={<div><CircularProgress disableShrink /></div>}>
                              <FeedEvents/>
                            </Suspense>
                          </div>
                        </Route> 
                        <Route path="/confessionsFeed">
                          <div className="app__confessionsFeed" >
                            {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                            <Suspense fallback={<div><center><CircularProgress disableShrink /></center></div>}>
                              <FeedConfessions/>
                            </Suspense>
                          </div>
                        </Route>
                        <Route path="/ImageUploadMobile">
                          <div className="app__ImageUploadMobile" >
                            {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                            <Suspense fallback={<div><CircularProgress disableShrink /></div>}>
                              <ImageUploadMobile username={user?.displayName}/>
                            </Suspense>
                          </div>
                        </Route>  
                        <Route path="/chatsFeed">
                          <div className="app__chatsFeed" >
                            {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                            <Suspense fallback={<div><CircularProgress disableShrink /></div>}>
                              <center>CHATS</center>
                              <WidgetsChat/>
                            </Suspense>
                          </div>
                        </Route> 
                        <Route path="/share/posts/:postId">
                          <div className="app__sharingPosts" >
                            {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                            <Suspense fallback={<div><CircularProgress disableShrink /></div>}>
                              <PostSharingContainer/>
                            </Suspense>
                          </div>
                        </Route>
                        <Route path="/share/confessions/:confessionId">
                          <div className="app__sharingPosts" >
                            {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                            <Suspense fallback={<div><CircularProgress disableShrink /></div>}>
                              <ConfessionSharingContainer/>
                            </Suspense>
                          </div>
                        </Route>
                        <Route path="/share/events/:eventId">
                          <div className="app__sharingPosts" >
                            {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                            <Suspense fallback={<div><CircularProgress disableShrink /></div>}>
                              <EventSharingContainer/>
                            </Suspense>
                          </div>
                        </Route>
                        <Route path="/searchMobile">
                          <div className="app__searchMobile" >
                            {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                            <Suspense fallback={<div><CircularProgress disableShrink /></div>}>
                              <SearchMobile/>
                            </Suspense>
                          </div>
                        </Route>
                        <Route path="/yourposts/:postId">
                          <div className="app__yourposts" >
                            {/*this component was taking time for loading and in the meantime 'user' object was momentarily unavailable which was throwing an error to fix that i included lazy loading*/}
                            <Suspense fallback={<div><CircularProgress disableShrink /></div>}>
                              <PostSharingContainer/>
                            </Suspense>
                          </div>
                        </Route>  
                    </Switch>

                    {/*widgets*/}
                  <Widgets id={'widget'}/>
                  {/*Bottom Navigation only applicable to mobile screens*/}
                  <BottomNavigationMobile/>
                </Router>)
        }

{/* ======================================================================================================================================================= */}
                                            {/*post upload*/}
                {/*Added a conditional here because when the user is logged out user.displayName does not exists and react freaks out*/}
                {/*this can be a bug for short term as we are just showing the Modal when the user is logged out and the missing imageUpload component will be visible*/}
                {/*but when instead we will show the homepage it wont be a problem*/}
                {user && <ImageUpload username={user.displayName}/>}
       
    </div>
       
    </div>
  );
}

export default App;
