import React from "react";

function EditProfile(props) {
  return (
    <div>
      <div class="bg-gray-500 fixed top-0 bottom-0 right-0 left-0 opacity-50 pointer-events-auto" />
      <div class="bg-white fixed top-1/2 left-1/2 right-0 bottom-0 transform -translate-x-1/2 -translate-y-1/2 border border-gray-600 rounded-lg h-[80%] w-[700px]">
        <div class="flex justify-between items-center pt-5 px-10 pb-5 h-16">
          <div class="w-[30%] flex justify-center items-center min-w-[100px] text-2xl font-bold">
            Edit profile:
          </div>
          <button
            onClick={props.closeEditProfilePage}
            class="flex justify-center items-center w-[30px] h-[30px] bg-black opacity-75 text-white text-2xl rounded-full cursor-pointer hover:opacity-50"
          >
            &times;
          </button>
        </div>

        <div>
          <div>
            Profile picture:
            <input />
          </div>
          <div>
            Username:
            <input placeholder="Username" id="username" />
          </div>
          <div>
            Description:
            <textarea></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
