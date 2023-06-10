import React, { useState, useRef, useEffect } from "react";

import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function PhotoUpload(props) {
  const [picture, setPicture] = useState(props.picture);
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef();

  //set the blob whenever picture changes
  useEffect(() => {
    const generatePreview = () => {
      setPreview(URL.createObjectURL(picture)); //creating a blob and returning its url
    };

    const removePreview = () => {
      if (preview) URL.revokeObjectURL(preview); //removing the blob from memory to prevent memory leak
      setPreview(null);
    };

    if (picture) generatePreview();

    //remove blob from memory to avoid memory leaks
    return () => removePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [picture]);

  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]); //setting the file object in state
      props.uploadPhoto(e.target.files[0]);
    }
  };

  const removePicture = (e) => {
    e.preventDefault();
    if (picture) {
      //the value field for input type file can only be set as empty string
      fileInputRef.current.value = "";
      setPicture("");
      props.uploadPhoto("");
    }
  };

  return (
    <form className="h-full">
      {preview ? (
        <div className="h-full relative flex justify-center items-center">
          <img src={preview} className="max-w-full max-h-full m-auto" alt="" />
          <button
            className="absolute right-0 top-0 h-6 w-6 -translate-y-1/2 translate-x-1/2 bg-white rounded-full text-black flex justify-center items-center z-10"
            onClick={removePicture}
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>
      ) : (
        <label
          htmlFor="photoUpload"
          className="h-full w-full flex flex-col justify-center items-center cursor-pointer"
        >
          <CloudUploadIcon
            style={{ fontSize: "4rem" }}
            className="text-white opacity-60"
          />
          <p className="text-xs font-thin">Click here to upload a picture</p>
        </label>
      )}
      <input
        type="file"
        accept="image/*"
        id="photoUpload"
        onChange={onChangePicture}
        ref={fileInputRef}
        className="hidden"
      />
    </form>
  );
}

export default PhotoUpload;
