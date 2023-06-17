import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import defaultCoverImage from "../../defaultCoverImage.jpeg";

function CoverPicture(props) {
  const { src: originalCoverPicture, setUser } = props;

  const [preview, setPreview] = useState(null);
  const [picture, setPicture] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const fileInputRef = useRef();

  useEffect(() => {
    const generatePreview = () => {
      setPreview(URL.createObjectURL(picture));
    };

    const removePreview = () => {
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
    };

    if (picture) generatePreview();

    //remove blob from memory to avoid memory leaks
    return () => removePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picture]);

  const getImageSrc = () => {
    console.log({ isEditing, originalCoverPicture });
    if (isEditing) return preview ? preview : defaultCoverImage;
    if (originalCoverPicture) {
      return `${process.env.REACT_APP_SERVER_URL}/${originalCoverPicture}`;
    }
    return defaultCoverImage;
  };

  const addCoverPicture = () => {
    fileInputRef.current.click();
  }

  const uploadPicture = (event) => {
    if (event.target.files[0]) setPicture(event.target.files[0]);
    setIsEditing(true);
  };

  const removePicture = () => {
    setPicture("");
    setIsEditing(true);
  };

  const clearPicture = () => {
    if (picture) {
      // the value field for input type file can only be set as empty string
      fileInputRef.current.value = "";
      setPicture("");
    }
    setIsEditing(false);
  };

  const saveCoverPicture = () => {
    const formdata = new FormData();
    formdata.append("coverPicture", picture);
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
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="h-96 relative">
      <div
        crossOrigin="anonymous"
        style={{
          backgroundImage: `url(${getImageSrc()})`
        }}
        className="h-full w-full bg-center bg-cover rounded-lg"
        alt=""
      />
      <input
        type="file"
        onChange={uploadPicture}
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
      />
      {
        isEditing ? (
          <>
            <button
              className="absolute right-3 bottom-3 px-3 py-2 bg-blue-600/80 rounded-md text-gray-200 text-sm font-extralight w-28"
              onClick={saveCoverPicture}
            >
              Save
            </button>
            <button
              className="absolute right-32 bottom-3 px-3 py-2 bg-gray-600/80 rounded-md text-gray-200 text-sm font-extralight w-28"
              onClick={clearPicture}
            >
              Cancel
            </button>
          </>
        ) :
        originalCoverPicture !== "" ? (
          <button
            className="absolute right-3 bottom-3 px-3 py-2 bg-gray-600 rounded-md text-gray-200 text-sm font-extralight w-40"
            onClick={removePicture}
          >
            Remove cover picture
          </button>
        ) : (
          <button
          className="absolute right-3 bottom-3 px-3 py-2 bg-gray-600 rounded-md text-gray-200 text-sm font-extralight w-40"
          onClick={addCoverPicture}
          >
            Add cover picture
          </button>
        )
      }
    </div>
  );
}

export default CoverPicture;
