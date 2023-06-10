import React, { useState, useRef, useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { UserContext } from "../../App";

// import Modal from "../Modals";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";

const totalPages = 4;
function SignUp(props) {
  const input = useRef({
    username: "",
    email: "",
    dateInput: "",
    monthInput: "",
    yearInput: "",
    profilePicture: "",
    coverPicture: "",
    description: "",
    password: "",
    dateOfBirth: "",
  });

  const { setIsLoggedIn, setUser } = useContext(UserContext);

  const [pageNumber, setPageNumber] = useState(1);

  const nextPage = (inputs) => {
    input.current = { ...input.current, ...inputs };
    if (pageNumber !== totalPages) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    } else {
      // this is the last page so submitting the form
      const dateOfBirth = `${input.current.dateInput}/${input.current.monthInput}/${input.current.yearInput}`;
      const { monthInput, dateInput, yearInput, ...data } = {
        ...input.current,
        dateOfBirth,
      };

      // creating multipart/form-data to send files
      const formData = new FormData();
      Object.keys(data).forEach((fieldName) => {
        if (data[fieldName]) formData.append(fieldName, data[fieldName]);
      });

      const config = {
        /* Content type is a header which indicates what type of data is present in the request body,
          For JSON data the value is 'application/json' which need not be set explicitely.
          For file upload it should be 'multipart/form-data' which needs to be set explicitely */
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/auth/register`,
          formData,
          config
        )
        .then((response) => {
          console.log(response.data);
          //closing modal
          props.closeModal();
          alert("user account created!");
          const user = response.data;
          localStorage.setItem("TOKEN", user.token);
          setIsLoggedIn(true);
          setUser(user);
          Navigate("/timeline");
        })
        .catch((err) => {
          // optional chaining : err.reponse && err.response.data
          console.log(err.response?.data);
          alert(err.response.data.message);
        });
    }
  };

  const goToPreviousPage = () => {
    if (pageNumber !== 1) {
      setPageNumber((prevPageNumber) => prevPageNumber - 1);
    }
  };

  const displayPage = () => {
    switch (pageNumber) {
      case 1:
        return <Page1 inputs={input.current} goToNextPage={nextPage} />;
      case 2:
        return <Page2 inputs={input.current} goToNextPage={nextPage} />;
      case 3:
        return <Page3 inputs={input.current} goToNextPage={nextPage} />;
      case 4:
        return <Page4 inputs={input.current} goToNextPage={nextPage} />;
      default:
        return <Page1 />;
    }
  };

  return (
    <div className="h-full w-full px-2 flex flex-col">
      <div className="flex justify-between items-center h-[50px] shrink-0">
        <div className="ml-2 text-s font-bold">
          Page {pageNumber} of {totalPages}
        </div>
        <div>
          {pageNumber === 1 ? (
            <button
              className="h-6 w-6 rounded-[50%] flex justify-center items-center bg-white text-black font-bold cursor-pointer hover:opacity-75 text-xl"
              onClick={props.closeModal}
            >
              <CloseIcon fontSize="small" />
            </button>
          ) : (
            <button
              className="h-[24px] w-[24px] rounded-[50%] flex justify-center items-center bg-white text-black font-bold cursor-pointer hover:opacity-75 text-xl"
              onClick={goToPreviousPage}
            >
              <ArrowBackIcon fontSize="small" />
            </button>
          )}
        </div>
      </div>
      <div className="w-full h-full px-2 py-3 flex flex-col flex-1 overflow-y-auto">
        {displayPage()}
      </div>
    </div>
  );
}

export default SignUp;
