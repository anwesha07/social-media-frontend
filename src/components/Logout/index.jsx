import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import axios from "axios";

function Logout() {
  // alert("PLogout page")

  const { setIsLoggedIn, setUser } = useContext(UserContext);
  const [loggedOut, setLoggedOut] = useState(null);
  const TOKEN = localStorage.getItem("TOKEN");
  useEffect(() => {
    const config = {
      headers: {
        "x-token": TOKEN,
      },
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/auth/logout`, {}, config)
      .then((response) => {
        console.log(response.data);
        localStorage.removeItem("TOKEN");
        setIsLoggedIn(false);
        setUser(null);
        setLoggedOut(true);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  }, []);

  if (loggedOut === null) return <h1>Logging out user...</h1>;
  else return loggedOut ? <Navigate to="/" /> : <Navigate to="/timeline" />;
}

export default Logout;
