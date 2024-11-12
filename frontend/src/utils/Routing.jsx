import React from 'react'
import { Route, Routes } from "react-router-dom"
import LandingPage from '../pages/LandingPage'
import AdminDashboard from '../pages/AdminDashboard'
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'
import UserProfile from '../pages/UserProfile'
import TasksPage from '../pages/TasksPage'
import AdminDash from '../pages/AdminDash'

const Routing = () => {
  return (
    <>
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route path="/admindashboard/admin" element={<AdminDash />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/profile/tasks" element={<TasksPage />} />
    </Routes>
  </>
  )
}

export default Routing