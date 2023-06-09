import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import DisplayPosts from "../Posts/DisplayPosts";
import "./profileStyles.css";

import defaultCoverImage from "../../defaultCoverImage.jpg";
import defaultProfilePicture from "../../defaultProfilePicture.svg";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EditProfilePicture from "./EditProfilePicture";
import EditCoverPicture from "./EditCoverPicture";
import { UserContext } from "../../App";

function Profile() {
  const TOKEN = localStorage.getItem("TOKEN");

  const { user: userContext, setUser: setUserContext } =
    useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [user, setUser] = useState(null);
  const [isEditingProfilePicture, setEditProfilePicture] = useState(false);
  const [isEditingCoverPicture, setEditCoverPicture] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [username, setUsername] = useState(userContext.username);
  const [description, setDescription] = useState("");

  console.log(userContext);

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
        setUsername(response.data.username);
        setDescription(response.data.description);
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

  const closeEditProfilePicturePage = () => {
    setEditProfilePicture(false);
  };

  const handleEditProfilePicture = () => {
    setEditProfilePicture(true);
  };

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const editProfileDetails = () => {
    if (editProfile) {
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("description", description);
      const TOKEN = localStorage.getItem("TOKEN");

      const userConfig = {
        headers: {
          "x-token": TOKEN,
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .put(
          `${process.env.REACT_APP_SERVER_URL}/api/user/me`,
          formdata,
          userConfig
        )
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          setUserContext({ ...user, username: res.data.username });
          closeEditProfilePicturePage();
        })
        .catch((error) => {
          console.log(error);
          setUser(user);
        });
    }
    setEditProfile((currentState) => !currentState);
  };

  if (user === null) return <h1> Loading ...</h1>;
  return (
    <>
      <div className="profile" onScroll={handleScroll}>
        <div className="profileHeader">
          {user.coverPicture === "" ? (
            <div className="defaultCoverPicture">
              <img crossOrigin="anonymous" src={defaultCoverImage} alt="" />
              <button onClick={() => setEditCoverPicture(true)}>
                Add cover picture
              </button>
            </div>
          ) : (
            <div className="coverPicture">
              <img
                crossOrigin="anonymous"
                src={`${process.env.REACT_APP_SERVER_URL}/${user.coverPicture}`}
                alt=""
              />
              <button onClick={() => setEditCoverPicture(true)}>
                Remove cover picture
              </button>
            </div>
          )}

          <div className="profileDetails">
            <div className="profileDetailsLeftContent">
              {user.profilePicture ? (
                <img
                  crossOrigin="anonymous"
                  src={`${process.env.REACT_APP_SERVER_URL}/${user.profilePicture}`}
                  alt=""
                />
              ) : (
                <img
                  crossOrigin="anonymous"
                  src={defaultProfilePicture}
                  alt=""
                />
              )}
              <div className="description">
                <input
                  value={description}
                  readOnly={!editProfile}
                  onChange={handleDescriptionChange}
                />
              </div>
              <button
                className="absolute top-[80px] left-[65%] bg-white h-[40px] w-[40px] border-[2px] border-gray-300 flex items-center justify-center rounded-full p-2"
                onClick={handleEditProfilePicture}
              >
                <EditRoundedIcon />
              </button>
            </div>

            <div className="profileDetailsRightContent">
              <div className="userDetails">
                <div className="userName">
                  <input
                    value={username}
                    readOnly={!editProfile}
                    onChange={handleUserNameChange}
                  />
                </div>
                <button>{`${user.followers.length} followers`}</button>
                <button>{`${user.following.length} following`}</button>
              </div>

              <div className="editProfile">
                <button onClick={editProfileDetails}>
                  {editProfile ? "Save Details" : "Edit profile"}
                </button>
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
              user={user}
            />
          </div>
        </div>
      </div>

      {isEditingProfilePicture ? (
        <EditProfilePicture
          closeEditProfilePicturePage={closeEditProfilePicturePage}
          profilePicture={user.profilePicture}
          user={userContext}
          setUser={setUser}
          setUserContext={setUserContext}
        />
      ) : null}
      {isEditingCoverPicture ? (
        <EditCoverPicture
          closeEditCoverPicture={() => setEditCoverPicture(false)}
          coverPicture={user.coverPicture}
          setUser={setUser}
          setUserContext={setUserContext}
        />
      ) : null}
    </>
  );
}

export default Profile;
