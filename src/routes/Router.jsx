import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import TaskAdd from '../components/TaskAdd'
import Loginpage from '../pages/Loginpage'
import Home from '../pages/Homepage'
import RegisterPage from '../pages/Registerpage'
import { UserContext } from '../context/userContext'

  function AppRouter() {
      const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
    <Routes >
      <Route index element={user ? <Home/> : <Navigate to={"/login"}/>} />    
      <Route path='/task' element={<TaskAdd/>} />    
      <Route path='/login' element={user ? <Navigate to="/" /> : <Loginpage/>} />    
      <Route path='/register' element={user ? <Navigate to="/" /> : <RegisterPage/>} />    
    </Routes>
    </BrowserRouter>
  )
}

export default AppRouter