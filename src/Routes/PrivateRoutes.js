import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Timeline from '../components/User/Timeline';
import Profile from '../components/User/Profile';
import PrivateRouteLayout from '../components/Layouts'


function PrivateRoutes() {
  return (
    <Routes>
        <Route element={<PrivateRouteLayout isLoggedIn = {false} />} >
          <Route path='/timeline' element={<Timeline />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
    </Routes>   
  )
}

export default PrivateRoutes