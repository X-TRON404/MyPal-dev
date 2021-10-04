import { Link } from "react-router-dom";
import "./Comment.css";
export const Comment = ({ user_id, username, text }) => {
  return (
    <p className="post__commentsComment">
      <Link className="link__username" to={`/pals/${user_id}`}>
        <strong>{username + ": "}</strong>
      </Link>
      {text}
    </p>
  );
};
