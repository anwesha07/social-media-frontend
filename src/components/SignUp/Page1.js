import React, { useState, useRef } from "react";

function Page1(props) {
  const months = useRef({
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  });

  const currentYear = useRef();
  currentYear.current = new Date().getFullYear();

  const [username, setNameInput] = useState(props.inputs.username);
  const [email, setEmailInput] = useState(props.inputs.email);
  const [monthInput, setMonthInput] = useState(props.inputs.monthInput);
  const [dateInput, setDateInput] = useState(props.inputs.dateInput);
  const [yearInput, setYearInput] = useState(props.inputs.yearInput);

  const monthName = Object.keys(months.current)[monthInput - 1];

  const setName = (event) => {
    setNameInput(event.target.value);
  };
  const setEmail = (event) => {
    setEmailInput(event.target.value);
  };
  const setMonth = (event) => {
    setMonthInput(event.target.value);
  };
  const setDate = (event) => {
    setDateInput(event.target.value);
  };
  const setYear = (event) => {
    months.current["February"] = leapYear(event.target.value) ? 29 : 28;
    setYearInput(event.target.value);
  };
  const leapYear = (year) =>
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

  const submitPage = (event) => {
    event.preventDefault();
    props.goToNextPage({ username, email, dateInput, monthInput, yearInput });
  };

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-normal mb-8">Create your account</h1>
      <form className="flex flex-col items-start grow">
        <input
          placeholder="Name"
          type="text"
          value={username}
          onChange={setName}
          className="w-[100%] h-[40px] rounded-2xl px-4 mb-4 text-black focus:outline-none"
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={setEmail}
          className="w-[100%] h-[40px] rounded-2xl px-4 mb-4 text-black focus:outline-none"
        />
        <p className="py-2 font-medium">Date of Birth:</p>
        <div className="w-[100%] py-2 flex">
          <div className="grow mr-4">
            <div className="text-xs pb-2 pl-1">Month</div>
            <select
              name="month"
              id="month"
              onChange={setMonth}
              value={monthInput}
              className="w-[100%] border-solid border-2 border-white rounded-2xl bg-black h-10 focus:outline-none"
            >
              <option></option>
              {Object.keys(months.current).map((element, index) => (
                <option value={index + 1} key={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>
          <div className="grow mr-4">
            <div className="text-xs pb-2 pl-1">Day</div>
            <select
              name="day"
              id="day"
              onChange={setDate}
              value={dateInput}
              className="w-[100%] border-solid border-2 border-white rounded-2xl bg-black h-10 focus:outline-none"
            >
              <option></option>
              {[...Array(months.current[monthName] || 31).keys()].map((i) => (
                <option value={i + 1} key={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="grow">
            <div className="text-xs pb-2 pl-1">Year</div>
            <select
              name="year"
              id="year"
              onChange={setYear}
              value={yearInput}
              className="w-[100%] border-solid border-2 border-white rounded-2xl bg-black h-10 px-4 focus:outline-none"
            >
              <option></option>
              {[...Array(121).keys()].map((i) => {
                const year = currentYear.current - i;
                return (
                  <option value={year} key={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </form>
      <button
        disabled={!(monthInput && dateInput && yearInput && username && email)}
        className="border-solid border-2 border-white px-2 py-1 w-20 flex justify-center items-center disabled:text-slate-400  rounded-3xl cursor-pointer disabled:border-slate-400 disabled:opacity-75 disabled:cursor-not-allowed ml-auto"
        onClick={submitPage}
      >
        Next
      </button>
    </div>
  );
}

export default Page1;
