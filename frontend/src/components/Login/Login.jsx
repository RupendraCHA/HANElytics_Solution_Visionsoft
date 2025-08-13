import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./logIn.css";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import Footer from "../Footer/Footer";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { url, setToken, setUsername, setUserRole } = useContext(StoreContext);
  const [isExist, setExist] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [changePassword, setChangePassword] = useState(true);

  const CustomCloseIcon = ({ closeToast }) => (
    <span onClick={closeToast} style={{ color: "red", cursor: "pointer", fontWeight: "bold" }}>
      ✖
    </span>
  );

  const getToast = (msg, type = "info") => {
    toast[type](msg, {
      position: "top-right",
      closeButton: CustomCloseIcon,
      style: {
        fontSize: "16px",
        padding: "8px 12px",
        borderRadius: "8px",
        color: "#000",
        backgroundColor: type === "success" ? "#d4edda" : "#fff",
        fontWeight: "600",
      },
    });
  };
  const getSuccessToast = (toastText) => {
    return toast.success(`${toastText}`, {
      position: "top-right",
      closeButton: CustomCloseIcon,
      style: {
        fontSize: "16px",
        padding: "8px 12px",
        height: "30px",
        borderRadius: "8px",
        color: "#000",
        backgroundColor: "#fff",
        fontWeight: "600",
      },
    });
  };
  const startServer = async () => {
    try {
      const { data } = await axios.get(url);
      if (data.message) {
        getToast("All setup completed, you can login now.", "success");
      } else {
        getToast("Setting up the server, please wait...", "info");
      }
    } catch (error) {
      console.error(error);
      getToast("Server setup failed. Please try again.", "error");
    }
  };

  useEffect(() => {
    startServer();
    const jwtToken = localStorage.getItem("token");
    const expiry = localStorage.getItem("tokenExpiry");

    if (jwtToken && expiry && parseInt(expiry) > Date.now()) {
        navigate("/home");
    } else {
        // Token expired, clear storage
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("tokenExpiry");
    }
}, []);


  const handleInputChange = (e) => {
    setExist(false);
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setExist(false);
    try {
      const { data: res } = await axios.post(`${url}/api/user/login`, data);
      if (res.success) {
        setToken(res.token);
        const expiresIn = 30 * 60 * 1000; // 30 minutes expiry
        const expiryTime = Date.now() + expiresIn;
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", res.name);
        localStorage.setItem("role", res.role);
        localStorage.setItem("email", res.email);
        localStorage.setItem("tokenExpiry", expiryTime.toString());
        localStorage.setItem("isSSOLogin", "true");

        setUsername(res.name);
        setUserRole(res.role);
        getToast(`${res.name} ${res.message}`, "success");
        navigate("/home");
      } else {
        setErrorMsg(res.message);
        setExist(true);
      }
    } catch (error) {
      console.error(error);
      getToast("Login failed. Please try again.", "error");
    }
  };

  const handleForgotPassword = () => setChangePassword(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(`${url}/api/user/updatePassword`, data);
      if (res.success) {
        setChangePassword(true);
        getToast(res.message, "success");
      } else {
        getToast(res.message, "error");
      }
    } catch (error) {
      console.error(error);
      getToast("Error updating password.", "error");
    }
  };

  return (
    <>
      {changePassword && (
        <div className="bg-container-login d-flex justify-content-center align-items-center vh-100">
          <div className="login-page" style={{
              // backgroundColor: "#0787e3",
              backgroundColor: "#fff",
            }}>
            <h4 style={{ fontSize: "18px" }}>HANElytics simplifies predictive insights by turning complex data
              into clear dashboards, intuitive graphs, and structured tables and
              many more.</h4>
          </div>
          <div className="p-4 login-card" style={{
              height: "60vh",
              //  backgroundColor: "#1e66d9",
              backgroundColor: "#fff",
            }}>
            <h2 style={{ textAlign: "center", fontWeight: "600" }}>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" style={{ color: "#000" }}>
                  <strong>Email</strong>
                  <span className="required-mark">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter login address"
                  autoComplete="off"
                  name="email"
                  required
                  className="rounded-0 form-control login-user-input"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" style={{ color: "#000" }}>
                  <strong>Password</strong>
                  <span className="required-mark">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  autoComplete="off"
                  required
                  name="password"
                  className="rounded-0 form-control login-user-input"
                  onChange={handleInputChange}
                />
              </div>
              {isExist === true ? <p className="error-msg">{errorMsg}</p> : ""}
              <button
                className="login btn btn-default border w-100 rounded-0 text-decoration-none"
                style={{ fontWeight: "600", border: "none" }}
                type="submit"
              >
                Login
              </button>
              <div className="forgot-password">
                <span onClick={() => handleForgotPassword(false)}>
                  Forgot Password
                </span>
              </div>
              <p style={{ fontWeight: "bold" }}>Don't have an account?</p>
              <Link
                to="/register"
                className="register bg-warning btn btn-default border w-100 rounded-0 text-decoration-none"
                style={{ fontWeight: "600", opacity: "0.7" }}
              >
                Register
              </Link>
            </form>
            {/* <p>{failed}</p> */}
          </div>
        </div>
      )}
      {!changePassword && (
        <div className="change-password-container">
          <form
            onSubmit={handleUpdatePassword}
            className="change-password-card"
          >
            <div>
              <label htmlFor="email">Your Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                required
                className="change-password"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                required
                className="change-password"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                required
                className="change-password"
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="update-password-button">
              Update Password
            </button>
            <div className="go-to-login">
              <span onClick={() => handleForgotPassword(true)}>
                Go to Login
              </span>
            </div>
          </form>
        </div>
      )}
      <Footer />
    </>
  );
}
export default Login;