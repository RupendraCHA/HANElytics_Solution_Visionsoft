import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signIn.css";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

function SignUp() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    bussinessName: "",
    contact: "",
    email: "",
    password: "",
    city: "",
    street: "",
    state: "",
    country: "",
    zipcode: "",
  });
  const navigate = useNavigate();

  const [isExist, setExist] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [existedEmail, accessEmail] = useState("");
  const [isClickedRegister, setRegisterClick] = useState(true);
  const [responseCode, setResponseCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [codeError, setCodeError] = useState(false);

  const { url, setToken, setUsername } = useContext(StoreContext);

  const handleInputChange = (e) => {
    setExist(false);
    const name = e.target.name;
    const value = e.target.value;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setExist(false);
    // console.log(data)

    const response = await axios.post(url + "/api/user/register", data);

    if (response.data.success) {
      setExist(false);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.firstname);
      setResponseCode(response.data.verificationCode);
      // console.log(response.data.verificationCode)
      setUsername(response.data.firstname);
      setRegisterClick(false);
      // navigate("/home")
    } else {
      setErrorMsg(response.data.message);
      accessEmail(response.data.email);
      setExist(true);
    }
  };

  const storeVerificationCode = (e) => {
    setInputCode(e.target.value);
    setCodeError(false);
  };

  const handleEmailVerification = async (responseCode) => {
    // setRegisterClick(true)
    if (inputCode === "") {
      setCodeError(true);
    } else {
      const response = await axios.post(url + "/api/user/verifyemail", {
        responseCode,
      });
      if (response.data.success === true) {
        toast.success(`${data.firstname} ${response.data.message}`);
        navigate("/login");
      } else {
        toast.error(`${response.data.message}`);
      }
    }
  };

  // Hanelytics

  return (
    <>
      <Navbar />
      {isClickedRegister && (
        <div className="bg-container-signup">
          <div className="register-card-container">
            <div className="register-card">
              <h2 className="register-heading">
                Sign Up now and get Instant access to AI/ML Insights
              </h2>
              <a href="https://ap-south-1nmrg96rqu.auth.ap-south-1.amazoncognito.com/login?client_id=1esfsaanp9ncgms41753687pd8&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fdoi-demo-52o9.onrender.com%2Fhome">
                Sign In Using Cognito
              </a>
              <form onSubmit={handleSubmit}>
                <div className="register-input-container">
                  <div className="register-input-label">
                    <label htmlFor="firstname">
                      <strong>FIRSTNAME</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Firstname: Sachin"
                      autoComplete="off"
                      required
                      name="firstname"
                      className="firstname"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="register-input-label">
                    <label htmlFor="lastname">
                      <strong>LASTNAME</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Lastname: Tendulkar"
                      autoComplete="off"
                      required
                      name="lastname"
                      className=""
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="register-input-container">
                  <div className="register-input-label">
                    <label htmlFor="bussinessName">
                      <strong>ORGANIZATION NAME</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Bussiness Name"
                      autoComplete="off"
                      required
                      name="bussinessName"
                      className=""
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="register-input-label">
                    <label htmlFor="contact">
                      <strong>CONTACT NUMBER</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Contact Number"
                      autoComplete="off"
                      required
                      name="contact"
                      className=""
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="register-input-label">
                  <label htmlFor="email">
                    <strong>EMAIL</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="email address: example@gmail.com"
                    autoComplete="off"
                    required
                    name="email"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="register-input-label">
                  <label htmlFor="password">
                    <strong>PASSWORD</strong>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    autoComplete="off"
                    required
                    name="password"
                    onChange={handleInputChange}
                  />
                </div>
                <h3>Bussiness Address Information</h3>
                <div className="register-input-container">
                  <div className="register-input-label">
                    <label htmlFor="city">
                      <strong>CITY</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Type city name: Miami"
                      autoComplete="off"
                      required
                      name="city"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="register-input-label">
                    <label htmlFor="street">
                      <strong>STREET</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Type Street info: The Roads"
                      autoComplete="off"
                      required
                      name="street"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="register-input-container">
                  <div className="register-input-label">
                    <label htmlFor="state">
                      <strong>STATE</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter state name: Florida"
                      autoComplete="off"
                      required
                      name="state"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="register-input-label">
                    <label htmlFor="country">
                      <strong>COUNTRY</strong>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter country name: USA"
                      autoComplete="off"
                      required
                      name="country"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="register-input-label">
                  <label htmlFor="zipcode">
                    <strong>ZIPCODE</strong>
                  </label>
                  <input
                    type="text"
                    placeholder="Type zipcode: 33129"
                    autoComplete="off"
                    required
                    name="zipcode"
                    onChange={handleInputChange}
                  />
                </div>

                {isExist === true ? (
                  <p className="error-msg">
                    <span>{existedEmail}</span>
                    {errorMsg}
                  </p>
                ) : (
                  ""
                )}
                <div className="checkbox-container">
                  <input type="checkbox" required className="checkbox" />
                  <p>I accept terms & conditions.</p>
                </div>

                <div>
                  <button type="submit" className="button-to-register">
                    Register
                  </button>
                </div>
              </form>
            </div>
            <div className="login-details">
              <p>Already have an account?</p>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {!isClickedRegister && (
        <div className="verify-card-container">
          <div className="verify-card">
            <div>
              Hey, {data.firstname} {data.lastname}
            </div>
            <h1>
              Code has been sent to your email address, Verify Your Email
              Address by entering it below
            </h1>
            <input
              type="text"
              placeholder="Enter your verification code"
              onChange={storeVerificationCode}
            />
            {codeError && <p className="code-error">*Enter Correct Code</p>}
            <button onClick={() => handleEmailVerification(responseCode)}>
              Verify
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;
