import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

import { UserContext } from "../../App";
import defaultProfilePicture from "../../defaultProfilePicture.svg";

function Sidebar() {
  const { user } = useContext(UserContext);

  const displayPicture = user.profilePicture
    ? `${process.env.REACT_APP_SERVER_URL}/${user.profilePicture}`
    : defaultProfilePicture;

  return (
    <div className="bg-slate-900 text-gray-300 w-[280px] h-[100%] hidden md:block overflow-y-auto px-8 border-r-4 border-r-black/80">
      <div className="flex items-center mt-8 w-[200px] relative px-2 pb-8 after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-[0.5px] after:bg-white">
        <img
          crossOrigin="anonymous"
          className="h-[60px] w-[60px] rounded-sm sidebar-profile-pic"
          src={displayPicture}
          alt={user.username}
        />
        <h2 className="text-white text-xl ml-6 hidden md:block">
          <span className="text-sm">Welcome 👋</span>
          <br />
          {user.username}
        </h2>
      </div>
      <ul className="mt-4">
        <li className="px-2 py-4 hover:bg-slate-700 rounded-lg">
          <Link className="flex items-center" to="/timeline">
            <HomeIcon className="mr-2" />
            <span className="text-medium">Home</span>
          </Link>
        </li>
        <li className="px-2 py-4 hover:bg-slate-700 rounded-lg">
          <Link className="flex items-center" to="/profile">
            <PersonIcon className="mr-2" />
            <span className="text-medium">Profile</span>
          </Link>
        </li>
        <li className="px-2 py-4 hover:bg-slate-700 rounded-lg">
          <Link className="flex items-center" to="/logout">
            <LogoutIcon className="mr-2" />
            <span className="text-medium">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
