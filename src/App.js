import {useState,useEffect} from 'react';
import './App.css';
import Post from './Post';
import {DataBase,auth} from './firebase'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import Sidebar from './Sidebar';
import Widgets from './Widgets';

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

  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  //posts array
  const [posts, setPosts] = useState([]);
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

//====================================Post changes listner=========================================
  useEffect(()=>{
  //onSnapshot = listner to changes in posts 
  //everytime the posts change run this code
  //grab the collection 'posts' from the database and order 'docs' in the collection by timestamp
  DataBase.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
    //Now set the  id=doc.id and post=doc.data to the fields in the 'posts' variable that we defined above
    setPosts(snapshot.docs.map(doc =>({id:doc.id,post:doc.data()})))
      })
  },[]);

//====================================sign in the user=========================================
  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .catch((error) => { alert(error.message)})
    //close the model
    setOpenSignIn(false)
    //empty the fields
    setEmail('')
    setPassword('')
  }
//====================================sign up the user=========================================
  const signUp = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    //createUserWithEmailAndPassword will create a user object 
    .then((authUser)=>{
      return authUser.user.updateProfile({
        //set displayname attribute of user object to usename
        displayName:username
      })
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
              <img  className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="ig-logo"/>  
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
          <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="ig-logo"/>

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

                                                  {/*posts*/}
            <div className="app__posts">
            {
              //render only those posts by id who are newly added to the database dont render the entire post list  
            posts.map(({id,post})=>(<Post key={post.id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}></Post>))
              }
            </div>

                                                    {/*top communities*/}

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
