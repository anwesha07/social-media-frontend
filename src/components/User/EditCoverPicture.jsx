import React, { useState, useEffect, useRef } from "react";
import defaultCoverImage from "../../defaultCoverImage.jpg";
import axios from "axios";

function EditCoverPicture(props) {
  const {
    coverPicture: coverPicture_prop,
    closeEditCoverPicture,
    setUser,
  } = props;
  const [preview, setPreview] = useState(null);
  const [picture, setPicture] = useState("");
  const [coverPicture, setCoverPicture] = useState(coverPicture_prop);

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

  const imageSrc = () => {
    if (!preview) {
      if (coverPicture) {
        console.log(`${process.env.REACT_APP_SERVER_URL}/${coverPicture}`);
        return `${process.env.REACT_APP_SERVER_URL}/${coverPicture}`;
      } else return `${defaultCoverImage}`;
    } else return preview;
  };

  const uploadPicture = (event) => {
    if (event.target.files[0]) setPicture(event.target.files[0]);
  };

  const removePicture = () => {
    if (picture) {
      //the value field for input type file can only be set as empty string
      fileInputRef.current.value = "";
      setPicture("");
    }
  };

  const saveProfilePicture = () => {
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
      })
      .catch((error) => {
        console.log(error);
      });
    closeEditCoverPicture();
  };

  const deleteProfilePicture = () => {
    setPicture("");
    setCoverPicture("");
  };

  return (
    <div>
      <div className="bg-gray-500 fixed top-0 bottom-0 right-0 left-0 opacity-50 pointer-events-auto" />
      <div className="bg-white fixed top-1/2 left-1/2 right-0 bottom-0 transform -translate-x-1/2 -translate-y-1/2 border border-gray-600 rounded-lg w-[700px] h-[70%">
        <div onClick={closeEditCoverPicture}>&times;</div>
        <div className="h-[300px] w-[500px] p-5 flex flex-col items-start justify-start">
          <img src={imageSrc()} alt="" className="h-[200px] w-[200px]" />
          {coverPicture ? (
            <button onClick={deleteProfilePicture}> Remove picture</button>
          ) : (
            <div>
              <button onClick={removePicture}>&times;</button>
              <input
                type="file"
                onChange={uploadPicture}
                accept="image/*"
                ref={fileInputRef}
              />
            </div>
          )}
        </div>
        <div>
          <button onClick={saveProfilePicture}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditCoverPicture;
