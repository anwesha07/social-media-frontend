import React, { Component } from 'react'

export class page4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            error: false
        }
    }

    setPassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }
    setConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value,
        }, ()=> {
            const {password, confirmPassword} = this.state;
            if (password !== confirmPassword) {
                this.setState({
                    error: true,
                })
            } else {
                this.setState({
                    error: false,
                })
            }
        })
    }

    submitPage = (event) => {
        event.preventDefault();
        const {password} = this.state;
        // if (password !== confirmPassword) {
        //     this.setState({
        //         error: true,
        //         password: '',
        //         confirmPassword: ''
        //     })
        // } else {
        //     this.setState({
        //         error: false,
        //     })
        // }
        this.props.goToNextPage({password});
    }



    render() {
    const {name, dateInput, monthInput, yearInput, email} = this.props.inputs;
    return (
        <div>
        <h1>Your Details:</h1>
        <form onSubmit={this.submitPage}>

            <label>Name:</label>
            <input type='text' value={name} readOnly/>
            <label>Date of Birth:</label>
            <input type='text' value={`${dateInput} ${monthInput}, ${yearInput}` } readOnly/>
            <label>Email:</label>
            <input type='email' value={email} readOnly/>
            

            <h2>Set your password</h2>
            <label>Password:</label>
            <input type='password' value={this.state.password} onChange={this.setPassword}/> 
            <label>Confirm Password</label>
            <input type='password' value={this.state.confirmPassword} onChange={this.setConfirmPassword}/>

            {this.state.error ? <div>Password doesnot match with confirm password</div> : null}

            <input type='submit' disabled={!this.state.password ||!this.state.confirmPassword} />
        </form>



        
        </div>
    )
    }
}

export default page4