import React, {useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import BaseLayout from './BaseLayout';

function PrivateRouteLayout(props) {

  const {isLoggedIn, user} = props;

  useEffect (() => {
    if (!isLoggedIn)
      alert("User is not logged in");
  }, [isLoggedIn]);

  // console.log(props);
  return(
    isLoggedIn ?
     <BaseLayout/>
    : <Navigate to='/'/> );

}

export default PrivateRouteLayout