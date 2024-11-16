import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom'

//Pages
import Login from './components/Login/Login'
import SignUp from './components/Signup/signUp';
import InitialPage from './pages/InitialPage/InitialPage';
import Home from "./pages/Home/Home"
import NotFound from "./components/NotFound/NotFound"


const App = () => {
    return (<>
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<InitialPage />}></Route>
        <Route exact path='/register' element={<SignUp />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/home' element={<Home />}></Route>
        {/*
        <Route exact path='/dataModeling' element={<DataModeling />}></Route>*/}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App