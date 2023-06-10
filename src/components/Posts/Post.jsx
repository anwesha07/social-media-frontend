import React, { useState } from "react";
import CardLayout from "../Layouts/CardLayout";
// import axios from "axios";
import defaultProfilePicture from "../../defaultProfilePicture.svg";
import Comments from "./Comments";

function Post(props) {
  const { post, postPage, likePost, deletePost, user } = props;
  // const TOKEN = localStorage.getItem("TOKEN");

  const [showComments, setShowComments] = useState(false);

  const getProfilePicture = (post) => {
    if (post.author._id === user._id)
      return user.profilePicture
        ? `${process.env.REACT_APP_SERVER_URL}/${user.profilePicture}`
        : defaultProfilePicture;

    return post.author.profilePicture
      ? `${process.env.REACT_APP_SERVER_URL}/${post.author.profilePicture}`
      : defaultProfilePicture;
  };

  const displayPost = () => {
    // console.log(post);
    const { description, image, numOfComments, numOfLikes } = post;
    // console.log(image);
    return (
      <>
        <div className="postHeader">
          <div className="postProfilePicture">
            <img crossOrigin="anonymous" src={getProfilePicture(post)} alt="" />
          </div>
          <div className="postUserName">
            {post.author._id === user._id
              ? user.username
              : post.author.username}
          </div>
          {postPage === "profile" ? (
            <div className="deletePost" onClick={() => deletePost(post)}>
              &times;
            </div>
          ) : null}
        </div>
        <hr />
        <div className="postContent">
          <div className="postDescription">{description}</div>

          {image.length > 0 ? (
            <div className="postImages">
              {image.map((img, index) => {
                return (
                  <img
                    crossOrigin="anonymous"
                    src={`${process.env.REACT_APP_SERVER_URL}/${img}`}
                    alt=""
                    key={index}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
        <hr />

        <div className="postFooter">
          <div className="upperFooter">
            {`${numOfLikes} likes, ${numOfComments} comments`}
          </div>
          <div className="lowerFooter">
            <div className="like" onClick={() => likePost(post)}>
              Like
            </div>
            <div
              className="comment cursor-pointer"
              onClick={() => setShowComments((status) => !status)}
            >
              Comment
            </div>
          </div>
        </div>
        <div>{showComments ? <Comments post={post} /> : null}</div>
      </>
    );
  };

  return <CardLayout> {displayPost()} </CardLayout>;
}

export default Post;
