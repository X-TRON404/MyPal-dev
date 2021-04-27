import {useState,useEffect} from 'react';
import './App.css';
import {auth, DataBase} from './firebase'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import Sidebar from './Sidebar';
import Widgets from './Widgets';
import { BrowserRouter as Router ,Link} from 'react-router-dom'
import {Route,Switch} from 'react-router-dom'
import Feed from './Feed'
import Chat from './chat/Chat'
import {useStateValue} from '../contexts/StateProvider';
import { actionTypes } from '../contexts/reducer';
import firebase from 'firebase/app'
import SendMessage from './chat/SendMessage'
//Get material-ui icons
import SidebarOptions from './SidebarOptions'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

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
    width: 400,
    backgroundColor:'#2E3336',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color:'white'
  },
}));
//========================================================================================================
function App() {
  //dispatch for the user
  const [{chatId,chatInput},dispatch] = useStateValue();
  console.log(chatId,chatInput)
  const classes = useStyles();

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
  const [user,setUser] = useState(null);
  //user stored in local storage
  let userFromLocalStorage

//====================================Get the user from the local storage on refresh======================
  useEffect(()=>{

    userFromLocalStorage = localStorage.getItem('user')
    //if there is a user object saved in local storage then set it equal to 'user'
    if (userFromLocalStorage){
      //JSON.parse will convert stringify to JSON
      setUser(JSON.parse(userFromLocalStorage))
      console.log(JSON.parse(userFromLocalStorage))
      try {
        
        dispatch(
            {
            type:actionTypes.SET_USER,
            user:JSON.parse(userFromLocalStorage)
            }
          )
        
        
      }
    
    catch (err){
      alert(err.message)
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
  return () =>{
    //perform cleanup before re-firing the useEffect
    unsubscribe();
  }

},[user,username])
//sign up inside sign in
const handleSignUp= () => {
  setOpen(true)
  setOpenSignIn(false)

}
//====================================sign in the user=========================================
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .then((result)=>{
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
    .catch((error) => { alert(error.message)})
    //close the model
    setOpenSignIn(false)
    
  }
//====================================sign up the user=========================================
//bug:requires sign in after sign up
  const signUp = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    //createUserWithEmailAndPassword will create a user object 
    .then(function(authUser){
        authUser.user.updateProfile({
        //set displayname attribute of user object to username
        displayName:username
      }).then((result)=>{
          console.log(result)
          //added the newly created user to our database
          DataBase.collection('users').doc(authUser.user.uid).set({
            email:authUser.user.email,
            displayName:authUser.user.displayName,
            bio:bio,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
           })
          })
                    })
    .catch((error)=>{alert(error.message+"from dispatch signup")})

    setOpen(false)
  }
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
//===============================================================================================
  return (
    <div className="app">
       
                                      {/*Modal for sign up*/}
      <Modal  open={open} onClose={()=>{setOpen(false)}}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              {/* <img  className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="ig-logo"/>   */}
            </center>
            <Input style ={{color:'aliceblue'}} placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Input style ={{color:'aliceblue'}} placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input style ={{color:'aliceblue'}} placeholder="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Input style ={{color:'aliceblue'}} placeholder="Add your biography" type="text" value={bio} onChange={(e)=>setBio(e.target.value)}/>
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
                TEXX-IMAGE
            </center>
            <p style={{margin:'10px'}} >Enter your credentials to Log in to texx</p>
            <Input style ={{color:'aliceblue',margin:'10px'}} placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input style ={{color:'aliceblue',margin:'10px'}} placeholder="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button style ={{color:'aliceblue',backgroundColor:'#556AB5'}} onClick={signIn}>Sign In</Button>
            <p style={{margin:'10px'}}>New to texx? Sign up</p>
            <Button style ={{color:'aliceblue',backgroundColor:'#556AB5'}} onClick={handleSignUp}>Sign up</Button>
          </form>
        </div>
      </Modal>

                                              {/*header*/}
      <div className="app__header">
          {/* <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="ig-logo"/> */}
          <Router>
            <Link to="/"><h1>Texx</h1></Link>
          </Router>

                                            {/*sign up/sign in or log out the user*/}
          { user ?
            //if user is not null(logged in) then give log out button
          <Button onClick={logout}>Log out</Button>:
            //else null (logged out) then give sign in or sign out button
          <div className="app__loginContainer">
          

          </div>
          }
      </div>
                                                {/*sidebar*/}
                           {/* if user does not exists then reduce the opacity of the body */}
      <div className={user?'app__body':'app__bodyUserNotLoggedIn' }>
        <div className="app__sidebarMobile">
            {/*pass icons as props to SidebarOptions component*/}
            {/*keep i captial of Icon to let react know you are passing a component*/}
            <SidebarOptions active  Icon={HomeIcon}></SidebarOptions>
            <SidebarOptions  Icon={SearchIcon}/>
            <SidebarOptions  Icon={NotificationsNoneIcon}/>
            <SidebarOptions  Icon={MoreHorizIcon}/>
        </div>
        
          <Sidebar/>

{/* =================================================REACT ROUTER COMES HERE================================================================================= */}

                <Router>
                    <Switch>             
                        <Route exact path="/">
                          <div className="app__feed">
                              <Feed/>
                          </div>     
                        </Route>                                                                                                               
                        <Route path="/chats/:chatId">
                          <div className="app__chat">
                              <Chat/>
                          </div>
                          </Route>  
                    </Switch>
                </Router>

{/* ======================================================================================================================================================= */}

                              {/*show image upload only if the user is logged in*/}

          {/*\used otional so it won't crash if these is no 'user.displayName' at the start and use 'user' instead */}
          {user?.displayName ?
          //if logged in show image upload button
          
          (chatInput?(<SendMessage chatId={chatId}/>):(<ImageUpload username={user.displayName}/>)):
          //else show sign in /sign up
          (<Modal  open={openRequired} onClose={()=>{setOpenRequired(false)}}>
            <div style={modalStyle} className={classes.paper}>
              <form className="app__signup">
                <center>
                  <img  className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="ig-logo"/>  
                </center>
                <Button onClick={()=>{setOpenSignIn(true)}}>Sign In</Button>
                <Button onClick={()=>{setOpen(true)}}>Sign up</Button>
              </form>
            </div>
          </Modal>)
            }

                                                {/*widgets*/}
          <Widgets/>
    </div>
       
    </div>
  );
}

export default App;
