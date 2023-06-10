import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';

import CardLayout from "../Layouts/CardLayout";
import { UserContext } from "../../App";
import Modal from "../Modals";
import "./createNewPostStyle.css";
import MultiPhotoUpload from "./MultiPhotoUpload";
import defaultProfilePicture from '../../defaultProfilePicture.svg';

function CreateNewPost(props) {
  const [displayModal, setDisplayModal] = useState(false);
  const [createPostText, setCreatePostText] = useState("");
  const [createPostImage, setCreatePostImage] = useState([]);

  const { user } = useContext(UserContext);

  const displayPicture = user.profilePicture
    ? `${process.env.REACT_APP_SERVER_URL}/${user.profilePicture}`
    : defaultProfilePicture;

  useEffect(() => {
    setCreatePostImage("");
    setCreatePostText("");
  }, [displayModal]);

  const createPostModalFunc = () => {
    setDisplayModal(true);
  };

  const displayModalButton = () => {
    return (
      <button className="bg-neutral-600 hover:bg-neutral-500 rounded-full h-7 w-7 flex justify-center items-center" onClick={() => setDisplayModal(false)}>
        <CloseIcon fontSize="small" />
      </button>
    );
  };
  const displayModalHeader = () => {
    return "Create Post";
  };

  const uploadPhoto = (pictureArray) => {
    // console.log(pictureArray);
    setCreatePostImage([...pictureArray]);
  };

  const modalContents = () => {
    return (
      <>
        <div className="flex items-center">
          <img
            crossOrigin="anonymous"
            src={displayPicture}
            className="h-10 w-10 mr-2 rounded-full"
            alt=""
          />
          <div className="text-white text-sm">
            {user.username}
          </div>
        </div>
        <textarea
          id="newPostText"
          className="overflow-y-auto w-full h-24 bg-transparent text-small text-gray-400 focus:outline-none mt-4"
          name="newPostText"
          placeholder={`What's on your mind, ${user.username.split(' ')[0]}?`}
          value={createPostText}
          onChange={(event) => {
            setCreatePostText(event.target.value);
          }}
        />
        <div className="relative mt-6"
        >
          {/* <label className='innerImageInput'> */}
          <MultiPhotoUpload picture={""} uploadPhoto={uploadPhoto} />
          {/* </label> */}
        </div>
        <button
          className="w-full h-10 bg-blue-500 disabled:bg-neutral-600 rounded-lg text-md text-white mt-4 disabled:cursor-not-allowed"
          disabled={createPostText.length === 0}
          onClick={sendPost}
        >
          Post
        </button>
      </>
    );
  };

  const sendPost = () => {
    console.log(createPostImage);
    const token = localStorage.getItem("TOKEN");
    const formData = new FormData();
    formData.append("description", createPostText);

    if (createPostImage.length > 0) {
      createPostImage.forEach((imageObj) => {
        // console.log(imageObj);
        formData.append("images", imageObj);
      });
    }

    const config = {
      headers: {
        "x-token": token,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/post`, formData, config)
      .then((response) => {
        //closing modal
        setDisplayModal(false);
        alert("new Post created!");
        console.log(response.data);
        const newPost = {
          ...response.data,
          numOfLikes: 0,
          numOfComments: 0,
          author: {
            _id: user._id,
            username: user.username,
            profilePicture: user.profilePicture,
          },
        };
        props.addNewPost(newPost);
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
  };

  return (
    <>
      <CardLayout>
        <div className="flex items-center">
          <img
            crossOrigin="anonymous"
            src={displayPicture}
            className="h-14 w-14 rounded-full"
            alt=""
          />
          <div className="bg-gray-200 rounded-[20px] w-full h-12 max-w-[450px] p-4 m-2 ml-4 flex items-center" onClick={createPostModalFunc}>
            What's on your mind?
          </div>
        </div>
      </CardLayout>
      {displayModal ? (
        <Modal
          displayHeading={displayModalHeader()}
          displayButton={displayModalButton()}
        >
          {modalContents()}
        </Modal>
      ) : null}
    </>
  );
}

export default CreateNewPost;
