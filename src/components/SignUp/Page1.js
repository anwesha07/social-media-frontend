import React, {useState, useRef} from 'react'

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
        December: 31
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
    }
    const setEmail = (event) => {
        setEmailInput(event.target.value);
    }
    const setMonth = (event) => {
        setMonthInput(event.target.value);
    }
    const setDate = (event) => {
        setDateInput(event.target.value);
    }
    const setYear = (event) => {
        months.current["February"] = leapYear(event.target.value) ? 29 : 28;
        setYearInput(event.target.value);
    }
    const leapYear = (year) => ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);


    const submitPage = (event) => {
        event.preventDefault();
        props.goToNextPage({username, email, dateInput, monthInput, yearInput});
    }

  return (
    <div>

            <h1>Create your account</h1>
            <form onSubmit={submitPage}>
                <input placeholder='Name' type='text' value={username} onChange={setName} />
                <input placeholder='Email' type='email' value={email} onChange={setEmail} />
                <div>Date of Birth</div>
                <div className='dob'>
                    <div>
                        <div>Month</div>
                        <select name="month" id="month" onChange={setMonth} value={monthInput}>
                            <option></option>
                            {
                                Object.keys(months.current).map((element, index) => 
                                    <option value={index + 1} key={element} >{element}</option>
                                    
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <div>Day</div>
                        <select name="day" id="day" onChange={setDate} value={dateInput}>
                            <option></option>
                            {
                                [ ...Array(months.current[monthName] || 31).keys() ].map( i => <option value={i+1} key={i+1}>{i+1}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <div>Year</div>
                        <select name="year" id="year" onChange={setYear} value={yearInput}>
                            <option></option>
                            {
                                [ ...Array(121).keys() ].map( i => {
                                    const year = currentYear.current - i;
                                    return <option value={year} key={year}>{year}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <input type="submit" disabled={!(monthInput && dateInput && yearInput && username && email)} value="Next"/>
            </form>
        </div>
  )
}

export default Page1