import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

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
    <div className="h-full w-full px-2 flex flex-col">
      <div className="flex justify-between items-center h-12 mb-8">
        <h1 className="text-3xl font-normal">Sign In</h1>
        <button
          className="h-6 w-6 rounded-[50%] flex justify-center items-center bg-white text-black font-bold cursor-pointer hover:opacity-75 text-xl"
          onClick={props.closeModal}
        >
          <CloseIcon fontSize="small" />
        </button>
      </div>
      <form
        className="h-full overflow-y-auto flex flex-col"
        onSubmit={submitPage}
      >
        <div className="grow">
          <label htmlFor="email" className="block my-2 font-medium text-sm">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailValue}
            className="w-full h-10 rounded-2xl px-4 mb-2 text-slate-600 focus:outline-none"
          />
          <label htmlFor="password" className="block my-2 font-medium text-sm">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordValue}
            className="w-full h-10 rounded-2xl px-4 mb-2 text-slate-600 focus:outline-none"
          />
        </div>

        <div className="w-full flex justify-start items-start">
          <input
            type="submit"
            value="Login"
            disabled={!email || !password}
            className="border-solid border-2 border-white w-full h-10 my-2 rounded-3xl cursor-pointer font-bold hover:opacity-75"
          />
        </div>
      </form>
      {/* </Modal> */}
    </div>
  );
}

export default Login;
