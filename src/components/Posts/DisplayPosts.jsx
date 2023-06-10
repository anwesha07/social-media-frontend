import React from "react";
import "./postStyle.css";
import Post from "./Post";
import axios from "axios";

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

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {posts.map((post, index) => (
        <Post
          key={index}
          post={post}
          setModifiedPosts={setModifiedPosts}
          postPage={postPage}
          likePost={likePost}
          deletePost={deletePost}
          user={user}
        />
      ))}
    </div>
  );
}

export default DisplayPosts;
