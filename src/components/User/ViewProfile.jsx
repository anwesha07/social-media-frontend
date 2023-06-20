import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import DisplayPosts from "../Posts/DisplayPosts";

import defaultProfilePicture from "../../defaultProfilePicture.svg";
import defaultCoverImage from "../../defaultCoverImage.jpeg";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";

function ViewProfile() {
  const { id } = useParams();
  const TOKEN = localStorage.getItem("TOKEN");

  const [pageNumber, setPageNumber] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const { user: userContext } = useContext(UserContext);
  console.log(userContext);

  // fetching profile details
  useEffect(() => {
    const userConfig = {
      headers: {
        "x-token": TOKEN,
      },
    };
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/user/${id}`, userConfig)
      .then((response) => {
        console.log(response.data.followers);
        if (response.data.followers.includes(userContext._id))
          setIsFollowing(true);
        else setIsFollowing(false);
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [TOKEN, id, userContext, isFollowing]);

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
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/user/${id}/posts`,
        postConfig
      )
      .then((response) => {
        setHasNextPage(response.data.hasNextPage);
        setPosts((posts) => [...posts, ...response.data.posts]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageNumber, TOKEN, id]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
    if (bottom < 1 && hasNextPage) {
      alert("bottom");
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  const getImageSrc = () => {
    if (user.coverPicture) {
      return `${process.env.REACT_APP_SERVER_URL}/${user.coverPicture}`;
    }
    return defaultCoverImage;
  };

  const followUser = () => {
    console.log("following");
    // api call to follow user
    const config = {
      headers: {
        "x-token": TOKEN,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api/user/follow/${user._id}`,
        {},
        config
      )
      .then((res) => {
        console.log(res.data);
        setIsFollowing(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const unfollowUser = () => {
    console.log("unfollowing");
    // api call to unfollow user
    const config = {
      headers: {
        "x-token": TOKEN,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api/user/unfollow/${user._id}`,
        {},
        config
      )
      .then((res) => {
        console.log(res.data);
        setIsFollowing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (user === null) return <h1> Loading ...</h1>;

  return (
    <>
      <div
        className="relative overflow-y-auto h-screen"
        onScroll={handleScroll}
      >
        <div className="h-full w-full px-4 sm:px-8 lg:px-20">
          {/* cover picture */}
          <div className="h-96 relative">
            <div
              crossOrigin="anonymous"
              style={{
                backgroundImage: `url(${getImageSrc()})`,
              }}
              className="h-full w-full bg-center bg-cover rounded-lg"
              alt=""
            />
          </div>
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
            </div>

            <div className="relative flex-1">
              <div className="ml-4 mt-8 w-full">
                <div className="text-5xl text-gray-100 mb-2 flex items-center max-w-[480px] w-3/4 relative">
                  <input
                    value={user.username}
                    readOnly
                    className="bg-transparent w-full focus:outline-none border-b border-b-gray-100 read-only:border-none"
                  />
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
                    value={user.description}
                    readOnly
                    className="bg-transparent w-full focus:outline-none border-b border-b-gray-100 read-only:border-none"
                  />
                </div>
              </div>
              {isFollowing ? (
                <button
                  onClick={unfollowUser}
                  className="absolute right-3 top-6 px-3 py-2 text-gray-300 text-sm bg-blue-600/80 rounded-md flex items-center"
                >
                  <HowToRegIcon fontSize="small" className="mr-1" />
                  Following
                </button>
              ) : (
                <button
                  onClick={followUser}
                  className="absolute right-3 top-6 px-3 py-2 text-gray-300 text-sm bg-gray-950 rounded-md flex items-center"
                >
                  <PersonAddAltIcon fontSize="small" className="mr-1" />
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="pb-20">
          <DisplayPosts
            posts={posts}
            setModifiedPosts={(modifiedPosts) => setPosts(modifiedPosts)}
            postPage="viewProfile"
            user={user}
          />
        </div>
      </div>
    </>
  );
}

export default ViewProfile;
