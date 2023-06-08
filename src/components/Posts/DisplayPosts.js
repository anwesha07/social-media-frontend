import React from "react";
import "./postStyle.css";
import CardLayout from "../Layouts/CardLayout";
import axios from "axios";

function DisplayPosts({ posts, setModifiedPosts, postPage }) {
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
      .put(`http://localhost:3000/api/post/${likedPost._id}/like`, {}, config)
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
      .delete(`http://localhost:3000/api/post/${deletedPost._id}`, config)
      .then((response) => {
        const modifiedPosts = posts.filter((post) => {
          if (post._id != deletedPost._id) return post;
        });
        setModifiedPosts(modifiedPosts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const displayPost = (post) => {
    // console.log(post);
    const { description, image, numOfComments, numOfLikes } = post;
    // console.log(image);
    return (
      <>
        <div className="postHeader">
          <div className="postProfilePicture">
            <img
              crossOrigin="anonymous"
              src={`${process.env.REACT_APP_SERVER_URL}/${post.author.profilePicture}`}
              alt=""
            />
          </div>
          <div className="postUserName">{post.author.username}</div>
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
