import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
import { UserContext } from '../../App';
import defaultProfilePicture from '../../defaultProfilePicture.svg';

function Comments(props) {
  const { post } = props;

  const { user } = useContext(UserContext);

  const [comments, setComments] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState("false");
  const [commentContent, setCommentContent] = useState("");

  const TOKEN = localStorage.getItem("TOKEN");

  const userDisplayPicture = user.profilePicture
    ? `${process.env.REACT_APP_SERVER_URL}/${user.profilePicture}`
    : defaultProfilePicture;

  useEffect(() => {
    const postId = post._id;
    const config = {
      params: {
        page: pageNumber,
      },
      headers: {
        "ngrok-skip-browser-warning": true,
      }
    };
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/post/${postId}/comments`,
        config
      )
      .then((res) => {
        console.log(res.data.comments);
        setComments((comments) => [...comments, ...res.data.comments]);
        setHasNextPage(res.data.hasNextPage);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [pageNumber, post._id]);

  const submitComment = (event) => {
    event.preventDefault();
    if (!commentContent) return;
    const data = { comment: commentContent };
    const config = {
      headers: {
        "x-token": TOKEN,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/api/post/${post._id}/comment`,
        data,
        config
      )
      .then((res) => {
        console.log(res);
        setCommentContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadMoreComments = () => {
    if (hasNextPage) setPageNumber((page) => page + 1);
  };

  const displayComments = () => {
    return comments.map((comment, index) => {
      const timestamp = new Date(comment.createdAt);
      const options = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      if (timestamp.getFullYear() !== new Date().getFullYear()) {
        options.year = "numeric";
      }
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const time = formatter.format(timestamp);

      const commentAuthorDisplayPicture = comment.author.profilePicture
        ? `${process.env.REACT_APP_SERVER_URL}/${comment.author.profilePicture}`
        : defaultProfilePicture

      return (
        <div className="ml-1 flex">
          <img
            src={commentAuthorDisplayPicture}
            className="h-10 w-10 rounded-full mr-1"
            alt={comment.author.username}
          />
          <div
            key={index}
            className="flex flex-col bg-gray-600/80 mx-2 mb-2 text-white rounded-2xl px-4 py-2 w-[fit-content]"
          >

            <div className="flex items-center">
              <p className="mr-2 text-xs">{comment.author.username}</p>
              <p className="text-[0.6rem] text-gray-300">{time}</p>
            </div>
            <div className="mt-1.5 text-sm font-thin">{comment.content}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="flex flex-col justify-start mt-6">
        <form
          className="flex justify-start items-center relative w-full"
          onSubmit={submitComment}
        >
          <img src={userDisplayPicture} className="h-12 w-12 mr-2 rounded-full" alt={user.username} />
          <input
            type="text"
            className="bg-gray-200 rounded-2xl w-full h-9 p-3 focus:outline-none"
            placeholder="Enter your comment here"
            value={commentContent}
            onChange={(event) => setCommentContent(event.target.value)}
          />
          <button
            type="submit"
            disabled={commentContent.length === 0}
            className="text-blue-600/90 disabled:text-neutral-500 absolute right-3"
          >
            <SendIcon />
          </button>
        </form>
        <div className="mt-4">
          {displayComments()}
          {hasNextPage ? (
            <button onClick={loadMoreComments} className="text-gray-400/80 mt-4 text-sm">
              Load more comments
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Comments;
