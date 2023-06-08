import React, { useState, useRef, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";

import axios from "axios";

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
    <div class=" h-[100%] w-[100%] px-2 py-0">
      <div class="flex justify-between items-center h-[50px]">
        <div class="ml-2 text-s font-bold">
          Page {pageNumber} of {totalPages}
        </div>
        <div>
          {pageNumber === 1 ? (
            <button
              className="closeModal"
              onClick={props.closeModal}
              class="px-1 py-1 border-solid border-2 border-white h-[20px] w-[20px] flex items-center justify-center mr-2 rounded-[50%] bg-white text-black font-bold cursor-pointer hover:opacity-75 "
            >
              &times;
            </button>
          ) : (
            <button className="backModal" onClick={goToPreviousPage}>
              {/* <img
                  src={arrowBackIcon}
                  className="arrowBackIcon"
                  alt="go back"
                /> */}
              back
            </button>
          )}
        </div>
      </div>
      <div class="h-[92%] w-[100%]">{displayPage()}</div>
    </div>
  );
}

export default SignUp;
