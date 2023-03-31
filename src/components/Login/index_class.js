import React, { Component } from 'react'
import Modal from '../Modals'
import axios from 'axios';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: ''
        }
    }

    handleEmailValue = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePasswordValue = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    submitPage = (event) => {
        event.preventDefault();
        const data = {...this.state};
        console.log(data);
        axios
            .post('http://localhost:3000/api/auth/login', data)
            .then(response => {
                const { email, token, userId, username } = response.data;
                localStorage.setItem('TOKEN', token);
                this.setState({
                    
                })
            })
            .catch(err => {
                console.log(err?.response?.data);
            });
    }

    displayModalButton = () => {
        return(
            <div>
                <button className='closeModal' onClick={this.props.closeModal}>&times;</button>
            </div>       
        );
    }


    render() {
    return (
        <div>
            <Modal displayButton={this.displayModalButton()}>
                <h1>Enter your credentials:</h1>
                <form onSubmit={this.submitPage}>
                    <label>Email:</label>
                    <input type='email' value={this.state.email} onChange={this.handleEmailValue} />
                    <label>Password:</label>
                    <input type='password' value={this.state.password} onChange={this.handlePasswordValue} />

                    <input type='submit' value='Login' disabled={!this.state.email || !this.state.password}/>

                </form>
            </Modal>
        </div>
    )
    }
}

export default Login