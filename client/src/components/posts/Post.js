//post component

import React, { useState, useEffect, useRef } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import {
  Button,
  Collapse,
  IconButton,
  Input,
  makeStyles,
  Modal,
  Snackbar,
} from "@material-ui/core";
import { DataBase, realtime } from "../firebase";
import firebase from "firebase";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SendIcon from "@material-ui/icons/Send";
import { useStateValue } from "../../contexts/StateProvider";
import ShareIcon from "@material-ui/icons/Share";
import PostMenu from "./PostMenu";
import { Link } from "react-router-dom";
import { Comment } from "../Comment";

//============================================Comments pop-over styles====================================
const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1),
    backgroundColor: "#363A3E",
    color: "aliceblue",
  },
  snackbar: {
    bottom: 20,
    zIndex: 10000,
  },
}));
//=============================================Modal styles============================================
function getModalStyle() {
  const top = -50;
  const left = -50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

//=======================================================================================================
function Post({ postId, username, user_id, caption, imageUrl, likesCount }) {
  const classes = useStyles();
  //get the user from the provider
  const [{ user }, dispatch] = useStateValue();
  //store comments from the database for a praticular post in an array (GET from DataBase)
  const [comments, setComments] = useState([]);
  //input comment for a post from the user  (POST to DataBase)
  const [comment, setComment] = useState("");
  //to store users in chat list after getting them from the database
  const [chats, setChats] = useState([]);
  //the problem with let here is  it is making everything empty after
  //to store uid and bool for if the user is present in the chat list
  const [chats_array, setChats_array] = useState([]);
  const [isPresent, setIsPresent] = useState(false);
  //for commentsIcon onclick collapse
  const [expanded, setExpanded] = useState(false);
  //for commentsIcon onhover popup
  const [anchorEl, setAnchorEl] = useState(null);
  //number of likes
  const [likeCount, setLikeCount] = useState(likesCount);
  //avatar hover modal
  const [hoverOpen, setHoverOpen] = useState(false);
  //modal styles
  const [modalStyle] = useState(getModalStyle);
  //if like=true or not
  const [like, setLike] = useState(false);
  const [uid, setUid] = useState(user.uid);
  //added to chat notification open/close
  const [show, setShow] = useState(false);
  //like ref
  const likeCountRef = useRef(0);

  //commentsIcon onclick collapse
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //commentsIcon onhover popup
  const open = Boolean(anchorEl);
  //open the popover that we open on hover on commentsIcon
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //close the popover that we open on hover on commentsIcon
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  //open the Avatar modal
  const handleHoverModalOpen = () => {
    setHoverOpen(true);
  };
  //close the Avatar modal
  const handleHoverModalClose = () => {
    setHoverOpen(false);
  };
  //convert to date
  const convertToDate = (timestamp) => {
    // console.log(timestamp)
    let currentDate = firebase.firestore.Timestamp.now();
    // console.log(currentDate)
    let diff = Math.abs(timestamp - currentDate);
    const dateInMillis = diff;
    let date = new Date(dateInMillis).toLocaleTimeString();
    return date.replace(/:\d+ /, " ") + "hrs ago";
  };
  //close notifications toast
  const handleCloseNotif = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShow(false);
  };
  //======================================Post likes to the database===================================================================================
  const postLike = () => {
    const newLikeValue = !like;
    const newLikeCount = like ? likeCount - 1 : likeCount + 1;
    setLike(!like);

    setLikeCount(newLikeCount);
    setLike(newLikeValue);
    DataBase.collection("posts")
      .doc(postId)
      .collection("postLikes")
      .doc(user.uid)
      .set({
        like: newLikeValue,
        username: user.displayName,
        user_id: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => {
        console.log("something wrong happened " + err.message);
      });
  };
  //====================================Get the comments and likes from the database and display=================================================================
  useEffect(() => {
    //if a postId is passed
    if (postId) {
      //get a snapshot listner for 'comments' collection inside the passed 'postId' doc inside the collection 'posts'
      DataBase.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          //set comments to the data inside the doc
          setComments(snapshot.docs.map((doc) => doc.data()));
        });

      //check if the user already liked the doc or not
      setTimeout(() => {
        DataBase.collection("posts")
          .doc(postId)
          .collection("postLikes")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log(doc.data().like);
              setLike(doc.data().like);
              console.log(like + " 1");
              console.log("likedData");
            } else {
              // doc.data() will be undefined in this case
              console.log("Not liked");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }, 500);

      //    grab the docs which have like=true
      setTimeout(() => {
        DataBase.collection("posts")
          .doc(postId)
          .collection("postLikes")
          .where("like", "==", true)
          .get()
          .then((querySnapshot) => {
            setLikeCount(querySnapshot.docs.map((doc) => doc.data()).length);
            console.log(likeCount + " likes count");
            likeCountRef.current = likeCount;
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }, 400);
    }
    //when postId,user changes or page loads fire the code above
  }, [, postId]);
  //========================================================================================================================

  useEffect(() => {
    //Run this function when the post component loads or there are changes in user object or chats object
    //because we want to run this function only after the data from the database has been fetched and the component in which we are mapping this data (Button) that,
    //loads after the component which calls for this function (<Avatar>) is loaded
    // console.log("running AddButton")
    //loop through the object list of 'chats'
    // if the 'chat_user_id' is already present in the chats object, then set the the second dimension true
    //convert each object into an array and loop through it
    let cha = [];
    //to store the return from the function if the user is present in the chat list
    for (const chat of Object.entries(chats)) {
      if (user_id === chat.chat_user_id) {
        // console.log([chat[1].chat_user_id,true])
        // console.log([chat[1].chat_user_id,true][0])
        // first dimension is for uid
        // second dimension is a bool for checking whether the 'chat_user_id' is already present in the chats

        cha.push([chat[1].chat_user_id, true]);
        // console.log("chats_array "+chats_array)
      } else {
        cha.push([chat[1].chat_user_id, false]);
        // console.log("chats_array "+chats_array)
      }
    }
    setChats_array(cha);
    setIsPresent(isPresentInChats(user_id, chats_array));
    // console.log(isPresent)
  }, [, postId, chats, user]);
  //==================================================check whether user is present in the chat list=========================================================================
  const isPresentInChats = (user_id, chats_array) => {
    for (const chat of chats_array) {
      if (chat[0] === user_id) {
        return true;
      }
    }
  };
  //======================================Get the list of users in chatlist===============================================================================
  useEffect(() => {
    if (user) {
      const unsubscribe = DataBase.collection("users")
        .doc(user.uid)
        .collection("chats")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setChats(snapshot.docs.map((doc) => doc.data()));
        });
      return unsubscribe();
    }

    //when postId changes fire the code above
  }, [, user_id, user]);

  //======================================Add the selected user to chats list============================================
  const addToChats = () => {
    //if the document by the user_id already exists then it wont change it
    //if logged in user 'user.uid' == 'user_id' user who wrote the post  then dont add it to chats list
    if (!(user.uid === user_id)) {
      //==============Add user_id to Firestore as well as to Realtime database=======================

      // //===================Add to Firestore============
      // DataBase.collection('users').doc(user.uid).collection('chats').doc(user_id).set({
      //     chat_username:username,
      //     //user id of the user who wrote the post
      //     chat_user_id:user_id,
      //     timestamp:firebase.firestore.FieldValue.serverTimestamp(),

      //     })
      // //add the user1 who added user2 to chatlist of user1 to chatlist of user2
      // //also later write the code to send notification to user2 that he has been added to the chatlist by user1
      // DataBase.collection('users').doc(user_id).collection('chats').doc(user.uid).set({
      //     chat_username:user.displayName,
      //     //user id of the user who wrote the post
      //     chat_user_id:user.uid,
      //     timestamp:firebase.firestore.FieldValue.serverTimestamp(),

      //     })

      //===================Add to Realtime============
      realtime.ref(`/'chats'/${user.uid}/${user_id}`).set(
        {
          chat_username: username,
          //user id of the user who wrote the post
          chat_user_id: user_id,
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
      realtime.ref(`/'chats'/${user_id}/${user.uid}`).set(
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
  };
  //======================================Post comments to the database========================================================================================
  const postComment = (e) => {
    e.preventDefault();
    //add comment to the 'comments' collection of the particular post
    DataBase.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      user_id: user.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    //clear the input after posting
    setComment("");
  };

  //================================================================================================================================================================
  return (
    <div className="post">
      <Snackbar
        className={classes.snackbar}
        open={show}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        onClose={handleCloseNotif}
        message="Added to chats"
      />

      <div className="post__header">
        {/*avatar managed by@material-ui/core*/}
        <div className="post__userProfile">
          <Avatar
            className="post__avatar"
            alt={username}
            src="/static/images/avatar/1.jpg"
            onClick={handleHoverModalOpen}
          />
          <Link to={`/pals/${user_id}`} style={{ textDecoration: "none" }}>
            <h3>{username}</h3>
          </Link>
        </div>
        <Modal
          open={hoverOpen}
          onClose={() => setHoverOpen(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <center>
            <img
              style={{ width: "fit-content" }}
              alt={username}
              src={imageUrl}
            />
          </center>
        </Modal>
        {/*==================================================================================================================================== */}

        {/* {user.uid === user_id && <Button onClick={addToChats}>Add to chats</Button>} */}

        {/*initially when chats array does not exists as it is made after calling the addToChats function  */}
        {/*if the array is empty (initial condition) */}
        {/* {console.log("array length")}
                {console.log((Array.isArray(chats_array) && chats_array.length) === 0 )} */}
        {/* {console.log(chats_array)} */}
        {/*to check whether the user is present in the chats_array*/}

        {
          //to stop react from freaking out when the user is not logged in
          user &&
            //Dont show anything for the post which are written by the user who is logged in
            !(user.uid === user_id) &&
            //when there are no chats (chat array is empty)
            ((Array.isArray(chats_array) && chats_array.length) === 0 ? (
              <Button size="small" onClick={addToChats}>
                Add to chats
              </Button>
            ) : //when there are chats
            //check if the user is present in the chats_array
            isPresent ? (
              //if present
              chats_array.map((chat) => (
                //chat[0] contains the 'uid' of the 'user' who wrote the post
                //find the array element corresponding to the given post
                //this is done by mathcing the 'user_id' from 'posts' to chat_user_id (chat[0])
                //then check bool chat[1] for whether the element is present in an array or not
                //if the element is not present then show <Add to chats> else show <Chat>
                <span id={chat[0]}>
                  {chat[0] == user_id &&
                    (chat[1] ? (
                      <Button size="small" onClick={addToChats}>
                        Add to chats
                      </Button>
                    ) : (
                      <Button size="small">Chat</Button>
                    ))}
                </span>
              ))
            ) : (
              //if not present
              <Button size="small" key={user_id} onClick={addToChats}>
                Add chats
              </Button>
            ))
        }
        {/* {                chats_array.map((chat)=>{
                                    console.log(chat+"chta")
                })
                } */}

        {/*Report or bookmarks Menu*/}
        <PostMenu
          postId={postId}
          postUsername={username}
          postUserId={user_id}
        />

        {/*===========================================================================================================================================*/}
      </div>
      {/* if post doesnt have image then dont show the image*/}
      {imageUrl === "no-image" ? (
        <></>
      ) : (
        <img
          className="post__image"
          src={imageUrl}
          alt={
            username ? username + " " : "--" + " " + caption ? caption : "--"
          }
        />
      )}
      {/*show username in caption only for image posts*/}
      <h4
        className={imageUrl === "no-image" ? "post__text" : "post__textImage"}
      >
        {imageUrl === "no-image" ? (
          <></>
        ) : (
          <strong>{username ? username + ": " : ""}</strong>
        )}
        <span>{" " + caption ? caption : "--"}</span>
      </h4>
      <div className="post__footer">
        <div className="post__likes">
          {/*like icon*/}

          {like ? (
            <Button onClick={postLike}>
              <FavoriteIcon
                fontsize="small"
                cursor="pointer"
                style={{ color: "red" }}
              />
            </Button>
          ) : (
            <Button onClick={postLike}>
              <FavoriteIcon fontsize="small" cursor="pointer" />{" "}
            </Button>
          )}

          {/* <FlipMove> 
                                        {likes.map((id,like)=>
                                            (<p style={{color:'aliceblue'}} id={id}><strong>{user && (user.displayName===like.username?(like.like?(<strong>You{JSON.stringify(like.like)}</strong>):(<strong></strong>)):(like.username))}</strong></p>)
                                        )}
                                </FlipMove> */}
          <p className="post__likesCount" component={"span"}>
            Likes {likeCount}
          </p>
        </div>

        {/*collapse  comments*/}
        {/*Comment icon*/}
        <div className="post__commentsIcon">
          <Button
            onClick={handleExpandClick}
            id="comments-icon"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            disabled={comments.length === 0}
          >
            <ChatBubbleOutlineRoundedIcon
              fontsize="small"
              cursor="pointer"
              aria-expanded={expanded}
              aria-label="show more comments"
            />
          </Button>
          {/*no. of comments*/}
          {comments.length > 0 && (
            <small
              onClick={handleExpandClick}
              className="post__commentsIconCommentsCount"
            >
              {comments.length}
            </small>
          )}
        </div>

        {/*share icon*/}
        <Button
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: document.title,
                  text: caption,
                  url: window.location.href + `share/posts/${postId}`,
                })
                .then(() => console.log("Successful share"))
                .catch((error) => console.log("Error sharing", error));
            } else {
              alert("Web Share API is not supported in your browser.");
            }
          }}
        >
          <ShareIcon fontsize="small" cursor="pointer"></ShareIcon>
        </Button>
      </div>
      {/*display the comments from the database */}
      <div className="post__comments">
        {/*collapse when comments icon is clicked and show all the comments*/}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div className="post_commentWrapper">
            {comments.map((comment) => (
              //here we are accessing the username and text fields of the doc[comment(iterator)] from 'comments' collection of the DataBase
              <Comment
                key={comment.id}
                user_id={comment.user_id}
                username={comment.username}
                text={comment.text}
              />
            ))}
          </div>
        </Collapse>
        {/*if comments icon not clicked and comments are more than zero then show the latest comment*/}
        <div className="post__commentsFirstComment">
          {!expanded && comments.length !== 0 && (
            <Comment
              user_id={comments[0].user_id}
              username={comments[0].username}
              text={comments[0].text}
            />
          )}
        </div>
      </div>
      {/*post the comment to the database*/}
      {
        //if the user is logged in then only show the post comment section
        user && (
          <form className="post__commentBox">
            <Input
              style={{ color: "aliceblue" }}
              className="post__input"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <IconButton
              disabled={!comment}
              variant="contained"
              color="primary"
              type="submit"
              onClick={postComment}
            >
              <SendIcon />
            </IconButton>
          </form>
        )
      }
    </div>
  );
}

export default Post;
