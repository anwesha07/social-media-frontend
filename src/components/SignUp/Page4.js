import React, { useState, useEffect } from "react";

function Page4(props) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (confirmPassword && password && password !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
    }
  }, [password, confirmPassword]);

  const setPasswordInput = (event) => {
    setPassword(event.target.value);
  };
  const setConfirmPasswordInput = (event) => {
    setConfirmPassword(event.target.value);
  };

  const submitPage = (event) => {
    event.preventDefault();
    props.goToNextPage({ password });
  };

  const { username, dateInput, monthInput, yearInput, email } = props.inputs;
  return (
    <>
      <h1 className="text-2xl font-normal mb-4">Your Details:</h1>
      <form className="h-full overflow-y-auto mb-5">
        <label htmlFor="username" className="block my-2 font-medium text-sm">
          Name:
        </label>
        <input
          id="username"
          type="text"
          value={username}
          readOnly
          className="w-full h-10 rounded-2xl px-4 mb-2 text-slate-600 focus:outline-none"
        />
        <label htmlFor="dob" className="block my-2 font-medium text-sm">
          Date of Birth:
        </label>
        <input
          id="dob"
          type="text"
          value={`${dateInput}/${monthInput}/ ${yearInput}`}
          readOnly
          className="w-full h-10 rounded-2xl px-4 mb-2 text-slate-600 focus:outline-none"
        />
        <label htmlFor="email" className="block my-2 font-medium text-sm">
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          readOnly
          className="w-full h-10 rounded-2xl px-4 mb-2 text-slate-600 focus:outline-none"
        />

        <h2 className="py-2 font-medium text-lg">Set your password:</h2>
        <label htmlFor="password" className="block my-2 font-medium text-sm">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={setPasswordInput}
          className="w-full h-10 rounded-2xl px-4 mb-2 text-slate-600 focus:outline-none"
        />
        <label
          htmlFor="confirmPassword"
          className="block my-2 font-medium text-sm"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={setConfirmPasswordInput}
          className="w-full h-10 rounded-2xl px-4 mb-2 text-slate-600 focus:outline-none"
        />

        {error ? <div>Password doesnot match with confirm password</div> : null}
      </form>

      <button
        className="border-solid border-2 border-white px-2 py-1 w-20 flex justify-center items-center disabled:text-slate-400  rounded-3xl cursor-pointer disabled:border-slate-400 disabled:opacity-75 disabled:cursor-not-allowed ml-auto"
        disabled={!password || !confirmPassword}
        onClick={submitPage}
      >
        Submit
      </button>
    </>
  );
}

export default Page4;
