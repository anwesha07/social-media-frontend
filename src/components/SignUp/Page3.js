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
    <div className="h-full flex flex-col">
      <div className="flex flex-col items-start grow">
        <h1 className="text-2xl font-normal mb-4">Set your Cover picture</h1>
        <div className=" flex flex-col justify-between w-full">
          <div className="border-solid border-2 border-white h-80 w-full rounded-2xl">
            <PhotoUpload picture={coverPicture} uploadPhoto={uploadPhoto} />
          </div>
        </div>
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

export default Page3;
