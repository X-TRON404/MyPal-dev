import { Link } from "react-router-dom";
import "./Comment.css";
import { Input, IconButton } from "@material-ui/core";
import ReplyIcon from '@material-ui/icons/Reply'
import SendIcon from "@material-ui/icons/Send";
import { useEffect, useState } from "react";
import { DataBase } from "./firebase";
import { useStateValue } from "../contexts/StateProvider";
import firebase from "firebase";
import { format } from 'timeago.js'

export const Comment = ({commentId, user_id, timeInMillis, username, text, postId}) => {

  //get the user from the provider
  const [{ user }, dispatch] = useStateValue();
  const [showReplyInput, setShowReplyInput] = useState(false)
  //store reply comments for a particular comment 
  const [comments, setComments] = useState([]);
  //store a new reply  to a comment
  const [comment, setComment] = useState("");


  useEffect(() => {
    if (user) {
      DataBase.collection("posts").doc(postId).collection("comments").doc(commentId).collection('replies')
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    //when commentId/user changes or component re-renders fire the code above
  }, [, commentId,user]);

  const postComment = (e) => {
    e.preventDefault();
    //add reply
    DataBase.collection("posts").doc(postId).collection("comments").doc(commentId).collection('replies').add({
      text: comment,
      username: user.displayName,
      user_id: user.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    //clear the input after posting
    setComment("");
    toggleReply();
  };

  const toggleReply = () => {
    setShowReplyInput(!showReplyInput)
  }

  return (
    <div className="post__commentsComment">
      <div className="post__commentsCommentOriginal">
        <div className="post__commentsCommentText">
          <Link className="link__username" to={`/pals/${user_id}`}>
            <strong>{username + ": "}</strong>
          </Link>
          {text}
          <span> {format(timeInMillis)}</span>
        </div>
      <ReplyIcon onClick={toggleReply}/>
      </div>
      <div className="post__commentsCommentReplies">
        {console.log(comments.length,postId,commentId)}
        {comments.map(comment=>(
                <div className="post__commentsCommentReplies__replies">
                  <Link className="link__username" to={`/pals/${comment.user_id}`}>
                    <strong>{comment.username + ": "}</strong>
                  </Link>
                  {comment.text}
                  <span> {format(timeInMillis)}</span>
                </div>
        ))}
      </div>
      {showReplyInput && <form className="post__commentsCommentReplyBox">
            <Input
              style={{ color: "aliceblue" }}
              type="text"
              value={comment}
              color='aliceblue' fullWidth={false} 
              placeholder={`reply to ${username}`}
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
      }
    </div>
  );
};
