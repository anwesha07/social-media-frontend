import React, { Component } from 'react'

export class Page1 extends Component {
    constructor(props) {
        super(props);
        this.months = {
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
        }
        this.state = {
            name: this.props.inputs.name,
            email: this.props.inputs.email,
            monthInput: this.props.inputs.monthInput,
            dateInput: this.props.inputs.dateInput,
            yearInput: this.props.inputs.yearInput,
        }
        this.currentYear = new Date().getFullYear()
    }
    setName = (event) => {
        this.setState({
            name: event.target.value,
        })
    }
    setEmail = (event) => {
        this.setState({
            email: event.target.value,
        })
    }
    setMonth = (event) => {
        this.setState({
            monthInput: event.target.value,
        })
    }
    setDate = (event) => {
        this.setState({
            dateInput: event.target.value
        })
    }
    setYear = (event) => {
        this.months["February"] = this.leapYear(event.target.value) ? 29 : 28;
        this.setState({ yearInput: event.target.value });
    }

    leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    submitPage = (event) => {
        event.preventDefault();
        const {dateInput, monthInput, yearInput, name, email } = this.state;
        // const dob = `${dateInput} ${monthInput}, ${yearInput}`;
        this.props.goToNextPage({name, email, dateInput, monthInput, yearInput});
    }


    render() {
    const {name, email, monthInput, dateInput, yearInput} = this.state;
    return (
        <div>

            <h1>Create your account</h1>
            <form onSubmit={this.submitPage}>
                <input placeholder='Name' type='text' value={name} onChange={this.setName} />
                <input placeholder='Email' type='email' value={email} onChange={this.setEmail} />
                <div>Date of Birth</div>
                <div className='dob'>
                    <div>
                        <div>Month</div>
                        <select name="month" id="month" onChange={this.setMonth} value={monthInput}>
                            <option></option>
                            {
                                Object.keys(this.months).map(element => 
                                    <option value={element} key={element} >{element}</option>
                                    
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <div>Day</div>
                        <select name="day" id="day" onChange={this.setDate} value={dateInput}>
                            <option></option>
                            {
                                [ ...Array(this.months[monthInput] || 31).keys() ].map( i => <option value={i+1} key={i+1}>{i+1}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <div>Year</div>
                        <select name="year" id="year" onChange={this.setYear} value={yearInput}>
                            <option></option>
                            {
                                [ ...Array(121).keys() ].map( i => {
                                    const year = this.currentYear-i;
                                    return <option value={year} key={year}>{year}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <input type="submit" disabled={!(monthInput && dateInput && yearInput && name && email)} value="Next"/>
            </form>
        </div>
    )
    }
}

export default Page1