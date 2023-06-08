import React, { useState } from "react";
import PhotoUpload from "./PhotoUpload";

function Page3(props) {
  const [coverPicture, setCoverPicture] = useState(props.inputs.coverPicture);

  const uploadPhoto = (picture) => {
    setCoverPicture(picture);
  };

  const goToNextPage = () => {
    props.goToNextPage({ coverPicture });
  };

  return (
    <div class="h-[100%] w-[100%] px-2 pt-3">
      <h1 class=" text-2xl font-normal mb-5">Set your Cover picture</h1>
      <div class=" flex flex-col justify-between h-[80%]">
        <div class="border-solid border-2 border-white h-[300px] w-[100%] px-2 pt-3 rounded-2xl bg-slate-700 opacity-75">
          <PhotoUpload picture={coverPicture} uploadPhoto={uploadPhoto} />
        </div>

        <button
          onClick={goToNextPage}
          class="border-solid border-2 border-white px-2 py-1 w-20 flex justify-center items-center disabled:text-slate-400  rounded-3xl cursor-pointer ml-auto "
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Page3;
