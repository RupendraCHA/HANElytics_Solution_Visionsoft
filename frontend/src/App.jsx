import React, { useContext, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";


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
import AssignRoles from './pages/AssignRoles/AssignRoles';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { StoreContext } from './context/StoreContext';



const App = () => {

    const { userRole } = useContext(StoreContext);

    const navigate = useNavigate();

     const CustomCloseIcon = ({ closeToast }) => (
        <span
          onClick={closeToast}
          style={{
            color: "red",
            cursor: "pointer",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        >
          ✖
        </span>
      );
    
      const getWarnToast = (toastText) => {
        return toast.info(`${toastText}`, {
          position: "top-right",
          closeButton: CustomCloseIcon,
          style: {
            fontSize: "16px",
            padding: "8px 12px",
            height: "30px",
            borderRadius: "8px",
            color: "#000",
            backgroundColor: "#ccc395",
            fontWeight: "600",
          },
        });
      };

  useEffect(() => {
    const checkTokenExpiry = () => {
      const expiry = localStorage.getItem("tokenExpiry");

      if (expiry && Date.now() > Number(expiry)) {

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("tokenExpiry");
        getWarnToast("Your session has expired. Please login again.")

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    };

    const interval = setInterval(() => {
      checkTokenExpiry();
    }, 60 * 1000);

    checkTokenExpiry(); // immediate check

    return () => clearInterval(interval);
  }, [navigate]);
  
  return (<>
    <ToastContainer />
    <Routes>
      <Route exact path='/' element={<InitialPage />}></Route>
      <Route exact path='/register' element={
        <>
        <Navbar page="signup"/>
        <SignUp />
        </>
        }></Route>
      <Route exact path='/login' element={<>
        <Navbar page="login"/>
        <Login />
      </>
        }></Route>
      <Route exact path='/home' element={
        <>
        {/* // <Header page="Grant Access"/> */}
        <Home />
        {/* // <Footer/> */}
        </>}></Route>
      <Route exact path='/dataModeling' element={<DataModeling />}></Route>
      {/* <Route exact path='/registration' element={<Registration />}></Route> */}
      <Route exact path='/dashboards' element={<PowerBiDashboard />}></Route>
      <Route exact path='/assignRoles' element={
        <><Header page="Grant Access"/>
        <AssignRoles />
        <Footer/></>
        }></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </>
  )
}

export default App