import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { UserContext } from "../../App";

function Login(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const { setIsLoggedIn, setUser } = useContext(UserContext);

  const handleEmailValue = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordValue = (event) => {
    setPassword(event.target.value);
  };

  const submitPage = (event) => {
    event.preventDefault();
    const data = { email, password };
    console.log(data);
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, data)
      .then((response) => {
        console.log(response.data);
        const user = response.data;
        localStorage.setItem("TOKEN", user.token);
        setIsLoggedIn(true);
        setUser(user);
        navigate("/timeline");
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  return (
    <div className=" h-[100%] w-[100%] px-2 py-0">
      {/* <Modal displayButton={displayModalButton()}> */}
      <div className="flex justify-between items-center h-[50px]">
        <div className="text-3xl font-normal">Sign In:</div>
        <div>
          <button
            onClick={props.closeModal}
            className="px-1 py-1 border-solid border-2 border-white h-[20px] w-[20px] flex items-center justify-center mr-2 rounded-[50%] bg-white text-black font-bold cursor-pointer hover:opacity-75 "
          >
            &times;
          </button>
        </div>
      </div>
      <form
        onSubmit={submitPage}
        className="h-[95%] flex flex-col items-center pt-8"
      >
        <div className="h-[32%]">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailValue}
            className="w-[90%] h-[40px] rounded-2xl px-4 mb-4 text-slate-700 focus:outline-none"
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordValue}
            className="w-[90%] h-[40px] rounded-2xl px-4 mb-4 text-slate-700 focus:outline-none"
          />
        </div>

        <div className="w-[100%] flex justify-start items-start">
          <input
            type="submit"
            value="Login"
            disabled={!email || !password}
            className="border-solid border-2 border-white px-6 py-2 w-[90%] h-[40px] my-2 rounded-3xl cursor-pointer font-bold hover:opacity-75"
          />
        </div>
      </form>
      {/* </Modal> */}
    </div>
  );
}

export default Login;
