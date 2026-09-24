import React from 'react'
import { Routes, Route } from 'react-router'
// components
import Navbar from './components/Navbar.jsx'

// pages
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

function App() {
  return (
    <div>
      <Navbar></Navbar>

      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/forgot-password' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/reset-password/:token' element={<ResetPassword></ResetPassword>}></Route>
      </Routes>

    </div>
  )
}

export default App