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
    <div class="px-2 pt-3 h-[500px]">
      <div class="text-3xl font-normal mb-5">Create your account</div>
      <form
        onSubmit={submitPage}
        class="h-[95%] flex flex-col items-start pt-2"
      >
        <input
          placeholder="Name"
          type="text"
          value={username}
          onChange={setName}
          class="w-[90%] h-[40px] rounded-2xl px-4 mb-4 text-black"
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={setEmail}
          class="w-[90%] h-[40px] rounded-2xl px-4 mb-4 text-black"
        />
        <div class="py-2 mt-4 font-medium">Date of Birth:</div>
        <div class=" w-[100%] h-[250px] px-2 py-2 flex">
          <div>
            <div class="text-xs pb-1">Month</div>
            <select
              name="month"
              id="month"
              onChange={setMonth}
              value={monthInput}
              class="border-solid border-2 border-white rounded-2xl  bg-black mr-4 h-10 px-4"
            >
              <option></option>
              {Object.keys(months.current).map((element, index) => (
                <option value={index + 1} key={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div class="text-xs pb-1 pl-1">Day</div>
            <select
              name="day"
              id="day"
              onChange={setDate}
              value={dateInput}
              class="border-solid border-2 border-white rounded-2xl bg-black mr-4 h-10 px-4"
            >
              <option></option>
              {[...Array(months.current[monthName] || 31).keys()].map((i) => (
                <option value={i + 1} key={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div class="text-xs pb-1 pl-1">Year</div>
            <select
              name="year"
              id="year"
              onChange={setYear}
              value={yearInput}
              class="border-solid border-2 border-white rounded-2xl bg-black h-10 px-4"
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
        <input
          type="submit"
          //   disabled={
          //     !(monthInput && dateInput && yearInput && username && email)
          //   }
          value="Next"
          class="border-solid border-2 border-white px-2 py-1 w-20 flex justify-center items-center disabled:text-slate-400  rounded-3xl cursor-pointer ml-auto disabled:border-slate-400 disabled:opacity-75"
        />
      </form>
    </div>
  );
}

export default Page1;
