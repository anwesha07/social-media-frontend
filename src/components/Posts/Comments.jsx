import axios from "axios";
import React, { useEffect, useState } from "react";

function Comments(props) {
  const { post } = props;
  const [comments, setComments] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState("false");
  const [commentContent, setCommentContent] = useState("");

  const TOKEN = localStorage.getItem("TOKEN");

  useEffect(() => {
    const postId = post._id;
    const config = {
      params: {
        page: pageNumber,
      },
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
    console.log(comments);
    return comments.map((comment, index) => {
      const timestamp = new Date(comment.createdAt);
      const options = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      console.log(timestamp.getFullYear());
      if (timestamp.getFullYear() !== new Date().getFullYear()) {
        options.year = "numeric";
      }
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const time = formatter.format(timestamp);

      console.log(time);
      return (
        <div
          key={index}
          className="flex flex-col border border-slate-700 mx-2 mb-2"
        >
          <div className="flex">
            <div className="mx-2">{comment.author.username}</div>
            <div>{time}</div>
          </div>
          <div className="mx-2">{comment.content}</div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col justify-start">
      <form
        className="flex justify-start items-center"
        onSubmit={submitComment}
      >
        <div className="p-[5px] w-[80%]">
          <input
            type="text"
            className="border-[2px] border-black rounded-[5px] w-[100%] h-[30px] p-[5px]"
            placeholder="Enter your comment here.."
            value={commentContent}
            onChange={(event) => setCommentContent(event.target.value)}
          />
        </div>
        <input
          type="submit"
          value="save"
          className="bg-slate-700 text-white p-[5px] rounded-[5px] ml-[5px] w-[15%]"
        />
      </form>
      <div>
        {displayComments()}
        {hasNextPage ? (
          <button onClick={loadMoreComments}>View more</button>
        ) : null}
      </div>
    </div>
  );
}

export default Comments;
