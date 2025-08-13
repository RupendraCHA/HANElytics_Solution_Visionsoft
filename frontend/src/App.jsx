import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Pages
import Login from './components/Login/Login';
import SignUp from './components/Signup/signUp';
import InitialPage from './pages/InitialPage/InitialPage';
import Home from "./pages/Home/Home";
import DataModeling from "./pages/DataModelingPage/DataModeling";
import NotFound from "./components/NotFound/NotFound";
import Navbar from './components/Navbar/Navbar';
import PowerBiDashboard from './components/PowerBiDashbords/PowerBiDashbord';
import AssignRoles from './pages/AssignRoles/AssignRoles';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { StoreContext } from './context/StoreContext';

const App = () => {
    const {
        setToken,
        setUsername,
        setUserRole,
    } = useContext(StoreContext);

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
                getWarnToast("Your session has expired. Please login again.");

                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
        };

        const interval = setInterval(() => {
            checkTokenExpiry();
        }, 60 * 1000);

        checkTokenExpiry();

        return () => clearInterval(interval);
    }, [navigate]);

    // ✅ Unified, corrected postMessage receiver
    useEffect(() => {
        const handleTokenReceive = (event) => {
            console.log("Message received in HANElytics-AI-ML-Solutions:", event);

            if (event.origin !== 'http://localhost:3000') {
                console.warn("Invalid origin:", event.origin);
                return;
            }

            const { token, username, email, role } = event.data || {};

            if (token) {
                console.log("✅ Token received via postMessage:", token);
                setToken(token);
                localStorage.setItem("token", token);
                const expiryTime = Date.now() + 30 * 60 * 1000; // 30 min expiry
                localStorage.setItem("tokenExpiry", expiryTime.toString());
            }
            if (username) {
                setUsername(username);
                localStorage.setItem("username", username);
            }
            if (email) {
                localStorage.setItem("email", email);
            }
            if (role) {
                setUserRole(role);
                localStorage.setItem("role", role);
            }

            navigate('/home');
        };

        window.addEventListener('message', handleTokenReceive);
        return () => window.removeEventListener('message', handleTokenReceive);
    }, [navigate, setToken, setUsername, setUserRole]);

    return (
        <>
            <ToastContainer />
            <Routes>
                <Route exact path='/' element={<InitialPage />} />
                <Route exact path='/register' element={
                    <>
                        <Navbar page="signup" />
                        <SignUp />
                    </>
                } />
                <Route exact path='/login' element={
                    <>
                        <Navbar page="login" />
                        <Login />
                    </>
                } />
                <Route exact path='/home' element={<Home />} />
                <Route exact path='/dataModeling' element={<DataModeling />} />
                <Route exact path='/dashboards' element={<PowerBiDashboard />} />
                <Route exact path='/assignRoles' element={
                    <>
                        <Header page="Grant Access" />
                        <AssignRoles />
                        <Footer />
                    </>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default App;
