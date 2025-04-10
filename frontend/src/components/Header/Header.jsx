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
  const { username, token, setToken, setUsername, userRole, setUserRole } =
    useContext(StoreContext);

  const username1 = username.split(" ")
  const firstname = username1[0]


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setToken("");
    setUsername("");
    setUserRole("");
    navigate("/login");
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
    }else{
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
        {userRole === "CEO" || userRole === "COO" || userRole === "CTO"  ? <Link to="/assignRoles">
          <button className="assign-roles">
            Assign Access
            <LuArrowUpRight className="roles-insights-icon" />
          </button></Link> : ""}
        </>
      );
    }else {
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
          <div className="icon-username1">
            <FaRegCircleUser className="user-icon1" />
            <p className="username-text1">{firstname}</p>
          </div>
          {/* <div> */}
          <button onClick={handleLogout}>Logout</button>
          {/* </div> */}
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
