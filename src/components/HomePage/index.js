import React from 'react'
import { Link } from 'react-router-dom';
import SignUp from '../SignUp'
import Login from '../Login'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginModalActive: false,
      signUpModalActive: false,
      loggedInUserId: null,
    }
  }
  handleSignUpModalChange = () => {
    const {signUpModalActive} = this.state;
    this.setState ( {
      signUpModalActive: !signUpModalActive
    })
  }
  handleLoginModalChange = () => {
    const {loginModalActive} = this.state;
    this.setState ( {
      loginModalActive: !loginModalActive,
    })
  }
  render() {
    const {signUpModalActive, loginModalActive} = this.state;
    return (
      <>
        <div className='image'>
          image here
        </div>
        <div>
          <h1>Happening now</h1>
          <h2>Join twitter today</h2>
          <button onClick={this.handleSignUpModalChange}>Create account</button>
          {signUpModalActive? <SignUp closeModal={this.handleSignUpModalChange}/> : null}
          
          <h3>Already have an account?</h3>
          <button onClick={this.handleLoginModalChange}>Sign in</button>
          {loginModalActive? <Login closeModal={this.handleLoginModalChange}/> : null}

        </div>
        <Link to="/about">Go to about page</Link>
      </>
    )
  }
}

export default HomePage;