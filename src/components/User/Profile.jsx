import React, { useEffect, useState } from "react";
import axios from "axios";

import DisplayPosts from "../Posts/DisplayPosts";
import "./profileStyles.css";

import defaultCoverImage from "../../defaultCoverImage.jpg";
import EditProfile from "./EditProfile";
import gravatar from "gravatar";

function Profile() {
  const TOKEN = localStorage.getItem("TOKEN");

  const [pageNumber, setPageNumber] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [user, setUser] = useState(null);
  const [editProfile, setEditProfile] = useState(false);

  // fetching profile details
  useEffect(() => {
    const userConfig = {
      headers: {
        "x-token": TOKEN,
      },
    };
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/user/me`, userConfig)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [TOKEN]);

  // fetching all posts of the user
  useEffect(() => {
    const postConfig = {
      headers: {
        "x-token": TOKEN,
      },
      params: {
        page: pageNumber,
      },
    };
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/user/me/posts`, postConfig)
      .then((response) => {
        console.log(response.data);
        setHasNextPage(response.data.hasNextPage);
        setPosts((posts) => [...posts, ...response.data.posts]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNumber, TOKEN]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
    if (bottom < 1 && hasNextPage) {
      alert("bottom");
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const closeEditProfilePage = () => {
    setEditProfile(false);
  };

  if (user === null) return <h1> Loading ...</h1>;
  return (
    <div className="profile" onScroll={handleScroll}>
      <div className="profileHeader">
        {user.coverPicture === "" ? (
          <div className="defaultCoverPicture">
            <img crossOrigin="anonymous" src={defaultCoverImage} alt="" />
            <button>Add cover picture</button>
          </div>
        ) : (
          <div className="coverPicture">
            <img
              crossOrigin="anonymous"
              src={`${process.env.REACT_APP_SERVER_URL}/${user.coverPicture}`}
              alt=""
            />
            <button>Edit cover picture</button>
          </div>
        )}

        <div className="profileDetails">
          <div className="profileDetailsLeftContent">
            <img
              crossOrigin="anonymous"
              src={`${process.env.REACT_APP_SERVER_URL}/${user.profilePicture}`}
              alt=""
            />
            <div className="description">{user.description}</div>
          </div>

          <div className="profileDetailsRightContent">
            <div className="userDetails">
              <div className="userName">{user.username}</div>
              <button>{`${user.followers.length} followers`}</button>
              <button>{`${user.following.length} following`}</button>
            </div>

            <div className="editProfile">
              <button onClick={() => setEditProfile(true)}>Edit profile</button>
            </div>
          </div>
        </div>
      </div>
      <div className="lowerProfileContent">
        <div className="posts">
          <DisplayPosts
            posts={posts}
            setModifiedPosts={(modifiedPosts) => setPosts(modifiedPosts)}
            postPage="profile"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
