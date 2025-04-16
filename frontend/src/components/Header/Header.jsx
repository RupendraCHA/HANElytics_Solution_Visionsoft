import React, { useContext, useEffect, useState } from "react";

import { FaRegCircleUser } from "react-icons/fa6";

import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { Dropdown } from "antd";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { LuArrowUpRight } from "react-icons/lu";

const Header = ({ page = "" }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const navigate = useNavigate();
  const { username, token, setToken, setUsername, userRole, setUserRole, loggedInUserDetails,
    setLoggedInUserDetails } =
    useContext(StoreContext);

  const username1 = username.split(" ")
  const firstname = username1[0]

  const getLoggedUserInfo = async () => {
    const email = localStorage.getItem("email");
    const data = {
      email: email,
    };
    const response = await axios.post(
      url + "/api/user/getLoggedUserDetails",
      data
    );
    console.log(response.data.userLoggedData);

    if (response.data.success) {
      setLoggedInUserDetails(response.data.userLoggedData);
    } else {
      toast.error(response.data.message);
    }

    // console.log("Logged User Details", response.data)
  };

  useEffect(() => {
    getLoggedUserInfo()
  }, [])


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setToken("");
    setUsername("");
    setUserRole("");
    navigate("/");
  };

  const handleIsMenuOpened = () => {
    if (isMenuOpened === false) {
      setIsMenuOpened(true);
    } else {
      setIsMenuOpened(false);
    }
  };

  const getGrantButtons = () => {
    if (page !== "Grant Access") {
      return (
        <>
          {userRole === "CEO" || userRole === "COO" || userRole === "CTO" ? (
            <Link to="/assignRoles">
              <button className="assign-roles">
                Assign Access
                <LuArrowUpRight className="roles-insights-icon" />
              </button>
            </Link>
          ) : (
            ""
          )}
        </>
      );
    } else {
      return (<>
        <div className="roles-header-tabs">

          <Link to="/dataModeling">
            <button className="assign-roles">
              Data Modeling
              <LuArrowUpRight className="roles-insights-icon" />
            </button>
          </Link>
          <Link to="/dashboards">
            <button className="assign-roles">
              PowerBI Dashboards
              <LuArrowUpRight className="roles-insights-icon" />
            </button>
          </Link>
        </div>
      </>

      )
    }
  };

  const getMobileResponsiveButtons = () => {
    if (page !== "Grant Access") {
      return (
        <>
          {userRole === "CEO" || userRole === "COO" || userRole === "CTO" ? <Link to="/assignRoles">
            <button className="assign-roles">
              Assign Access
              <LuArrowUpRight className="roles-insights-icon" />
            </button></Link> : ""}
        </>
      );
    } else {
      return (
        <div className="roles-mobile-header-tabs">

          <Link to="/dataModeling">
            <button className="assign-roles">
              Data Modeling
              <LuArrowUpRight className="roles-insights-icon" />
            </button>
          </Link>
          <Link to="/dashboards">
            <button className="assign-roles">
              Power BI Dashboards
              <LuArrowUpRight className="roles-insights-icon" />
            </button></Link>
        </div>

      )
    }
  };

  return (
    <>
      <div className="home-container">
        <Link to="/home" className="header-home-heading">
          <h1 className="header-home-text">HANELYTICS</h1>
        </Link>
        <div>
          {userRole === "CTO" ||
            userRole === "CEO" ||
            userRole === "COO" ? <>{getGrantButtons()}</> : ""}</div>
        <div className="drop-down1">
          <div className="icon-username1" style={{ position: "relative" }}>
            <FaRegCircleUser className="user-icon1" />
            <p className="username-text1">{firstname}</p>
            {loggedInUserDetails.map((user, index) => (
              <div
                key={index}
                style={{ position: "absolute" }}
                className="header-logged-person-details"
              >
                <h3 className="logged-user-name">Hi, {user.firstname} {user.lastname}</h3>
                <hr style={{ margin: "5px 0px", }} />
                <div className="user-info-section">
                  <div

                    className="details-section"
                  >
                    <label id="email">Email:</label>
                    <input type="text" value={user.email} />
                  </div>
                  <div
                    className="details-section"
                  >
                    <label id="email">Contact:</label>
                    <input
                      type="text"
                      value={`${user.countryPhoneCode} ${user.contact}`}
                    />
                  </div>
                </div>

                <h3 className="logged-user-name" style={{ marginTop: "25px" }}>Business Info</h3>
                <hr style={{ margin: "5px 0px", }} />

                <div className="user-business-section">
                  <div
                    className="details-section"
                  >
                    <label id="email">Name:</label>
                    <input type="text" value={user.businessName} />
                  </div>
                  <div
                    className="details-section"
                  >
                    <label id="email">Role:</label>
                    <input type="text" value={user.role} />
                  </div>
                  <div
                    className="details-section"
                  >
                    <label id="email">Country:</label>
                    <input
                      type="text"
                      value={user.country}
                    />
                  </div>
                  <div
                    className="details-section"
                  >
                    <label id="email">State:</label>
                    <input
                      type="text"
                      value={user.state}
                    />
                  </div>

                  <div
                    className="details-section"
                  >
                    <label id="email">City:</label>
                    <input
                      type="text"
                      value={user.city}
                    />
                  </div>
                  <div
                    className="details-section"
                  >
                    <label id="email">Zipcode:</label>
                    <input
                      type="text"
                      value={user.zipcode}
                    />
                  </div>
                  <div
                    className="details-section"
                  >
                    <label id="email">Street:</label>
                    <input
                      type="text"
                      value={user.street}
                    />
                  </div>

                </div>

                <button id="bth-for-logout" onClick={handleLogout}>Logout</button>

              </div>
            ))}
          </div>
          <button id="bth-for-logout" onClick={handleLogout}>Logout</button>

        </div>
      </div>
      <div
        className="mobile-roles-home-container"
        style={{ position: "relative" }}
      >
        <Link to="/home" className="mobile-roles-website-heading">
          <h1>HANELYTICS</h1>
        </Link>
        <div className="bi-mobile-menu-container">
          {isMenuOpened ? (
            <RxCross1 className="bi-mobile-menu" onClick={handleIsMenuOpened} />
          ) : (
            <IoMdMenu className="bi-mobile-menu" onClick={handleIsMenuOpened} />
          )}
          {isMenuOpened && (
            <div className="mobile-roles-menu-home-container">
              <div className="mobile-roles-home-page">
                {userRole === "CTO" ||
                  userRole === "CEO" ||
                  userRole === "COO" ? (
                  <>{getMobileResponsiveButtons()}</>
                ) : (
                  ""
                )}
                <div className="drop-down1">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
