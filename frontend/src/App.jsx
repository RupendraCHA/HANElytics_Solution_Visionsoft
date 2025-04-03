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
import DataModeling from "./pages/DataModelingPage/DataModeling"
import NotFound from "./components/NotFound/NotFound"
import Registration from './components/Registration/Registration';
import Navbar from './components/Navbar/Navbar';
import PowerBiDashboard from './components/PowerBiDashbords/PowerBiDashbord';



const App = () => {
  return (<>
    <ToastContainer />
    <Routes>
      <Route exact path='/' element={<InitialPage />}></Route>
      <Route exact path='/register' element={<SignUp />}></Route>
      <Route exact path='/login' element={<Login />}></Route>
      <Route exact path='/home' element={<Home />}></Route>
      <Route exact path='/dataModeling' element={<DataModeling />}></Route>
      {/* <Route exact path='/registration' element={<Registration />}></Route> */}
      <Route exact path='/dashboards' element={<PowerBiDashboard />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </>
  )
}

export default App