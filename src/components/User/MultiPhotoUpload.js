import React, { useState, useRef, useEffect } from "react";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CloseIcon from '@mui/icons-material/Close';

function MultiPhotoUpload(props) {
  const [pictureArray, setPictureArray] = useState([]);
  const [previewArray, setPreviewArray] = useState([]);

  const fileInputRef = useRef();

  //set the blob whenever picture changes
  useEffect(() => {
    if (pictureArray.length > 0) {
      props.uploadPhoto(pictureArray);
      generatePreview();
    }

    //remove blob from memory to avoid memory leaks
    return () => removePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pictureArray]);

  const generatePreview = () => {
    const previews = [];
    pictureArray.forEach((picture) => {
      previews.push(URL.createObjectURL(picture));
    });
    // console.log(pictureArray)
    // const previews = pictureArray.map((picture, index) => {
    //     URL.createObjectURL(picture);
    // });
    setPreviewArray(previews);
    // setPreview(URL.createObjectURL(picture)) //creating a blob and returning its url
  };

  const removePreview = () => {
    if (previewArray.length > 0) {
      previewArray.forEach((preview) => {
        URL.revokeObjectURL(preview); //removing the blob from memory to prevent memory leak
      });
    }
    setPreviewArray([]);
  };

  const onChangePicture = (e) => {
    if (e.target.files) {
      setPictureArray([...pictureArray, ...e.target.files]); //setting the file object in state
      // props.uploadPhoto([...e.target.files]);
    }
  };

  const removePicture = (indexToRemove) => {
    if (pictureArray.length > indexToRemove) {
      //the value field for input type file can only be set as empty string
      // fileInputRef.current.value = '';
      // setPicture('');
      // props.uploadPhoto('');

      setPictureArray(
        pictureArray.filter((picture, index) => index != indexToRemove)
      );
    }
  };

  const handleImageInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative h-40 w-full overflow-y-auto">
      <input
        className="hidden"
        id="pictureInput"
        type="file"
        accept="image/*"
        onChange={onChangePicture}
        ref={fileInputRef}
        multiple
      />
      <div
        className={"cursor-pointer flex justify-center items-center overflow-y-auto ".concat(pictureArray.length !== 0 ? "bg-neutral-300/90 hover:bg-neutral-300 absolute h-9 w-36 flex-row text-sm z-50 top-5 left-3 rounded-lg text-gray-700" : "bg-neutral-500/50 hover:bg-neutral-400/60 h-full w-full rounded-md text-gray-100 flex-col")}
        onClick={handleImageInputClick}
      >
        <AddAPhotoIcon
          fontSize={pictureArray.length !== 0 ? "small" : "large"}
          className={pictureArray.length !== 0 ? "mr-1" : "mb-1"}
        />
        <p>Upload images</p>
      </div>

      {previewArray.length > 0 &&
        previewArray.map((preview, index) => {
          return (
            <div className="w-full relative rounded-md overflow-hidden" key={index}>
              <img className="w-full" src={preview} alt="" />
              <button
                className="bg-neutral-300/90 hover:bg-neutral-300 absolute h-7 w-7 rounded-full top-5 right-3 text-gray-700 flex justify-center items-center"
                onClick={() => {
                  removePicture(index);
                }}
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default MultiPhotoUpload;
