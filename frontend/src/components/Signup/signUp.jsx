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
import { MuiTelInput } from "mui-tel-input";
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

function SignUp() {

  const [countryPhoneCode, setCountryPhoneCode] = useState("+1");
  const [countryCode, setCountryCode] = useState("US");

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    businessName: "",
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
  const [openNextPage, setOpenNextPage] = useState(false);

  const { url, setToken, setUsername, setUserRole,showHidePassword,
    setShowHidePassword } = useContext(StoreContext);

  // useEffect(() => {
  //   const response = "http://localhost:3001"
  //   // const response = "https://hanelytics-solution-visionsoft.onrender.com"
  //   console.log(response.data)
  // }, [])

  const startTheServer = async () => {
    const response = await axios.get(url);
    console.log(response.data.message);
  };
  useEffect(() => {
    startTheServer();
    const jwtToken = localStorage.getItem("token");
    if (jwtToken) {
      navigate("/home");
    } else {
      navigate("/register");
    }
  }, []);

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
    console.log(data);

    const data1 = {
      ...data,
      countryPhoneCode: countryPhoneCode,
      countryCode: countryCode
    }

    console.log(data1)

    const response = await axios.post(url + "/api/user/register", data1);

    if (response.data.success) {
      setExist(false);
      setToken(response.data.token);
      // localStorage.setItem("token", response.data.token);
      // localStorage.setItem("username", response.data.firstname);
      // localStorage.setItem("role", response.data.role);
      // localStorage.setItem("email", response.data.email);
      setResponseCode(response.data.verificationCode);
      // console.log(response.data.verificationCode)
      setUsername(response.data.firstname);
      setUserRole(response.data.role);

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
      setOpenNextPage(false);
      setExist(false);
    } else {
      setOpenNextPage(true);
      setExist(false);
    }
  };
  // Hanelytics

  const handleChange = (newValue, info) => {
    setCountryPhoneCode(newValue);
    setCountryCode(info.countryCode);
    console.log("Selected Phone Number:", newValue); // ✅ Print to console
    console.log("Selected Code:", info.countryCode); // ✅ Print to console
  };

  return (
    <>
      {isClickedRegister && (
        <div className="bg-container-signup">
          <div className="register-heading">
            <h2>
              Sign Up now and get Instant access to AI/ML Insights & Dashboards
            </h2>
          </div>
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
                {!openNextPage && (
                  <div className="registration-card-container">
                    <div className="register-input-container">
                      <div className="register-input-label">
                        <label htmlFor="firstname">
                          <strong>FIRSTNAME</strong>
                          <span className="required-mark">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Sachin"
                          autoComplete="off"
                          required
                          name="firstname"
                          className="firstname"
                          onChange={handleInputChange}
                          value={data.firstname}
                        />
                      </div>
                      <div className="register-input-label">
                        <label htmlFor="lastname">
                          <strong>LASTNAME</strong>
                          <span style={{ fontSize: "11px" }}>(optional)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Tendulkar"
                          autoComplete="off"
                          // required
                          name="lastname"
                          className=""
                          onChange={handleInputChange}
                          value={data.lastname}
                        />
                      </div>
                    </div>
                    <div className="register-input-container">
                      <div className="register-input-label">
                        <label htmlFor="businessName">
                          <strong>ORGANIZATION NAME</strong>
                          <span className="required-mark">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="XYZ"
                          autoComplete="off"
                          required
                          name="businessName"
                          className=""
                          onChange={handleInputChange}
                          value={data.businessName}
                        />
                      </div>
                      <div className="register-input-label">
                        
                        <label htmlFor="contact">
                          <strong>CONTACT NUMBER</strong>
                          <span className="required-mark">*</span>
                        </label>

                        <div className="country-contact-container">
                          <MuiTelInput
                            style={{ outline: "none", borderRadius: "6px", color: "#fff"}}
                            value={countryPhoneCode}
                            onChange={handleChange}
                            defaultCountry="US"
                            sx={{
                              width: "80px",
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "#fff",
                                height: "30px",
                                borderRadius: "6px",
                                padding: "16px 0px",
                                '& fieldset': {
                                      border: 'none', // ✅ removes the black outline
                                    },
                              },
                              "& input": {
                                // padding: "10px 12px",
                                padding: "0",
                                // fontSize: "14px",
                                color: "#000",
                                height: "30px",


                              },
                              // Reduce flag icon size
                              "& .MuiTelInput-FlagButton": {
                                width: "16px",
                                // padding: "0 6px",
                                marginLeft: "-40px",
                                paddingLeft: "2px"
                              },
                              "& .MuiTelInput-Flag": {
                                width: "18px",
                                height: "12px",
                              },
                              // Reduce calling code font size
                              "& .MuiTelInput-CountryCallingCode": {
                                fontSize: "120px",
                                marginRight: "10px",
                                backgroundColor: '#f0f0f0',

                              },
                            }}
                          />
                          <input
                            type="text"
                            placeholder="012345678"
                            autoComplete="off"
                            required
                            name="contact"
                            id="country-code-contact"
                            onChange={handleInputChange}
                            value={data.contact}
                            // style={{maxWidth: "260px"}}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="register-input-label">
                      <label htmlFor="position">
                        <strong>POSITION</strong>
                        <span className="required-mark">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Senior Developer"
                        autoComplete="off"
                        required
                        name="position"
                        onChange={handleInputChange}
                        value={data.position}
                      />
                    </div>
                    <div className="register-input-label">
                      <label htmlFor="role">
                        <strong>ROLE</strong>
                        <span className="required-mark">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="CEO/CTO/COO/Employee"
                        autoComplete="off"
                        required
                        name="role"
                        onChange={handleInputChange}
                        value={data.role}
                      />
                    </div>
                    <div
                      className="next-text-container"
                      onClick={handleNextRegisterPage}
                    >
                      <h1 className="next-text-btn">Next</h1>
                    </div>
                  </div>
                )}

                {/* <h3
                  className="bussiness-address-heading"
                  style={{ padding: "5px 12px" }}
                >
                  Bussiness Address Information
                </h3> */}
                {openNextPage && (
                  <>
                    <div className="registration-card-container">
                      <div className="register-input-container">
                        <div className="register-input-label">
                          <label htmlFor="email">
                            <strong>EMAIL</strong>
                            <span className="required-mark">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="example@gmail.com"
                            autoComplete="off"
                            required
                            name="email"
                            onChange={handleInputChange}
                            value={data.email}
                          />
                        </div>
                        <div className="register-input-label">
                          <label htmlFor="password">
                            <strong>PASSWORD</strong>
                            <span className="required-mark">*</span>
                          </label>
                          <input
                            type="password"
                            placeholder="******"
                            autoComplete="off"
                            required
                            name="password"
                            onChange={handleInputChange}
                            value={data.password}
                          />
                        </div>

                        {/* {showHidePassword === true ? (
                    <BiSolidHide
                      className="hide-show-icon"
                      onClick={() => {
                        setShowHidePassword(!showHidePassword)}}
                    />
                  ) : (
                    <BiSolidShow
                      className="hide-show-icon"
                      onClick={() => {
                        setShowHidePassword(!showHidePassword)}}
                    />
                  )} */}
                        <div className="register-input-label">
                          <label htmlFor="city">
                            <strong>CITY</strong>
                            <span className="required-mark">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Miami"
                            autoComplete="off"
                            required
                            name="city"
                            onChange={handleInputChange}
                            value={data.city}
                          />
                        </div>
                        <div className="register-input-label">
                          <label htmlFor="street">
                            <strong>STREET</strong>
                            <span className="required-mark">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="The Roads"
                            autoComplete="off"
                            required
                            name="street"
                            onChange={handleInputChange}
                            value={data.street}
                          />
                        </div>
                      </div>
                      <div className="register-input-container">
                        <div className="register-input-label">
                          <label htmlFor="state">
                            <strong>STATE</strong>
                            <span className="required-mark">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Florida"
                            autoComplete="off"
                            required
                            name="state"
                            onChange={handleInputChange}
                            value={data.state}
                          />
                        </div>
                        <div className="register-input-label">
                          <label htmlFor="country">
                            <strong>COUNTRY</strong>
                            <span className="required-mark">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="USA"
                            autoComplete="off"
                            required
                            name="country"
                            onChange={handleInputChange}
                            value={data.country}
                          />
                        </div>
                      </div>
                      <div className="register-input-label">
                        <label htmlFor="zipcode">
                          <strong>ZIPCODE</strong>
                          <span className="required-mark">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="33129"
                          autoComplete="off"
                          required
                          name="zipcode"
                          onChange={handleInputChange}
                          value={data.zipcode}
                        />
                      </div>
                      <div className="checkbox-container">
                        <input type="checkbox" required className="checkbox" />
                        <p>I accept terms & conditions.</p>
                      </div>
                      <div className="register-back-btn-container">
                        <button
                          type="submit"
                          className="button-to-register register-bg"
                        >
                          Register
                        </button>
                        <button
                          onClick={handleNextRegisterPage}
                          style={{ backgroundColor: "#082ccd" }}
                          className="back-to-register"
                        >
                          Go Back
                        </button>

                        {/* <div className="next-text-container" onClick={handleNextRegisterPage}>
                      <h1 className="button-to-register">Back</h1> onClick={handleNextRegisterPage}
                  </div> */}
                      </div>
                    </div>
                  </>
                )}
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
                <p className="opening-text">
                  With HANElytics, we help businesses predict, optimize, and
                  automate operations using AI, machine learning, and advanced
                  analytics.
                </p>
                <div>
                  <p>Already have an account?</p>
                  <Link to="/login">
                    <button style={{boxShadow: "2px 2px 2px #000", padding: "10px 5px"}}>Login</button>
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
