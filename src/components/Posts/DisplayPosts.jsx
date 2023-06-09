import React from "react";
import "./postStyle.css";
import CardLayout from "../Layouts/CardLayout";
import axios from "axios";
import defaultProfilePicture from "../../defaultProfilePicture.svg";
import Comments from "./Comments";

function DisplayPosts(props) {
  const { posts, setModifiedPosts, postPage, user } = props;
  console.log(user);
  const TOKEN = localStorage.getItem("TOKEN");

  const likePost = (likedPost) => {
    console.log("like button pressed!");
    console.log(likedPost);

    const config = {
      headers: {
        "x-token": TOKEN,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api/post/${likedPost._id}/like`,
        {},
        config
      )
      .then((response) => {
        const modifiedPosts = posts.map((post) => {
          if (post._id === likedPost._id) {
            if (response.data.postLiked) {
              post.numOfLikes += 1;
              console.log("post liked!");
            } else {
              post.numOfLikes -= 1;
              console.log("post unliked!");
            }
          }
          return post;
        });
        setModifiedPosts(modifiedPosts);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  const deletePost = (deletedPost) => {
    const config = {
      headers: {
        "x-token": TOKEN,
      },
    };
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_URL}/api/post/${deletedPost._id}`,
        config
      )
      .then((_response) => {
        const modifiedPosts = posts.filter((post) => {
          return post._id !== deletedPost._id;
        });
        setModifiedPosts(modifiedPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProfilePicture = (post) => {
    if (post.author._id === user._id)
      return user.profilePicture
        ? `${process.env.REACT_APP_SERVER_URL}/${user.profilePicture}`
        : defaultProfilePicture;

    return post.author.profilePicture
      ? `${process.env.REACT_APP_SERVER_URL}/${post.author.profilePicture}`
      : defaultProfilePicture;
  };

  const displayPost = (post) => {
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
                    src={`http://localhost:3000/${img}`}
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
            <div className="comment">Comment</div>
          </div>
        </div>
        <div>
          <Comments post={post} />
        </div>
      </>
    );
    // return "hello"
  };

  return (
    <>
      {posts.map((post, index) => (
        <CardLayout key={index}> {displayPost(post)} </CardLayout>
      ))}
    </>
  );
}

export default DisplayPosts;
