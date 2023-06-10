import React, { useState } from "react";

import PhotoUpload from "./PhotoUpload";

function Page2(props) {
  const [profilePicture, setProfilePicture] = useState(
    props.inputs.profilePicture
  );
  const [description, setDescription] = useState(props.inputs.description);

  const uploadPhoto = (picture) => {
    setProfilePicture(picture);
  };
  const setDescriptionInput = (event) => {
    setDescription(event.target.value);
  };

  const goToNextPage = () => {
    props.goToNextPage({ profilePicture, description });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col items-start grow">
        <h1 className="text-2xl font-normal mb-4">Set your Profile picture</h1>
        <div className="border-solid border-2 border-white h-[200px] w-[100%] rounded-2xl mb-4">
          <PhotoUpload picture={profilePicture} uploadPhoto={uploadPhoto} />
        </div>
        <p className="py-2 font-medium">Enter a description:</p>
        <textarea
          id="description"
          name="description"
          rows="4"
          cols="50"
          value={description}
          onChange={setDescriptionInput}
          className="h-24 w-full rounded-2xl text-slate-600 p-2 text-s focus:outline-none"
        />
      </div>
      <button
        onClick={goToNextPage}
        className="border-solid border-2 border-white px-2 py-1 w-20 flex justify-center items-center disabled:text-slate-400  rounded-3xl cursor-pointer disabled:border-slate-400 disabled:opacity-75 disabled:cursor-not-allowed ml-auto"
      >
        Next
      </button>
    </div>
  );
}

export default Page2;
