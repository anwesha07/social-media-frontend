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
    <div class="h-[100%] w-[100%] px-2 pt-3">
      <h1 class=" text-2xl font-normal mb-4">Your Details:</h1>
      <form
        onSubmit={submitPage}
        class=" h-[95%] flex flex-col items-start pt-1"
      >
        <label>Name:</label>
        <input
          type="text"
          value={username}
          readOnly
          class="w-[90%] h-[40px] rounded-2xl px-4 mb-4 text-slate-600"
        />
        <label>Date of Birth:</label>
        <input
          type="text"
          value={`${dateInput}/${monthInput}/ ${yearInput}`}
          readOnly
          class="w-[90%] h-[40px] rounded-2xl px-4 mb-4 text-slate-600"
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          readOnly
          class="w-[90%] h-[40px] rounded-2xl px-4 mb-2 text-slate-600"
        />

        <h2 class="py-2 mt-2 font-bold text-xl">Set your password :</h2>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={setPasswordInput}
          class="w-[90%] h-[40px] rounded-2xl px-4 mb-4 text-black"
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={setConfirmPasswordInput}
          class="w-[90%] h-[40px] rounded-2xl px-4 mb-4 text-black"
        />

        {error ? <div>Password doesnot match with confirm password</div> : null}

        <input
          type="submit"
          disabled={!password || !confirmPassword}
          class="border-solid border-2 border-white px-2 py-1 w-20 flex justify-center items-center disabled:border-slate-400 disabled:opacity-75  rounded-3xl cursor-pointer ml-auto "
        />
      </form>
    </div>
  );
}

export default Page4;
