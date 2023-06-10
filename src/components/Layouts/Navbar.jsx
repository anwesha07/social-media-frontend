import React, { useState } from "react";

import TweetBookIcon from '../../tweetbook.png';

function Navbar() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="bg-black h-[72px] flex items-center fixed top-0 inset-x-0 z-50 shadow-md">
      <a href="/" className="w-20 md:w-72 flex items-center md:px-8 justify-center md:justify-start">
        <img className="w-9" src={TweetBookIcon} alt="Tweetbook" />
        <h2 className="text-center text-white text-2xl hidden md:block ml-4">TweetBook</h2>
      </a>
      <div className="grow flex px-6 md:px-10 justify-center">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-200 border border-gray-200 rounded-lg focus:outline-none w-[100%] max-w-[540px] h-[30px] p-5 text-base"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value);
          }}
        />
      </div>
    </div>
  )
}

export default Navbar;