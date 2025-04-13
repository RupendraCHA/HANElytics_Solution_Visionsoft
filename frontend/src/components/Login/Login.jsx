import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./logIn.css";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import Footer from "../Footer/Footer";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const { url, setToken, setUsername, token, username, setUserRole } =
    useContext(StoreContext);

    const startTheServer = async () => {
      const response = await axios.get( url);
      console.log(response.data.message)

  }
  useEffect(() => {
      startTheServer()
      const jwtToken = localStorage.getItem("token")
      if (jwtToken) {
          navigate("/home")
      }else {
          navigate("/login")
      }
  },[])

  const handleInputChange = (e) => {
    setExist(false);
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const [isExist, setExist] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [changePassword, setChangePassword] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data)
    setExist(false);
    const response = await axios.post(url + "/api/user/login", data);
    console.log(response.data)

    if (response.data.success) {
      setExist(false);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.name);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("email", response.data.email);

      setUsername(response.data.name);
      setUserRole(response.data.role)
      console.log(response.data.role)
      toast.success(response.data.name + " " + response.data.message);
      navigate("/home");
    } else {
      setErrorMsg(response.data.message);
      setExist(true);
    }
  };

  const handleForgotPassword = (boolValue) => {
    setChangePassword(boolValue);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url + "/api/user/updatePassword", data);
      // navigate("/login")
      if (response.data.success) {
        setChangePassword(true);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  return (
    <>
      {changePassword && (
        <div className="bg-container-login d-flex justify-content-center align-items-center bg-secondary vh-100">
          <div className="login-page" style={{ 
            // backgroundColor: "#0787e3",
            backgroundColor: "#fff",
            }}>
              {/* Explore Our HANElytics AI/ML Solutions */}
            {/* <h4 style={{fontSize: "16px"}}>Explore Our HANElytics AI/ML Solutions</h4> */}
            <h4 style={{fontSize: "22px"}}>HANElytics simplifies predictive insights by turning complex data into clear dashboards, intuitive graphs, and structured tables and many more.</h4>
          </div>
          <div
            className="p-4  login-card"
            style={{ height: "60vh",
              //  backgroundColor: "#1e66d9",
               backgroundColor: "#fff",
              }}
          >
            <h2 style={{ textAlign: "center", fontWeight: "600" }}>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" style={{color: "#000"}}>
                  <strong>Email</strong><span className="required-mark">*</span>
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
                <label htmlFor="password" style={{color: "#000"}}>
                  <strong>Password</strong><span className="required-mark">*</span>
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
                style={{ fontWeight: "600", opacity: "0.7"}}
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
      <Footer/>
    </>
  );
}

export default Login;
