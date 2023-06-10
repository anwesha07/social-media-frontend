import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from './Navbar';
import Sidebar from './Sidebar';


function BaseLayout() {
  return (
    <>
      <Navbar />
      <div className="flex w-full h-full mt-[72px]">
        <Sidebar />
        {/* render the page here */}
        <div className="grow bg-slate-700 px-1">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default BaseLayout;
