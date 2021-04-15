import {useState,useEffect} from 'react';
import './App.css';
import {auth} from './firebase'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import Sidebar from './Sidebar';
import Widgets from './Widgets';
import { BrowserRouter as Router } from 'react-router-dom'
import {Route,Switch} from 'react-router-dom'
import Feed from './Feed'
import Chat from './chat/Chat'
import {useStateValue} from '../contexts/StateProvider';
import { actionTypes } from '../contexts/reducer';

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
    backgroundColor:theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
//========================================================================================================
function App() {

  const [{},dispatch] = useStateValue();

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
  //flag to keep track of whether the user has logged in or not (user who's signed in )
  const [user,setUser] = useState(null);

//====================================Authorization state listner=========================================
  useEffect(()=>{
    //onAuthStateChanged = listnser to changes in authorization state
    //when user is logged in or logged out or is changed
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
    //if user has logged in 
    if (authUser){
      console.log(authUser)
      //capture the user inside the auth state in the 'setuser' variable
      //survive the refresh
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
        )
    })
    .catch((error) => { alert(error.message)})
    //close the model
    setOpenSignIn(false)
    //empty the fields
    setEmail('')
    setPassword('')
  }
//====================================sign up the user=========================================
//bug:requires sign in after sign up
  const signUp = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    //createUserWithEmailAndPassword will create a user object 
    .then((authUser)=>{
      return authUser.user.updateProfile({
        //set displayname attribute of user object to username
        displayName:username
      })
    }).then((result)=>{
      dispatch(
          {
          type:actionTypes.SET_USER,
          user:result.user
          }
        )
    })
    .catch((error)=>{alert(error.message)})
    setOpen(false)
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
            <Input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button onClick={signUp}>Sign up</Button>
          </form>
        </div>
      </Modal>

                                        {/*Modal for sign in*/}
      <Modal  open={openSignIn} onClose={()=>{setOpenSignIn(false)}}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img  className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="ig-logo"/>  
            </center>
            <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

                                              {/*header*/}
      <div className="app__header">
          {/* <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="ig-logo"/> */}
          <h1>Texx</h1>

                                            {/*sign up/sign in or log out the user*/}
          { user ?
            //if user is not null(logged in) then give log out button
          <Button onClick={()=>{auth.signOut()}}>Log out</Button>:
            //else null (logged out) then give sign in or sign out button
          <div className="app__loginContainer">
            <Button onClick={()=>{setOpenSignIn(true)}}>Sign In</Button>
            <Button onClick={()=>{setOpen(true)}}>Sign up</Button>
          </div>
          }
      </div>
                                                {/*sidebar*/}
      <div className="app__body">
          <Sidebar/>
{/* =================================================REACT ROUTER COMES HERE================================================================================= */}
              <div className="app__feed">
                <Router>
                    <Switch> 
                        <Route path="/">
                            <Feed/>
                        </Route>                                                                                                            
                        <Route path="/chats/:chatId">
                            <Chat/>
                        </Route>  
                    </Switch>
                </Router>
              </div>   
{/* ======================================================================================================================================================= */}

                              {/*show image upload only if the user is logged in*/}

          {/*\used otional so it won't crash if these is no 'user.displayName' at the start and use 'user' instead */}
          {user?.displayName ?
          //if logged in show image upload button
          (<ImageUpload username={user.displayName}/>):
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
