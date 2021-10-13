import { Link } from "react-router-dom";
import "./Comment.css";
import { format } from 'timeago.js'

export const Comment = ({ user_id, username, timeInMillis, text }) => {
  return (
    <div className={'post__commentsWrapper'}>
    <p className='post__commentsComment'>
      <Link className='link__username' to={`/pals/${user_id}`}>
        <strong>{username + ': '}</strong>
      </Link>
      {text}
    </p>
    <span> {format(timeInMillis)}</span>
  </div>
  );
};
