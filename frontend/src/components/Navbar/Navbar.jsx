import React from "react";
import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import { FaGlobe } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
import { toast } from "react-toastify";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Navbar = ({page=""}) => {
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      {/* <div className='contacts'>
                <div className='contact-details'>
                    <FaSquarePhone className='icon' />
                    <p>(855) 542 6392</p>
                    <p>|</p>
                </div>
                <div className='email-info'>
                    <MdEmail className='email-icon' />
                    <p>demo@hanelytics.com</p>
                    <p>|</p>
                </div>
                <div className='social-icons'>
                    <a href="https://www.facebook.com/visionsoftinfo/" target='_blank' style={{textDecoration: "none", color: "#fff"}}>
                        <FaFacebookSquare className='icons' />
                    </a>
                    <a href="https://www.linkedin.com/company/vsoft-inc/posts/?feedView=all" target='_blank' style={{textDecoration: "none", color: "#fff"}}>
                        <FaLinkedin className='icons' />
                    </a>
                    <a href="https://www.youtube.com/@anjireddy9084" target='_blank' style={{textDecoration: "none", color: "#fff"}}>
                        <IoLogoYoutube className='icons' />
                    </a>
                    <a href="https://x.com/visionsoftinfo" target='_blank' style={{textDecoration: "none", color: "#fff"}}>
                        <FaSquareXTwitter className='icons' />
                    </a>
                </div>
            </div>
            <div className='login'>
                <div className='country-language'>
                    <div className='language'>
                        <FaGlobe className='icon' />
                        <p>English</p>
                        <p>|</p>
                    </div>
                    <div className='country'>
                        <FaMapMarkerAlt className='icon' />
                        <select className='selected-country'>
                            <option className='option' value="USA" selected>United States</option>
                            <option value="India">India</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="UAE">UAE</option>
                        </select>
                        <p>|</p>
                    </div>
                </div>
                <div className='signup-register'>
                    <Link to="/" style={{fontWeight: "bold"}}>
                        <button className='home'>Home</button>
                    </Link>
                </div>
            </div> */}
      <Link to="/home" className="header-home-heading">
        <h1 className="heading-text1">HANELYTICS</h1>
      </Link>
      <div className="signup-register">
      <Link to="/" className="bg-black rounded-2 p-2 text-white mobile-button" style={{marginRight: "10px"}}>
        Home
        </Link>
        <Link to={`${page === "signup" ? "/login" : "/register"}`} style={{ fontWeight: "bold" }}>
          <button style={{ fontWeight: "600", border: "none" }}
          className={`${page === "signup" ? "bg-success rounded-2 p-2 text-white mobile-button" : "bg-warning rounded-2 p-2 text-black mobile-button"}`}>
            {page === "signup" ? "Login" : "Register"}
            </button>
        </Link>
        
      </div>
      
    </div>
  );
};

export default Navbar;
