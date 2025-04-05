import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signIn.css";
import Navbar from "../Navbar/Navbar";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import Footer from "../Footer/Footer";

function SignUp() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    bussinessName: "",
    contact: "",
    role: "",
    position: "",
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
  const [openNextPage, setOpenNextPage] = useState(false)

  const { url, setToken, setUsername } = useContext(StoreContext);

  // useEffect(() => {
  //   const response = "http://localhost:3001"
  //   // const response = "https://hanelytics-solution-visionsoft.onrender.com"
  //   console.log(response.data)
  // }, [])

  const startTheServer = async () => {
    const response = await axios.get(url);
    console.log(response.data.message)

}
useEffect(() => {
    startTheServer()
    const jwtToken = localStorage.getItem("token")
    if (jwtToken) {
        navigate("/home")
    }else {
        navigate("/register")
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setExist(false);
    console.log(data)

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

  const handleNextRegisterPage = () => {
    if (openNextPage === true) {
      setOpenNextPage(false)
      setExist(false)
    }else {
      setOpenNextPage(true)
      setExist(false)

    }
  }
  // Hanelytics

  return (
    <>
      <Navbar />
      {isClickedRegister && (
        <div className="bg-container-signup">
          <h2 className="container register-heading">
            Sign Up now and get Instant access to AI/ML Insights
          </h2>
          <div className="container register-card-container">
            <div className="register-card">
              {/* <a
                style={{
                  color: "white",
                  fontSize: "24px",
                  textDecoration: "underline",
                }}
                href="https://ap-south-1nmrg96rqu.auth.ap-south-1.amazoncognito.com/login?client_id=1esfsaanp9ncgms41753687pd8&redirect_uri=https://hanelytics-solution-visionsoft-1.onrender.com/home&response_type=code&scope=email+openid+phone"
              >
                Sign In Using Cognito
              </a> */}
              <form onSubmit={handleSubmit}>
                {!openNextPage && <div className="registration-card-container">
                  <div className="register-input-container">
                    <div className="register-input-label">
                      <label htmlFor="firstname">
                        <strong>FIRSTNAME</strong><span className="required-mark">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Sachin"
                        autoComplete="off"
                        required
                        name="firstname"
                        className="firstname"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="register-input-label">
                      <label htmlFor="lastname">
                        <strong>LASTNAME</strong><span className="required-mark">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Tendulkar"
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
                        <strong>ORGANIZATION NAME</strong><span className="required-mark">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="ABC"
                        autoComplete="off"
                        required
                        name="bussinessName"
                        className=""
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="register-input-label">
                      <label htmlFor="contact">
                        <strong>CONTACT NUMBER</strong><span className="required-mark">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="012345678"
                        autoComplete="off"
                        required
                        name="contact"
                        className=""
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="register-input-label">
                    <label htmlFor="position">
                      <strong>POSITION</strong><span className="required-mark">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Senior Developer"
                      autoComplete="off"
                      required
                      name="position"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="register-input-label">
                    <label htmlFor="role">
                      <strong>ROLE</strong><span className="required-mark">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="CEO/CTO/COO/Employee"
                      autoComplete="off"
                      required
                      name="role"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="next-text-container" onClick={handleNextRegisterPage}>
                      <h1 className="next-text-btn">Next</h1>
                  </div>

                </div>}

                {/* <h3
                  className="bussiness-address-heading"
                  style={{ padding: "5px 12px" }}
                >
                  Bussiness Address Information
                </h3> */}
                {openNextPage && <><div className="registration-card-container">
                  <div className="register-input-container">
                  <div className="register-input-label">
                    <label htmlFor="email">
                      <strong>EMAIL</strong><span className="required-mark">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="example@gmail.com"
                      autoComplete="off"
                      required
                      name="email"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="register-input-label">
                    <label htmlFor="password">
                      <strong>PASSWORD</strong><span className="required-mark">*</span>
                    </label>
                    <input
                      type="password"
                      placeholder="******"
                      autoComplete="off"
                      required
                      name="password"
                      onChange={handleInputChange}
                    />
                  </div>
                    
                    <div className="register-input-label">
                      <label htmlFor="city">
                        <strong>CITY</strong><span className="required-mark">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Miami"
                        autoComplete="off"
                        required
                        name="city"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="register-input-label">
                      <label htmlFor="street">
                        <strong>STREET</strong><span className="required-mark">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="The Roads"
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
                        <strong>STATE</strong><span className="required-mark">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Florida"
                        autoComplete="off"
                        required
                        name="state"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="register-input-label">
                      <label htmlFor="country">
                        <strong>COUNTRY</strong><span className="required-mark">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="USA"
                        autoComplete="off"
                        required
                        name="country"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="register-input-label">
                    <label htmlFor="zipcode">
                      <strong>ZIPCODE</strong><span className="required-mark">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="33129"
                      autoComplete="off"
                      required
                      name="zipcode"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="checkbox-container">
                  <input type="checkbox" required className="checkbox" />
                  <p>I accept terms & conditions.</p>
                </div>
                <div style={{display: 'flex', alignItems: "center", justifyContent: 'space-between'}}>
                  <button type="submit" className="button-to-register">
                    Register
                  </button>
                  <button onClick={handleNextRegisterPage} style={{backgroundColor: "#082ccd"}} className="button-to-register">Back</button>


                  {/* <div className="next-text-container" onClick={handleNextRegisterPage}>
                      <h1 className="button-to-register">Back</h1> onClick={handleNextRegisterPage}
                  </div> */}
                </div>
                  
                </div>
                
                
                
                
                </>}
                {isExist === true ? (
                  <p className="error-msg">
                    <span>{existedEmail}</span>
                    {errorMsg}
                  </p>
                ) : (
                  ""
                )}
              </form>
            </div>
            <div>
              <div className="login-details">
                {/* <div> */}
                  <p className="opening-text">With HANElytics, we help businesses predict, optimize, and automate operations using AI, machine learning, and advanced analytics.</p>
                  <div>
                    <p>Already have an account?</p>
                    <Link to="/login">
                      <button>Login</button>
                    </Link>
                  </div>
                {/* </div> */}
              </div>
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
      <Footer />
    </>
  );
}

export default SignUp;
