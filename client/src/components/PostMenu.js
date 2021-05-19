import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {DataBase} from './firebase'
import {useStateValue} from '../contexts/StateProvider'
import firebase from 'firebase/app'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper:{
      backgroundColor:'#2E3236',
      color:'aliceblue'
    },
    menuElement:{
      '&:hover': {
        background: "#363A3E",
     },
    }
  }));
  
function PostMenu({postId,postUsername,postUserId}) {
    //get the user from the provider
    const [{user}, dispatch] = useStateValue();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose=()=>{
      setOpen(false)
    };

    const handleReport = (e) => {
        e.preventDefault();
        //add comment to the 'comments' collection of the particular post 
        DataBase.collection('posts').doc(postId).collection('Report').doc(postId).set(
            {
             reportedByUsername:user.displayName,
             reportedById:user.uid,
             reportedPostId:postId,
             reportedPostUsername:postUsername,
             reportedPostUserId:postUserId,
             timestamp:firebase.firestore.FieldValue.serverTimestamp()
            }
        ) 
      setOpen(false);
    };
    const handleBookmark = (e) => {
      e.preventDefault();
      //add comment to the 'comments' collection of the particular post 
      DataBase.collection('users').doc(user.uid).collection('bookmarksPost').doc(postId).set(
          {
           bookmarkPostId:postId,
           bookmarkPostUser:user.uid,
           timestamp:firebase.firestore.FieldValue.serverTimestamp()
          }
      ) 
    setOpen(false);
  };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
    return (
    <div className={classes.root}>
          <MoreVertIcon style={{color:'aliceblue'}}  ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}/>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem style={{color:'#f54242'}}className={classes.menuElement} onClick={handleReport}>Report</MenuItem>
                    <MenuItem className={classes.menuElement} onClick={handleBookmark}>Bookmark</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
  );
}
export default PostMenu
