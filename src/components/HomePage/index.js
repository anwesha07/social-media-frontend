import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../SignUp';
import Login from '../Login';
import { Navigate } from 'react-router-dom';


function HomePage(props) {
    const [loginModalActive, setLoginModalActive] = useState(false);
    const [signUpModalActive, setSignUpModalActive] = useState(false);

    const handleSignUpModalChange = () => {
        setSignUpModalActive((prevSignUpModalActive) => !prevSignUpModalActive);
    }

    const handleLoginModalChange = () => {
        setLoginModalActive((prevLoginModalActive) => !prevLoginModalActive);
    }

    const {isLoggedIn} = props;
    if (isLoggedIn) {
        return ( <Navigate to='/timeline'/>)
    }

    return (
        <>
        <div className='image'>
            image here
        </div>
        <div>
            <h1>Happening now</h1>
            <h2>Join twitter today</h2>
            <button onClick={handleSignUpModalChange}>Create account</button>
            {signUpModalActive? <SignUp closeModal={handleSignUpModalChange}/> : null}
            
            <h3>Already have an account?</h3>
            <button onClick={handleLoginModalChange}>Sign in</button>
            {loginModalActive? <Login closeModal={handleLoginModalChange}/> : null}

        </div>
        <Link to="/timeline">Go to timeline page</Link>
        </>
    )
}

export default HomePage