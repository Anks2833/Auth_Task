import React from 'react'
import { Route, Routes } from "react-router-dom"
import LandingPage from '../pages/LandingPage'
import AdminDashboard from '../pages/AdminDashboard'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import UserProfile from '../pages/UserProfile'

const Routing = () => {
  return (
    <>
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<UserProfile />} />

    </Routes>
  </>
  )
}

export default Routing