import React, { Component } from 'react'
import './style.css'

export class SignUp extends Component {
  render() {
    return (
      <div className='modalPage'>
        <div className='overlay'></div>
        <div className='modal'>
            <header>
                {this.props.displayButton}
                {this.props.displayHeading}
            </header>
            <div>
                {this.props.children}
            </div>
        </div>
      </div>
    )
  }
}

export default SignUp