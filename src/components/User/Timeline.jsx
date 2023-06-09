import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";

import CreateNewPost from "./CreateNewPost";
import "./timelineStyles.css";
import DisplayPosts from "../Posts/DisplayPosts";
import { UserContext } from "../../App";

function Timeline() {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const TOKEN = localStorage.getItem("TOKEN");

  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const postIdSetRef = useRef(new Set());

  useEffect(() => {
    const config = {
      headers: {
        "x-token": TOKEN,
      },
      params: {
        page: pageNumber,
      },
    };
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/user/timeline`, config)
      .then((response) => {
        const newPosts = [];
        console.log(response.data.posts);
        response.data.posts.forEach((post) => {
          // avoid fetching duplicate posts in case new posts are created in between
          if (!postIdSetRef.current.has(post._id)) {
            postIdSetRef.current.add(post._id);
            newPosts.push(post);
          }
        });
        setPosts((posts) => [...posts, ...newPosts]);
        setHasNextPage(response.data.hasNextPage);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNumber, TOKEN]);

  const handleScroll = (e) => {
    console.log({ scrollHeight: e.target.scrollHeight });
    console.log({ scrollTop: e.target.scrollTop });
    console.log({ clientHeight: e.target.clientHeight });
    const bottom =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;
    if (bottom < 1 && hasNextPage) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  return (
    <div className="timeline" onScroll={handleScroll}>
      <CreateNewPost
        addNewPost={(post) => {
          setPosts([post, ...posts]);
        }}
      />
      <DisplayPosts
        posts={posts}
        setModifiedPosts={(modifiedPosts) => setPosts(modifiedPosts)}
        user={user}
      />
    </div>
  );
}

export default Timeline;
