import React, { Component } from 'react';
import axios from 'axios';

import Modal from '../Modals'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'

import arrowBackIcon from '../../icons/arrowBack.svg'


export class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            totalPages: 4,
        }
        this.inputs = {
            name: '',
            email: '',
            dateInput: '',
            monthInput: '',
            yearInput: '',
            profilePicture: '',
            coverPicture: '',
            description: '',
            password: ''
        }
    }

    displayModalHeader = () => {
        const {pageNumber, totalPages} = this.state;
        return (
            <div>
                Page {pageNumber} of {totalPages}
            </div>
        )
    }

    displayPage = () => {
        const {pageNumber} = this.state;
        switch(pageNumber) {
            case 1:
                return <Page1 inputs={this.inputs} goToNextPage={this.nextPage}/>
            case 2:
                return <Page2 inputs={this.inputs} goToNextPage={this.nextPage}/>
            case 3:
                return <Page3 inputs={this.inputs} goToNextPage={this.nextPage}/>
            case 4:
                return <Page4 inputs={this.inputs} goToNextPage={this.nextPage}/>
            default:
                return <Page1/>
        }
    }
    nextPage = (inputs) => {
        this.inputs = { ...this.inputs, ...inputs };
        const {pageNumber, totalPages} = this.state;
        if (pageNumber !== totalPages) {
            this.setState ({
                pageNumber: pageNumber + 1
            })
        } else {
            // const { name, email, password } = this.inputs
            // const data = { name, email, password };
            // axios
            //     .post('http://localhost:5000/user/signup', data)
            //     .then(response => {
            //         console.log(response.data);
            //     })
            //     .catch(err => {
            //         console.log(err?.response?.data);
            //     });


            const formData = new FormData();
            Object.keys(this.inputs).forEach(inputField => {
                if (this.inputs[inputField])
                    formData.append(inputField, this.inputs[inputField]);
            });
            const config = {
                /* Content type is a header which indicates what type of data is present in the request body,
                For JSON data the value is 'application/json' which need not be set explicitely.
                For file upload it should be 'multipart/form-data' which needs to be set explicitely */
                headers: { 
                    'Content-Type': 'multipart/form-data'
                }
            };
            console.log(config);
            axios
                .post('http://localhost:5000/user/signup', formData, config)
                .then(response => {
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err.response?.data);
                });
        }
    }

    goToPreviousPage = () => {
        const {pageNumber, totalPages} = this.state;
        if (pageNumber != 1) {
            this.setState ({
                pageNumber: pageNumber - 1
            })
        }
    }
    displayModalButton = () => {
        const {pageNumber, totalPages} = this.state;

        return(
            <div>
                {pageNumber === 1 
                ? <button className='closeModal' onClick={this.props.closeModal}>&times;</button> 
                : <button className='backModal' onClick={this.goToPreviousPage}><img src={arrowBackIcon} className="arrowBackIcon" alt="go back" /></button>}
            </div>       
        );
    }


    render() {
        return (
            <>
                <Modal displayHeading={this.displayModalHeader()} displayButton={this.displayModalButton()}>
                    <div>
                        {this.displayPage()}
                    </div>  
                </Modal>
            </>
        );
    }
}

export default SignUp