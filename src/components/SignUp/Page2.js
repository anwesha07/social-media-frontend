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
    <div class="h-[100%] w-[100%] px-2 pt-3">
      <h1 class=" text-2xl font-normal mb-5">Set your Profile picture</h1>
      <div class="border-solid border-2 border-white h-[200px] w-[100%] px-2 pt-3 rounded-2xl">
        <PhotoUpload picture={profilePicture} uploadPhoto={uploadPhoto} />
      </div>
      <h2 class="py-2 mt-4 font-medium">Enter a description:</h2>
      <textarea
        id="description"
        name="description"
        rows="4"
        cols="50"
        value={description}
        onChange={setDescriptionInput}
        class="h-[100px] w-[100%] rounded-2xl mb-[50px] text-slate-600 p-2 text-s focus:outline-none"
      />
      <button
        onClick={goToNextPage}
        class="border-solid border-2 border-white px-2 py-1 w-20 flex justify-center items-center disabled:text-slate-400  rounded-3xl cursor-pointer ml-auto "
      >
        Next
      </button>
    </div>
  );
}

export default Page2;
