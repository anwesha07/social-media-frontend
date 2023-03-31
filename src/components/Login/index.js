import React , {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../Modals';
import axios from 'axios';

import { UserContext } from '../../App';

function Login(props) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const {setIsLoggedIn, setUser} = useContext(UserContext);



    const handleEmailValue = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordValue = (event) => {
        setPassword(event.target.value);
    }

    const displayModalButton = () => {
        return(
            <div>
                <button className='closeModal' onClick={props.closeModal}>&times;</button>
            </div>       
        );
    }

    const submitPage = (event) => {
        event.preventDefault();
        const data = {email, password};
        console.log(data);
        axios
            .post('http://localhost:3000/api/auth/login', data)
            .then(response => {
                console.log(response.data);
                const user = response.data;
                localStorage.setItem('TOKEN', user.token);
                setIsLoggedIn(true);
                setUser(user);
                navigate('/timeline')
            })
            .catch(err => {
                console.log(err?.response?.data);
            });
    }

    return (
    <div>
        <Modal displayButton={displayModalButton()}>
            <h1>Enter your credentials:</h1>
            <form onSubmit={submitPage}>
                <label>Email:</label>
                <input type='email' value={email} onChange={handleEmailValue} />
                <label>Password:</label>
                <input type='password' value={password} onChange={handlePasswordValue} />

                <input type='submit' value='Login' disabled={!email || !password}/>

            </form>
        </Modal>
    </div>
    )
}

export default Login