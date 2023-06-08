import HomePage from "./components/HomePage";
import PageNotFound from "./components/ErrorPage/PageNotFound";
import Timeline from "./components/User/Timeline";
import Profile from "./components/User/Profile";
import PrivateRouteLayout from "./components/Layouts";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Logout from "./components/Logout";
import "./baseCSS.css";

//pandu@bigpanda.com
export const UserContext = React.createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  // on app mount verifying whether the user is logged in or not
  useEffect(() => {
    const TOKEN = localStorage.getItem("TOKEN");
    const config = {
      headers: {
        "x-token": TOKEN,
      },
    };
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/user/verify`, {}, config)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err?.response?.data);
        setIsLoggedIn(false);
      });
  }, []);

  if (isLoggedIn === null) return <h1> Loading ...</h1>;

  return (
    <div className="App">
      <UserContext.Provider value={{ setIsLoggedIn, setUser, user }}>
        <Routes>
          <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} />} />

          <Route
            element={<PrivateRouteLayout isLoggedIn={isLoggedIn} user={user} />}
          >
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
