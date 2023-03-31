import React, { useState, useEffect } from 'react'

function Page4(props) {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(false);


  useEffect(()=> {
    if (confirmPassword && password && password !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
    }
  }, [password, confirmPassword]);

  const setPasswordInput = (event) => {
    setPassword(event.target.value);
  }
  const setConfirmPasswordInput = (event) => {
    setConfirmPassword(event.target.value);
  }

  const submitPage = (event) => {
    event.preventDefault();
    props.goToNextPage({password});
  }

  const {username, dateInput, monthInput, yearInput, email} = props.inputs;
  return (
    <div>
      <h1>Your Details:</h1>
      <form onSubmit={submitPage}>

          <label>Name:</label>
          <input type='text' value={username} readOnly/>
          <label>Date of Birth:</label>
          <input type='text' value={`${dateInput}/${monthInput}/ ${yearInput}` } readOnly/>
          <label>Email:</label>
          <input type='email' value={email} readOnly/>
          

          <h2>Set your password</h2>
          <label>Password:</label>
          <input type='password' value={password} onChange={setPasswordInput}/> 
          <label>Confirm Password</label>
          <input type='password' value={confirmPassword} onChange={setConfirmPasswordInput}/>

          {error ? <div>Password doesnot match with confirm password</div> : null}

          <input type='submit' disabled={!password ||!confirmPassword} />
      </form> 
    </div>
  )
}

export default Page4