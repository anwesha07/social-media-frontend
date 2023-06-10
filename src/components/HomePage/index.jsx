import React, { useState } from "react";
import SignUp from "../SignUp";
import Login from "../Login";
import { Navigate } from "react-router-dom";

function HomePage(props) {
  const [loginModalActive, setLoginModalActive] = useState(false);
  const [signUpModalActive, setSignUpModalActive] = useState(false);

  const handleSignUpModalChange = () => {
    setSignUpModalActive((prevSignUpModalActive) => !prevSignUpModalActive);
  };

  const handleLoginModalChange = () => {
    setLoginModalActive((prevLoginModalActive) => !prevLoginModalActive);
  };

  const { isLoggedIn } = props;
  if (isLoggedIn) {
    return <Navigate to="/timeline" />;
  }

  const showContent = () => {
    if (loginModalActive) return <Login closeModal={handleLoginModalChange} />;
    else if (signUpModalActive)
      return <SignUp closeModal={handleSignUpModalChange} />;
    else
      return (
        <>
          <div className="text-5xl pt-5 font-medium h-[100px]">Tweet Book</div>
          <div className="text-3xl font-normal h-[200px] pt-[20px]">
            Join TweetBook today!
          </div>
          <button
            onClick={handleSignUpModalChange}
            className="border-solid border-2 border-white px-6 py-2 w-full mx-2 my-5 rounded-3xl cursor-pointer bg-white text-black font-bold"
          >
            Create account
          </button>
          <div className="text-xs">Already have an account?</div>
          <button
            onClick={handleLoginModalChange}
            className="border-solid border-2 border-white px-6 py-2 w-full  mx-2 my-2 rounded-3xl cursor-pointer bg-white text-black font-bold"
          >
            Sign in
          </button>
        </>
      );
  };

  return (
    <div className="bg-slate-700 h-screen flex justify-center items-center w-[100vw] md:py-8">
      <div className="bg-black h-full w-full max-w-[480px] md:rounded-2xl text-white px-8 py-8 flex flex-col items-center ">
        {showContent()}
      </div>
    </div>
  );
}

export default HomePage;
