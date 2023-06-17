import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SelectSearch from "react-select-search";

import defaultProfilePicture from "../../defaultProfilePicture.svg";
import TweetBookIcon from "../../tweetbook.png";

function Navbar() {
  const [noResults, setNoResults] = useState(false);

  const getProfiles = async (searchInput) => {
    if (searchInput) {
      // api call to feltch the results
      const config = {
        params: {
          name: searchInput,
        },
      };
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/user`,
        config
      );
      if (res.data.length === 0) setNoResults(true);
      return res.data.map((item) => {
        const { _id, ...itemDetails } = item;
        return {
          value: _id,
          name: itemDetails.username,
          profilePicture: itemDetails.profilePicture,
        };
      });
    }
    setNoResults(false);
    return [];
  };

  const renderProfiles = (props, option, _snapshot, className) => {
    return (
      <Link {...props} className={className} to={`profile/${option.value}`}>
        <img
          alt=""
          src={
            option.profilePicture
              ? `${process.env.REACT_APP_SERVER_URL}/${option.profilePicture}`
              : defaultProfilePicture
          }
          className="mr-4 h-10 w-10"
        />
        <p className="capitalize">{option.name}</p>
      </Link>
    );
  };

  return (
    <div className="bg-black h-[72px] flex items-center fixed top-0 inset-x-0 z-50 shadow-md">
      <a
        href="/"
        className="w-20 md:w-72 flex items-center md:px-8 justify-center md:justify-start"
      >
        <img className="w-9" src={TweetBookIcon} alt="Tweetbook" />
        <h2 className="text-center text-white text-2xl hidden md:block ml-4">
          TweetBook
        </h2>
      </a>
      <SelectSearch
        search={true}
        getOptions={getProfiles}
        placeholder="Search"
        debounce={200}
        renderOption={renderProfiles}
        className={{
          container: 'grow px-6 md:px-10 h-12 flex flex-col justify-center relative',
          value: 'flex w-full justify-center items-center h-full',
          input: 'bg-gray-500 text-gray-300 rounded-lg focus:outline-none w-full max-w-[540px] h-full p-5',
          select: 'w-full max-w-[540px] max-h-[400px] overflow-y-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full',
          options: `w-full bg-gray-800 rounded-lg mt-3 ${noResults ? 'p-2' : ''}`,
          row: 'px-2 pb-2',
          option: 'w-full p-2 hover:bg-gray-500 text-gray-300 rounded-lg flex items-center',
        }}
        emptyMessage={noResults && (
          <p className="w-full p-2 text-gray-300 rounded-lg flex items-center">No results to show!</p>
        )}
      />
    </div>
  );
}

export default Navbar;