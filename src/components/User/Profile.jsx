import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import DisplayPosts from "../Posts/DisplayPosts";

import defaultProfilePicture from "../../defaultProfilePicture.svg";
import EditProfilePicture from "./EditProfilePicture";
import CoverPicture from "./CoverPicture";
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
  const [editProfile, setEditProfile] = useState(false);
  const [username, setUsername] = useState(userContext.username);
  const [description, setDescription] = useState("");

  const usernameRef = useRef(null);

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
          setUser(res.data);
          setUserContext({ ...user, username: res.data.username });
          closeEditProfilePicturePage();
        })
        .catch((error) => {
          console.log(error);
          setUser(user);
        });
    } else {
      usernameRef.current.focus();
    }
    setEditProfile((currentState) => !currentState);
  };

  if (user === null) return <h1> Loading ...</h1>;

  return (
    <>
      <div
        className="relative overflow-y-auto h-screen"
        onScroll={handleScroll}
      >
        <div className="h-full w-full px-4 sm:px-8 lg:px-20">
          <CoverPicture src={user.coverPicture} setUser={setUser} />

          <div className="px-2 flex">
            <div className="h-52 w-52 relative">
              <img
                crossOrigin="anonymous"
                src={
                  user.profilePicture
                    ? `${process.env.REACT_APP_SERVER_URL}/${user.profilePicture}`
                    : defaultProfilePicture
                }
                className="h-48 w-48 rounded-full absolute left-2 -top-16 border-4 border-white"
                alt=""
              />
              <button
                className="absolute top-20 left-2/3 bg-white h-[40px] w-[40px] border-[2px] border-gray-300 flex items-center justify-center rounded-full p-2"
                onClick={handleEditProfilePicture}
              >
                <EditRoundedIcon />
              </button>
            </div>

            <div className="relative flex-1">
              <div className="ml-4 mt-8 w-full">
                <div className="text-5xl text-gray-100 mb-2 flex items-center max-w-[480px] w-3/4 relative">
                  <input
                    ref={usernameRef}
                    value={username}
                    readOnly={!editProfile}
                    onChange={handleUserNameChange}
                    className="bg-transparent w-full focus:outline-none border-b border-b-gray-100 read-only:border-none"
                  />
                  {editProfile && (
                    <EditIcon
                      style={{ fontSize: "2rem" }}
                      className="text-gray-200 mr-2 absolute right-0"
                    />
                  )}
                </div>
                <div>
                  <RssFeedIcon
                    fontSize="small"
                    className="text-gray-300 mr-2"
                  />
                  <button className="text-gray-300 mr-3">{`${user.followers.length} followers`}</button>
                  <button className="text-gray-300">{`${user.following.length} following`}</button>
                </div>
                <div className="font-light mt-8 text-gray-300 flex items-center max-w-[480px] w-3/4 relative">
                  <input
                    value={description}
                    readOnly={!editProfile}
                    onChange={handleDescriptionChange}
                    className="bg-transparent w-full focus:outline-none border-b border-b-gray-100 read-only:border-none"
                  />
                  {editProfile && (
                    <EditIcon
                      style={{ fontSize: "0.9rem" }}
                      className="text-gray-200 mr-2 absolute right-2"
                    />
                  )}
                </div>
              </div>

              {editProfile ? (
                <button
                  onClick={editProfileDetails}
                  className="absolute right-3 top-6 px-3 py-2 text-gray-300 text-sm bg-blue-600/80 rounded-md flex items-center"
                >
                  <CheckIcon fontSize="small" className="mr-1" />
                  Save Details
                </button>
              ) : (
                <button
                  onClick={editProfileDetails}
                  className="absolute right-3 top-6 px-3 py-2 text-gray-300 text-sm bg-gray-950 rounded-md flex items-center"
                >
                  <EditIcon fontSize="small" className="mr-1" />
                  Edit profile
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="pb-20">
          <DisplayPosts
            posts={posts}
            setModifiedPosts={(modifiedPosts) => setPosts(modifiedPosts)}
            postPage="profile"
            user={user}
          />
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
    </>
  );
}

export default Profile;
